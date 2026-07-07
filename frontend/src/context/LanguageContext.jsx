import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navbar
    navHome: "Home",
    navAssistant: "AI Assistant",
    navSchemes: "Scheme Finder",
    navComplaints: "File Complaint",
    navDashboard: "Dashboard",
    govTitle: "Government of India",
    govSubtitle: "Smart Bharat AI Portal",

    // Home
    heroTitle: "Smart Bharat AI",
    heroSubtitle: "Your Intelligent AI Companion for Government Services",
    btnStartAI: "Start AI Assistant",
    btnExploreSchemes: "Explore Schemes",
    statsActiveUsers: "Active Users Today",
    statsResolvedComplaints: "Civic Issues Resolved",
    statsSupportedSchemes: "Government Schemes Indexed",
    whyChooseTitle: "Why Smart Bharat AI?",
    whyChooseDesc: "Bridging the gap between citizens and administration using cutting-edge AI technologies.",
    feature1Title: "Multilingual AI Chat",
    feature1Desc: "Ask questions in English, Hindi, or Tamil and get accurate step-by-step instructions.",
    feature2Title: "Personalized Scheme Matcher",
    feature2Desc: "Enter your demographic details to discover which welfare and economic schemes you qualify for.",
    feature3Title: "Transparent Civic Redressal",
    feature3Desc: "File issues directly in our complaint portal, monitor status, and get notifications on progress.",
    feature4Title: "Central Dashboard",
    feature4Desc: "Track your past conversations and active complaints under one secure and elegant dashboard.",

    // AI Assistant
    chatWelcome: "Namaste! I am Smart Bharat AI. How can I help you today?",
    chatPlaceholder: "Ask me about Passport, Aadhaar, PAN, Voter ID, Schemes, or Eligibility...",
    chatDisclaimer: "Disclaimer: Smart Bharat AI is an assistant. Please verify critical information with official government portals.",
    quickLinks: "Quick Help Topics",
    btnSend: "Send",
    typing: "AI is thinking...",

    // Schemes
    schemeFinderTitle: "Government Scheme Finder",
    schemeFinderSubtitle: "Enter your profile to find government benefits tailored for you.",
    labelAge: "Age (in Years)",
    labelGender: "Gender",
    labelOccupation: "Occupation",
    labelIncome: "Annual Family Income (INR)",
    labelState: "State of Residence",
    labelCategory: "Social Category",
    btnSearchSchemes: "Find Schemes",
    searchingSchemes: "Searching matching schemes via Gemini AI...",
    noSchemes: "No matching schemes found. Adjust your filters and try again.",
    schemeMatch: "Why it matches you",
    schemeBenefits: "Benefits",
    schemeEligibility: "Eligibility",
    schemeDocuments: "Required Documents",
    schemeProcess: "Application Process",

    // Complaints
    complaintTitle: "Civic Complaint Registration",
    complaintSubtitle: "Report public issues to the municipal administration. We will track and help resolve them.",
    labelName: "Full Name",
    labelPhone: "Phone Number",
    labelLocation: "Detailed Location / Address",
    labelCategoryCivic: "Complaint Category",
    labelDescription: "Detailed Description of the Issue",
    labelPriority: "Priority Level",
    btnSubmitComplaint: "Register Complaint",
    complaintSuccess: "Complaint Registered Successfully!",
    complaintID: "Complaint ID",
    complaintDate: "Registration Date",
    complaintStatus: "Current Status",

    // Dashboard
    dashboardTitle: "Citizen Dashboard",
    dashboardSubtitle: "Overview of your civic interactions, schemes, and complaints.",
    totalComplaints: "Total Complaints Filed",
    resolvedIssues: "Resolved Issues",
    pendingIssues: "Pending Issues",
    recentComplaints: "Recent Complaints Registry",
    recentChats: "Recent AI Conversations",
    noChatsYet: "No conversation history found. Start chatting in the AI Assistant!",
    noComplaintsYet: "No complaints registered yet. File an issue in the Complaint Portal.",
    statusPending: "Pending Verification",
    statusProgress: "In Progress",
    statusResolved: "Resolved",
  },
  hi: {
    // Navbar
    navHome: "मुख्य पृष्ठ",
    navAssistant: "एआई सहायक",
    navSchemes: "योजना खोजक",
    navComplaints: "शिकायत दर्ज करें",
    navDashboard: "डैशबोर्ड",
    govTitle: "भारत सरकार",
    govSubtitle: "स्मार्ट भारत एआई पोर्टल",

    // Home
    heroTitle: "स्मार्ट भारत एआई",
    heroSubtitle: "सरकारी सेवाओं के लिए आपका बुद्धिमान एआई साथी",
    btnStartAI: "एआई सहायक शुरू करें",
    btnExploreSchemes: "योजनाएं खोजें",
    statsActiveUsers: "आज के सक्रिय उपयोगकर्ता",
    statsResolvedComplaints: "सुलझाए गए नागरिक मुद्दे",
    statsSupportedSchemes: "अनुक्रमित सरकारी योजनाएं",
    whyChooseTitle: "स्मार्ट भारत एआई क्यों चुनें?",
    whyChooseDesc: "अत्याधुनिक एआई तकनीकों का उपयोग करके नागरिकों और प्रशासन के बीच की दूरी को पाटना।",
    feature1Title: "बहुभाषी एआई चैट",
    feature1Desc: "अंग्रेजी, हिंदी या तमिल में प्रश्न पूछें और सटीक चरण-दर-चरण निर्देश प्राप्त करें।",
    feature2Title: "व्यक्तिगत योजना मिलान",
    feature2Desc: "यह जानने के लिए कि आप किन कल्याणकारी और आर्थिक योजनाओं के लिए पात्र हैं, अपना विवरण दर्ज करें।",
    feature3Title: "पारदर्शी नागरिक निवारण",
    feature3Desc: "शिकायत पोर्टल में सीधे मुद्दे दर्ज करें, स्थिति की निगरानी करें और प्रगति पर सूचनाएं प्राप्त करें।",
    feature4Title: "केंद्रीय डैशबोर्ड",
    feature4Desc: "एक सुरक्षित और सुंदर डैशबोर्ड के तहत अपनी पिछली बातचीत और सक्रिय शिकायतों को ट्रैक करें।",

    // AI Assistant
    chatWelcome: "नमस्ते! मैं स्मार्ट भारत एआई हूँ। आज मैं आपकी क्या मदद कर सकता हूँ?",
    chatPlaceholder: "मुझसे पासपोर्ट, आधार, पैन, वोटर आईडी, योजनाओं या पात्रता के बारे में पूछें...",
    chatDisclaimer: "अस्वीकरण: स्मार्ट भारत एआई एक सहायक है। कृपया आधिकारिक सरकारी पोर्टलों के साथ महत्वपूर्ण जानकारी को सत्यापित करें।",
    quickLinks: "त्वरित सहायता विषय",
    btnSend: "भेजें",
    typing: "एआई सोच रहा है...",

    // Schemes
    schemeFinderTitle: "सरकारी योजना खोजक",
    schemeFinderSubtitle: "अपने लिए अनुकूलित सरकारी लाभ खोजने के लिए अपनी प्रोफ़ाइल दर्ज करें।",
    labelAge: "आयु (वर्षों में)",
    labelGender: "लिंग",
    labelOccupation: "व्यवसाय",
    labelIncome: "वार्षिक पारिवारिक आय (INR)",
    labelState: "निवास का राज्य",
    labelCategory: "सामाजिक श्रेणी",
    btnSearchSchemes: "योजनाएं खोजें",
    searchingSchemes: "जेमिनी एआई के माध्यम से मिलान योजनाओं की खोज की जा रही है...",
    noSchemes: "कोई मिलान योजना नहीं मिली। कृपया अपने फ़िल्टर बदलें।",
    schemeMatch: "यह आपसे क्यों मेल खाता है",
    schemeBenefits: "लाभ",
    schemeEligibility: "पात्रता",
    schemeDocuments: "आवश्यक दस्तावेज़",
    schemeProcess: "आवेदन प्रक्रिया",

    // Complaints
    complaintTitle: "नागरिक शिकायत पंजीकरण",
    complaintSubtitle: "नगर निगम प्रशासन को सार्वजनिक मुद्दों की रिपोर्ट करें। हम उन्हें ट्रैक और हल करने में मदद करेंगे।",
    labelName: "पूरा नाम",
    labelPhone: "फ़ोन नंबर",
    labelLocation: "विस्तृत स्थान / पता",
    labelCategoryCivic: "शिकायत की श्रेणी",
    labelDescription: "मुद्दे का विस्तृत विवरण",
    labelPriority: "प्राथमिकता स्तर",
    btnSubmitComplaint: "शिकायत दर्ज करें",
    complaintSuccess: "शिकायत सफलतापूर्वक पंजीकृत की गई!",
    complaintID: "शिकायत आईडी",
    complaintDate: "पंजीकरण की तारीख",
    complaintStatus: "वर्तमान स्थिति",

    // Dashboard
    dashboardTitle: "नागरिक डैशबोर्ड",
    dashboardSubtitle: "आपके नागरिक संवादों, योजनाओं और शिकायतों का अवलोकन।",
    totalComplaints: "कुल दर्ज शिकायतें",
    resolvedIssues: "हल किए गए मुद्दे",
    pendingIssues: "लंबित मुद्दे",
    recentComplaints: "हालिया शिकायतें",
    recentChats: "हालिया एआई बातचीत",
    noChatsYet: "कोई बातचीत इतिहास नहीं मिला। एआई सहायक में चैट करना शुरू करें!",
    noComplaintsYet: "अभी तक कोई शिकायत दर्ज नहीं की गई है। शिकायत पोर्टल में शिकायत दर्ज करें।",
    statusPending: "सत्यापन लंबित",
    statusProgress: "प्रगति में",
    statusResolved: "समाधान किया गया",
  },
  ta: {
    // Navbar
    navHome: "முகப்பு",
    navAssistant: "AI உதவியாளர்",
    navSchemes: "திட்டங்கள் கண்டறிவி",
    navComplaints: "புகார் அளிக்கவும்",
    navDashboard: "டாஷ்போர்டு",
    govTitle: "இந்திய அரசு",
    govSubtitle: "ஸ்மார்ட் பாரத் AI போர்டல்",

    // Home
    heroTitle: "ஸ்மார்ட் பாரத் AI",
    heroSubtitle: "அரசு சேவைகளுக்கான உங்கள் புத்திசாலித்தனமான AI துணை",
    btnStartAI: "AI உதவியாளரைத் தொடங்குக",
    btnExploreSchemes: "திட்டங்களை ஆராயுங்கள்",
    statsActiveUsers: "இன்றைய செயலில் உள்ள பயனர்கள்",
    statsResolvedComplaints: "தீர்க்கப்பட்ட மக்கள் புகார்கள்",
    statsSupportedSchemes: "அடைவு செய்யப்பட்ட அரசு திட்டங்கள்",
    whyChooseTitle: "ஏன் ஸ்மார்ட் பாரத் AI?",
    whyChooseDesc: "நவீன AI தொழில்நுட்பங்களைப் பயன்படுத்தி குடிமக்களுக்கும் நிர்வாகத்திற்கும் இடையிலான இடைவெளியைக் குறைத்தல்.",
    feature1Title: "பல்மொழி AI அரட்டை",
    feature1Desc: "ஆங்கிலம், இந்தி அல்லது தமிழில் கேள்விகளைக் கேட்டு துல்லியமான படிப்படியான வழிமுறைகளைப் பெறுங்கள்.",
    feature2Title: "தனிப்பயனாக்கப்பட்ட திட்ட மேலாளர்",
    feature2Desc: "நீங்கள் தகுதிபெறும் நலத்திட்டங்களைக் கண்டறிய உங்கள் மக்கள்தொகை விவரங்களை உள்ளிடவும்.",
    feature3Title: "வெளிப்படையான குடிமக்கள் குறைதீர்ப்பு",
    feature3Desc: "எங்கள் புகார் போர்ட்டலில் நேரடியாகப் புகார்களைப் பதிவுசெய்து, அதன் நிலையைக் கண்காணித்து உடனுக்குடன் தகவல் பெறுங்கள்.",
    feature4Title: "மைய டாஷ்போர்டு",
    feature4Desc: "உங்கள் முந்தைய உரையாடல்களையும் செயலில் உள்ள புகார்களையும் ஒரு பாதுகாப்பான டாஷ்போர்டில் கண்காணிக்கவும்.",

    // AI Assistant
    chatWelcome: "வணக்கம்! நான் ஸ்மார்ட் பாரத் AI. இன்று உங்களுக்கு எவ்வாறு உதவ முடியும்?",
    chatPlaceholder: "பாஸ்போர்ட், ஆதார், பான், வாக்காளர் அடையாள அட்டை, திட்டங்கள் அல்லது தகுதிகள் பற்றி என்னிடம் கேளுங்கள்...",
    chatDisclaimer: "பொறுப்புத் துறப்பு: ஸ்மார்ட் பாரத் AI ஒரு துணை உதவியாளர். முக்கியமான தகவல்களை அதிகாரப்பூர்வ அரசு இணையதளங்களில் சரிபார்க்கவும்.",
    quickLinks: "விரைவு உதவித் தலைப்புகள்",
    btnSend: "அனுப்புக",
    typing: "AI யோசித்துக்கொண்டிருக்கிறது...",

    // Schemes
    schemeFinderTitle: "அரசுத் திட்டக் கண்டறிவி",
    schemeFinderSubtitle: "உங்களுக்குத் தகுதியான அரசு நலத்திட்டங்களைக் கண்டறிய உங்கள் விவரங்களை உள்ளிடவும்.",
    labelAge: "வயது (ஆண்டுகளில்)",
    labelGender: "பாலினம்",
    labelOccupation: "தொழில்",
    labelIncome: "ஆண்டு குடும்ப வருமானம் (INR)",
    labelState: "வசிப்பிடம்",
    labelCategory: "சமூகப் பிரிவு",
    btnSearchSchemes: "திட்டங்களைக் கண்டறி",
    searchingSchemes: "ஜெமினி AI மூலம் திட்டங்கள் தேடப்படுகின்றன...",
    noSchemes: "பொருத்தமான திட்டங்கள் எதுவும் இல்லை. வடிகட்டிகளை மாற்றி மீண்டும் முயற்சிக்கவும்.",
    schemeMatch: "உங்களுக்கு ஏன் பொருந்துகிறது",
    schemeBenefits: "நன்மைகள்",
    schemeEligibility: "தகுதி",
    schemeDocuments: "தேவையான ஆவணங்கள்",
    schemeProcess: "விண்ணப்பிக்கும் முறை",

    // Complaints
    complaintTitle: "குடிமக்கள் புகார் பதிவு",
    complaintSubtitle: "மாநகராட்சி நிர்வாகத்திற்குப் பொதுப் பிரச்சினைகளைப் புகாரளிக்கவும். அவற்றைக் கண்காணிக்கவும் தீர்க்கவும் நாங்கள் உதவுவோம்.",
    labelName: "முழு பெயர்",
    labelPhone: "தொலைபேசி எண்",
    labelLocation: "விரிவான முகவரி / இருப்பிடம்",
    labelCategoryCivic: "புகார் வகை",
    labelDescription: "பிரச்சினையின் விரிவான விவரம்",
    labelPriority: "முன்னுரிமை நிலை",
    btnSubmitComplaint: "புகாரைப் பதிவுசெய்",
    complaintSuccess: "புகார் வெற்றிகரமாகப் பதிவுசெய்யப்பட்டது!",
    complaintID: "புகார் ஐடி",
    complaintDate: "பதிவு செய்த தேதி",
    complaintStatus: "தற்போதைய நிலை",

    // Dashboard
    dashboardTitle: "குடிமக்கள் டாஷ்போர்டு",
    dashboardSubtitle: "உங்கள் அரசுத் தொடர்புகள், திட்டங்கள் மற்றும் புகார்களின் கண்ணோட்டம்.",
    totalComplaints: "பதிவு செய்யப்பட்ட மொத்த புகார்கள்",
    resolvedIssues: "தீர்க்கப்பட்ட பிரச்சினைகள்",
    pendingIssues: "நிலுவையில் உள்ள பிரச்சினைகள்",
    recentComplaints: "சமீபத்திய புகார்கள்",
    recentChats: "சமீபத்திய AI உரையாடல்கள்",
    noChatsYet: "உரையாடல் வரலாறு இல்லை. AI உதவியாளருடன் அரட்டையடிக்கத் தொடங்குங்கள்!",
    noComplaintsYet: "புகார்கள் எதுவும் இன்னும் பதிவு செய்யப்படவில்லை. புகார் பக்கத்தில் ஒரு புகாரைப் பதிவுசெய்க.",
    statusPending: "சரிபார்ப்பு நிலுவையில் உள்ளது",
    statusProgress: "செயலாக்கத்தில் உள்ளது",
    statusResolved: "தீர்க்கப்பட்டது",
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('smart_bharat_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('smart_bharat_lang', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  const getLanguageName = () => {
    switch (language) {
      case 'hi': return 'हिन्दी';
      case 'ta': return 'தமிழ்';
      default: return 'English';
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLanguageName }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
