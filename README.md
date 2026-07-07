# Smart Bharat AI – AI-Powered Civic Companion

Smart Bharat AI is a modern civic engagement and facilitation portal designed to bridge the digital gap between Indian citizens and government welfare infrastructure. Powered by Google Gemini AI, it helps citizens search, evaluate, and navigate public services and schemes in English, Hindi (हिन्दी), and Tamil (தமிழ்), as well as register local civic grievances.

---

## 🌟 Key Features

1. **Multilingual Conversational Companion**
   - A ChatGPT-like helper to clarify doubts on crucial central government services (Aadhaar, Passport, PAN Card, Voter ID, Driving License, Birth Certificate).
   - Complies strictly with a predefined system instructions context: outputting step-by-step, simple, accurate, and citizen-friendly guides.

2. **Personalized Scheme Finder**
   - A questionnaire wizard collecting age, gender, occupation, family income, state, and category.
   - Leverages Gemini to return a structured JSON array of matching government welfare programs, outlining benefits, eligibility checklists, documentation required, and reasons for the match.

3. **Grievance Redressal Portal**
   - Allows logging civic complaints (waste disposal, road conditions, power outages, safety issues) by area, category, description, and priority level.
   - Generates unique tracking numbers (`SB-COMP-XXXXXX`) and prints professional receipts.

4. **Analytics Citizen Dashboard**
   - Displays real-time counts, status percentages, and history lists of all civic interactions.
   - Includes interactive status cycling tools to simulate grievance progress stages (Pending -> In Progress -> Resolved).

5. **Integrated Localization**
   - Smoothly switches the entire website application interface (static elements, labels, buttons) and the underlying AI engine responses between English, Hindi, and Tamil.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router, Framer Motion (for animations), Lucide React (for icons)
- **Backend**: Node.js, Express.js (provides secure proxy routing to hide API keys)
- **AI Engine**: Google Gemini API (`gemini-1.5-flash` model integration)
- **Storage**: Local Storage (fully client-side storage for offline persistence of chats and complaints history)

---

## 📂 Project Structure

```text
smart-bharat-ai/
├── package.json             # Workspace monorepo command config
├── .env.example             # Configuration placeholders
├── .gitignore               # Ignored files list
├── README.md                # General technical documentation
│
├── backend/
│   ├── package.json         # Node server dependency details
│   └── server.js            # Express server (Gemini endpoints)
│
└── frontend/
    ├── index.html           # Main HTML entry point (SEO metadata)
    ├── package.json         # Vite project packages config
    ├── vite.config.js       # Backend proxy config (/api)
    ├── tailwind.config.js   # Tailwind theme configurations
    ├── postcss.config.js    # Styling post-processor configurations
    └── src/
        ├── main.jsx         # App bootstrap entry
        ├── App.jsx          # Component routers
        ├── index.css        # Core layout styles (scrollbars, glassmorphism)
        │
        ├── context/
        │   └── LanguageContext.jsx  # Multi-language translation maps
        │
        ├── components/
        │   ├── Navbar.jsx   # Top national banner & language selector
        │   └── Footer.jsx   # Portal info & official portal references
        │
        └── pages/
            ├── Home.jsx             # Main services list & stats
            ├── AIAssistant.jsx      # Chatbot interface & chat history
            ├── SchemeFinder.jsx     # Wizard questionnaire & card grids
            ├── ComplaintPortal.jsx  # Grievance registration & receipts
            └── Dashboard.jsx        # Citizen analytics & status trackers
```

---

## 🚀 Installation & Setup

Follow these simple steps to run the application locally:

### Prerequisites
- Node.js (version 18+ recommended)
- A Google Gemini API Key. Get one at [Google AI Studio](https://aistudio.google.com/).

### 1. Clone & Configure Variables
Create a `.env` file in the root directory by copying the example:
```bash
cp .env.example .env
```
Open the `.env` file and input your Gemini API key:
```env
GEMINI_API_KEY=AIzaSy...your_gemini_api_key...
PORT=5000
```

### 2. Install Dependencies
Run the installation script in the root directory. This will install packages in the root, the backend, and the frontend folders:
```bash
npm run install:all
```

### 3. Run Development Server
Start both the Express backend and the Vite frontend concurrently:
```bash
npm run dev
```
- Frontend will open at: **http://localhost:5173**
- Backend proxy runs at: **http://localhost:5000**

---

## 🧠 AI Prompt & System Prompt Workflows

The application configures Gemini API endpoints with precise system instructions to ensure professional, accurate, and safe responses:

### 1. Chat Prompt Instructions
The Gemini companion is restricted by the following system instructions:
```text
You are Smart Bharat AI.
Your responsibility is to help Indian citizens understand government services.
Always:
Explain simply.
Recommend government schemes.
Mention required documents.
Provide step-by-step instructions.
Answer in the selected language (Hindi, Tamil, or English).
Never fabricate government information.
If uncertain, recommend checking official government portals.
```

### 2. Structured Scheme Matching Prompt
When a user submits the Scheme Finder form, the backend compiles the demographic variables and prompts the Gemini model to respond in raw JSON format:
```text
Recommend government schemes for an Indian citizen with the following profile:
- Age: [Age]
- Gender: [Gender]
- Occupation: [Occupation]
- Annual Income: INR [Income]
- State: [State]
- Category: [Category]

Respond in the language: [Selected Language].
You MUST return a JSON array containing up to 4 highly matching schemes. 
Each scheme in the array must be an object with the following exact keys:
"name", "benefits", "eligibility", "documents", "process", "matchReason".
```
The endpoint configures `generationConfig: { responseMimeType: "application/json" }` to prevent markdown codeblock markers (` ```json `) and guarantee pure parseable JSON.

---

## 🔮 Future Scope
- **DigiLocker Integration**: Fetch authentic citizen documents directly into the Scheme Finder for instant automated validation.
- **WhatsApp Bot Facilitation**: Mirror the AI companion onto WhatsApp using Twilio to increase accessibility for rural users.
- **Interactive Speech-to-Text**: Enable voice query inputs in regional dialects for illiterate or elder populations.

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE details for info. Built for educational and facilitation purposes during Digital India innovation challenges.
