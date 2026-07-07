import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  Search, 
  User, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  BookOpen, 
  CheckCircle,
  FileCheck,
  HelpCircle,
  MessageSquare,
  RefreshCw,
  Printer
} from 'lucide-react';

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", 
  "Ladakh", "Lakshadweep", "Puducherry"
];

const OCCUPATIONS = [
  "Student", "Farmer", "Unemployed", "Self-Employed", "Salaried Employee", 
  "Worker / Labourer", "Artisan / Craftsman", "Homemaker", "Retired / Senior Citizen"
];

const CATEGORIES = [
  "General (UR)", "OBC", "SC", "ST", "EWS"
];

export default function SchemeFinder() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    occupation: 'Student',
    income: '',
    state: 'Delhi',
    category: 'General (UR)'
  });

  const [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.age || !formData.income) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null);
    setSchemes(null);

    try {
      const languagePayloadMap = {
        en: 'English',
        hi: 'Hindi',
        ta: 'Tamil'
      };

      const response = await fetch('/api/schemes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          language: languagePayloadMap[language] || 'English'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate scheme recommendations.');
      }

      const data = await response.json();
      setSchemes(data);
    } catch (err) {
      console.error(err);
      setError('Could not connect to the scheme matching service. Please verify server connectivity and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Launch AI with scheme specific helper
  const querySchemeInChat = (schemeName) => {
    const chatQuery = language === 'hi'
      ? `मुझे "${schemeName}" योजना के लिए आवेदन करने की प्रक्रिया और आवश्यक दस्तावेजों के बारे में विस्तार से बताएं।`
      : language === 'ta'
      ? `"${schemeName}" திட்டத்திற்கு எவ்வாறு விண்ணப்பிப்பது மற்றும் அதற்கு என்ன ஆவணங்கள் தேவை என்பதைப் பற்றி விளக்கவும்.`
      : `Provide detailed guidance on how to apply for "${schemeName}", including the step-by-step process and required documents.`;
      
    navigate('/assistant', { state: { service: schemeName } });
    
    // Write helper code in sessionStorage so AIAssistant can grab it and execute it
    // Wait, the AIAssistant.jsx already handles checking location.state?.service and launching handleNewChat!
  };

  return (
    <div className="bg-tricolor-gradient min-h-screen py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:py-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-2 print:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('schemeFinderTitle')}
          </h1>
          <p className="text-sm text-slate-500 font-medium max-w-2xl mx-auto print:hidden">
            {t('schemeFinderSubtitle')}
          </p>
        </div>

        {/* Input Wizard Form Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-8 print:hidden max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Age Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-govBlue-500" />
                  <span>{t('labelAge')}</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="e.g. 24"
                  min="0"
                  max="120"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-govBlue-500 focus:border-transparent text-sm bg-slate-50 text-slate-800"
                />
              </div>

              {/* Gender Select */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-govBlue-500" />
                  <span>{t('labelGender')}</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-govBlue-500 focus:border-transparent text-sm bg-slate-50 text-slate-800"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Occupation Select */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-govBlue-500" />
                  <span>{t('labelOccupation')}</span>
                </label>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-govBlue-500 focus:border-transparent text-sm bg-slate-50 text-slate-800"
                >
                  {OCCUPATIONS.map(occ => (
                    <option key={occ} value={occ}>{occ}</option>
                  ))}
                </select>
              </div>

              {/* Income Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-govBlue-500" />
                  <span>{t('labelIncome')}</span>
                </label>
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={handleInputChange}
                  placeholder="e.g. 250000"
                  min="0"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-govBlue-500 focus:border-transparent text-sm bg-slate-50 text-slate-800"
                />
              </div>

              {/* State Select */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-govBlue-500" />
                  <span>{t('labelState')}</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-govBlue-500 focus:border-transparent text-sm bg-slate-50 text-slate-800"
                >
                  {STATES.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Social Category Select */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-govBlue-500" />
                  <span>{t('labelCategory')}</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-govBlue-500 focus:border-transparent text-sm bg-slate-50 text-slate-800"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-4 bg-govBlue-600 hover:bg-govBlue-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:shadow-govBlue-500/20 transition-all flex items-center justify-center gap-2 group disabled:bg-slate-300"
              >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                <span>{t('btnSearchSchemes')}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="py-16 text-center space-y-4 print:hidden">
            <div className="w-12 h-12 border-4 border-govBlue-200 border-t-govBlue-600 rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-500 text-sm font-medium animate-pulse">{t('searchingSchemes')}</p>
          </div>
        )}

        {/* Error Block */}
        {error && (
          <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-start gap-3 shadow-sm print:hidden">
            <span className="p-1 bg-red-100 rounded-lg shrink-0">⚠️</span>
            <div>
              <h4 className="font-bold">System Error</h4>
              <p className="mt-1 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Results Block */}
        {schemes && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex justify-between items-center bg-white border border-slate-100 px-6 py-4 rounded-2xl shadow-sm print:hidden">
              <span className="text-sm font-bold text-slate-700">Recommended Schemes Matching Your Profile</span>
              <button 
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-slate-600 text-xs font-semibold"
              >
                <Printer className="w-4 h-4 text-govBlue-500" />
                <span>Print Recommendations</span>
              </button>
            </div>

            {/* Scheme Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {schemes.map((scheme, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-200 relative overflow-hidden group page-break-avoid"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-saffron-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 group-hover:scale-125 transition-transform duration-300"></div>
                  
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-saffron-50 text-saffron-700 text-[10px] font-extrabold uppercase tracking-wider mb-2.5">
                        Central / State Incentive
                      </span>
                      <h3 className="text-xl font-bold text-slate-800 leading-snug group-hover:text-govBlue-600 transition-colors">
                        {scheme.name}
                      </h3>
                    </div>

                    {/* Match Reason Alert (Premium UI detail) */}
                    <div className="bg-govBlue-50 border border-govBlue-100/50 p-3.5 rounded-2xl flex gap-2">
                      <HelpCircle className="w-5 h-5 text-govBlue-500 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-bold text-govBlue-700 block mb-0.5">{t('schemeMatch')}</span>
                        <span className="text-slate-600 leading-relaxed font-medium">{scheme.matchReason}</span>
                      </div>
                    </div>

                    {/* Content Columns */}
                    <div className="space-y-4 text-sm text-slate-600">
                      <div>
                        <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span>{t('schemeBenefits')}</span>
                        </span>
                        <p className="leading-relaxed pl-5.5 font-medium">{scheme.benefits}</p>
                      </div>

                      <div>
                        <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                          <User className="w-4 h-4 text-govBlue-500" />
                          <span>{t('schemeEligibility')}</span>
                        </span>
                        <p className="leading-relaxed pl-5.5 font-medium">{scheme.eligibility}</p>
                      </div>

                      <div>
                        <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                          <FileCheck className="w-4 h-4 text-govBlue-500" />
                          <span>{t('schemeDocuments')}</span>
                        </span>
                        <ul className="list-disc pl-9 space-y-1 font-medium">
                          {scheme.documents.map((doc, dIdx) => (
                            <li key={dIdx}>{doc}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                          <BookOpen className="w-4 h-4 text-saffron-500" />
                          <span>{t('schemeProcess')}</span>
                        </span>
                        <div className="pl-5.5 leading-relaxed font-medium whitespace-pre-wrap">{scheme.process}</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3 print:hidden">
                    <button
                      onClick={() => querySchemeInChat(scheme.name)}
                      className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-4 h-4 text-govBlue-400" />
                      <span>Ask AI How to Apply</span>
                    </button>
                  </div>

                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
