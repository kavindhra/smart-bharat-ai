import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Resolve paths for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from local directory or parent workspace root directory
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize Google Gemini API
const apiKey = process.env.GEMINI_API_KEY;
let genAI = null;

if (apiKey && apiKey !== 'your_gemini_api_key_here') {
  genAI = new GoogleGenerativeAI(apiKey);
} else {
  console.warn('WARNING: GEMINI_API_KEY is not configured in .env file. AI features will fallback to dummy responses.');
}

// 0. Root Guidance Page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Smart Bharat AI Service API</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8fafc; color: #0f172a; margin: 0; }
        .card { background: white; padding: 2.5rem; border-radius: 1.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; text-align: center; max-width: 480px; }
        h1 { color: #2563eb; font-size: 1.75rem; margin-top: 0; margin-bottom: 0.5rem; }
        p { line-height: 1.6; color: #475569; font-size: 0.95rem; }
        a { display: inline-block; margin-top: 1.5rem; padding: 0.85rem 1.75rem; background-color: #2563eb; color: white; text-decoration: none; border-radius: 9999px; font-weight: bold; transition: background-color 0.2s; font-size: 0.9rem; }
        a:hover { background-color: #1d4ed8; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Smart Bharat AI Server</h1>
        <p>The Node/Express backend API is running successfully on <strong>Port 5000</strong>.</p>
        <p>To access the citizen-facing web application portal, please open the React frontend:</p>
        <a href="http://localhost:5173">Open Smart Bharat AI Portal</a>
      </div>
    </body>
    </html>
  `);
});

// System prompt
const SYSTEM_PROMPT = `You are Smart Bharat AI.
Your responsibility is to help Indian citizens understand government services.
Always:
Explain simply.
Recommend government schemes.
Mention required documents.
Provide step-by-step instructions.
Answer in the selected language.
Never fabricate government information.
If uncertain, recommend checking official government portals.`;

// 1. Chat Endpoint
app.post('/api/chat', async (req, res) => {
  const { messages, language } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const selectedLanguage = language || 'English';

  // Fallback if API key is not configured
  if (!genAI) {
    setTimeout(() => {
      res.json({
        role: 'model',
        content: `[DEMO MODE] This is a simulated response because GEMINI_API_KEY is not set. 
To get live responses, please create a \`.env\` file in the project root containing your Gemini API key.

Here is some basic information in response to your query regarding government services:
For Passport: Apply online on the Passport Seva Kendra portal. Documents required: Address proof, Age proof.
For PAN Card: Apply online on NSDL or UTIITSL portals. Documents required: Identity proof, Address proof.`
      });
    }, 1000);
    return;
  }

  try {
    // We use gemini-1.5-flash for speed and reliability
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: `${SYSTEM_PROMPT}\n\nYou must respond in ${selectedLanguage}.`,
    });

    // Format history for Gemini
    // Gemini expects contents to be: [{ role: 'user' | 'model', parts: [{ text: '...' }] }]
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const result = await model.generateContent({ contents });
    const response = await result.response;
    const text = response.text();

    res.json({
      role: 'model',
      content: text
    });
  } catch (error) {
    console.error('Error with Gemini API:', error);
    res.status(500).json({ 
      error: 'Failed to communicate with AI model', 
      details: error.message 
    });
  }
});

// 2. Scheme Finder Endpoint
app.post('/api/schemes', async (req, res) => {
  const { age, gender, occupation, income, state, category, language } = req.body;
  const selectedLanguage = language || 'English';

  const userProfilePrompt = `Recommend government schemes for an Indian citizen with the following profile:
- Age: ${age}
- Gender: ${gender}
- Occupation: ${occupation}
- Annual Income: INR ${income}
- State: ${state}
- Category: ${category}

Respond in the language: ${selectedLanguage}.

You MUST return a JSON array containing up to 4 highly matching schemes. 
Each scheme in the array must be an object with the following exact keys:
"name": Name of the scheme
"benefits": Key benefits (simple, citizen-friendly explanation)
"eligibility": Simple eligibility criteria
"documents": Array of strings representing required documents
"process": Step-by-step how to apply
"matchReason": Explicit explanation of why this scheme matches the user's specific inputs (age/gender/occupation/income/state/category).

If no real scheme matches, create standard citizen-focused general schemes that fit the parameters (like state-specific food security cards, education grants, or senior citizen benefits) but ensure the schema is strictly followed. Do not include markdown formatting or backticks around the JSON. Output ONLY raw JSON.`;

  // Fallback mock responses if API key is not configured
  if (!genAI) {
    setTimeout(() => {
      res.json([
        {
          name: "Pradhan Mantri Shram Yogi Maan-dhan (PM-SYM)",
          benefits: "Voluntary and contributory pension scheme of Rs. 3000/month after the age of 60.",
          eligibility: "Unorganised workers, entry age 18-40 years, monthly income Rs. 15,000 or less.",
          documents: ["Aadhaar Card", "Savings Bank Account / Jan Dhan Account with IFSC"],
          process: "1. Visit nearest Common Services Centre (CSC).\n2. Submit Aadhaar and Bank Details.\n3. Pay the first contribution.",
          matchReason: `Matches your occupation as a worker and fits your annual income bracket of INR ${income}.`
        },
        {
          name: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
          benefits: "Health cover of Rs. 5 Lakhs per family per year for secondary and tertiary care hospitalization.",
          eligibility: "Identified families under SECC 2011 database based on occupational and shelter deprivation.",
          documents: ["Aadhaar Card", "Ration Card", "Income Certificate"],
          process: "1. Check your eligibility online or at a PM-JAY kiosk.\n2. Get an Ayushman Card from CSC.\n3. Present card at empanelled hospital for cashless treatment.",
          matchReason: `Matches your profile under low-income classification for healthcare security in ${state}.`
        }
      ]);
    }, 1200);
    return;
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { 
        responseMimeType: 'application/json'
      },
      systemInstruction: SYSTEM_PROMPT
    });

    const result = await model.generateContent(userProfilePrompt);
    const response = await result.response;
    const text = response.text();

    // Parse and send the JSON back to the client
    const parsedData = JSON.parse(text);
    res.json(parsedData);
  } catch (error) {
    console.error('Error generating schemes:', error);
    res.status(500).json({ 
      error: 'Failed to generate scheme recommendations', 
      details: error.message 
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Smart Bharat AI Backend server running on http://localhost:${PORT}`);
});
