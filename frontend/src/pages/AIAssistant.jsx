import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  Send, 
  Plus, 
  Trash2, 
  MessageSquare, 
  ArrowRight,
  ShieldAlert,
  Loader,
  HelpCircle
} from 'lucide-react';

export default function AIAssistant() {
  const { language, t } = useLanguage();
  const location = useLocation();
  const messagesEndRef = useRef(null);

  // States
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Quick prompt bubbles based on language
  const getSuggestionBubbles = () => {
    if (language === 'hi') {
      return [
        { text: "पैन कार्ड के लिए आवेदन कैसे करें?", label: "पैन कार्ड मार्गदर्शन" },
        { text: "पासपोर्ट नवीनीकरण के लिए कौन से दस्तावेज चाहिए?", label: "पासपोर्ट दस्तावेज" },
        { text: "आयुष्मान भारत योजना की पात्रता क्या है?", label: "योजना पात्रता" },
        { text: "नया आधार कार्ड कैसे बनवाएं?", label: "नया आधार कार्ड" },
      ];
    } else if (language === 'ta') {
      return [
        { text: "பான் கார்டுக்கு எவ்வாறு விண்ணப்பிப்பது?", label: "பான் கார்டு" },
        { text: "கடவுச்சீட்டு (Passport) பெற தேவையான ஆவணங்கள் யாவை?", label: "கடவுச்சீட்டு ஆவணங்கள்" },
        { text: "ஆயுஷ்மான் பாரத் திட்டத்தின் தகுதி என்ன?", label: "திட்டத் தகுதி" },
        { text: "புதிய ஆதார் அட்டை பெறுவது எப்படி?", label: "புதிய ஆதார்" },
      ];
    } else {
      return [
        { text: "How do I apply for a fresh PAN Card?", label: "Apply for PAN" },
        { text: "What documents are required for Passport renewal?", label: "Passport Documents" },
        { text: "What is the eligibility for Ayushman Bharat scheme?", label: "Scheme Eligibility" },
        { text: "How to register a complaint for municipal streetlights?", label: "Complaint Help" },
      ];
    }
  };

  // Load chats from Local Storage on mount
  useEffect(() => {
    try {
      const savedChats = localStorage.getItem('smart_bharat_chats');
      if (savedChats) {
        const parsed = JSON.parse(savedChats);
        if (Array.isArray(parsed)) {
          setChats(parsed);
          if (parsed.length > 0) {
            setActiveChatId(parsed[0].id);
          }
        }
      }
    } catch (error) {
      console.error('Error parsing saved chats:', error);
      localStorage.removeItem('smart_bharat_chats');
    }
  }, []);

  // Handle auto-submit from Home page service redirection
  useEffect(() => {
    if (location.state?.service && chats.length > 0) {
      const serviceName = location.state.service;
      // Start a new chat for this service query
      handleNewChat(`Help with ${serviceName}`);
    } else if (location.state?.service && chats.length === 0) {
      // If chats state is still empty (loading), wait briefly
      const timer = setTimeout(() => {
        handleNewChat(`Help with ${location.state.service}`);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  // Scroll to bottom whenever messages list or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeChatId, isLoading]);

  // Get active chat
  const activeChat = chats.find(c => c.id === activeChatId);

  // Create a new chat thread
  const handleNewChat = (initialText = '') => {
    const newId = Date.now().toString();
    const newChatObj = {
      id: newId,
      title: initialText ? (initialText.length > 25 ? initialText.substring(0, 22) + '...' : initialText) : 'New Conversation',
      messages: [],
      updatedAt: newId
    };

    const updatedChats = [newChatObj, ...chats];
    setChats(updatedChats);
    localStorage.setItem('smart_bharat_chats', JSON.stringify(updatedChats));
    setActiveChatId(newId);

    if (initialText) {
      submitMessage(initialText, newId, updatedChats);
    }
  };

  // Delete a chat thread
  const handleDeleteChat = (id, e) => {
    e.stopPropagation();
    const updatedChats = chats.filter(c => c.id !== id);
    setChats(updatedChats);
    localStorage.setItem('smart_bharat_chats', JSON.stringify(updatedChats));
    
    if (activeChatId === id) {
      if (updatedChats.length > 0) {
        setActiveChatId(updatedChats[0].id);
      } else {
        setActiveChatId(null);
      }
    }
  };

  // Submit message to active thread
  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;
    
    let targetChatId = activeChatId;
    let currentChats = [...chats];

    if (!targetChatId) {
      const newId = Date.now().toString();
      const newChatObj = {
        id: newId,
        title: inputMessage.length > 25 ? inputMessage.substring(0, 22) + '...' : inputMessage,
        messages: [],
        updatedAt: newId
      };
      currentChats = [newChatObj, ...chats];
      setChats(currentChats);
      targetChatId = newId;
      setActiveChatId(newId);
    }

    const messageText = inputMessage;
    setInputMessage('');
    submitMessage(messageText, targetChatId, currentChats);
  };

  // Call API for Gemini response
  const submitMessage = async (messageText, chatId, currentChats) => {
    setIsLoading(true);
    
    // 1. Update list locally with user message
    const chatIndex = currentChats.findIndex(c => c.id === chatId);
    if (chatIndex === -1) return;

    const userMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString()
    };

    const targetChat = { ...currentChats[chatIndex] };
    targetChat.messages = [...targetChat.messages, userMessage];
    
    // Set chat title if it was default
    if (targetChat.title === 'New Conversation') {
      targetChat.title = messageText.length > 25 ? messageText.substring(0, 22) + '...' : messageText;
    }
    targetChat.updatedAt = new Date().toISOString();

    const updatedChats1 = [...currentChats];
    updatedChats1[chatIndex] = targetChat;
    setChats(updatedChats1);
    localStorage.setItem('smart_bharat_chats', JSON.stringify(updatedChats1));

    // 2. Prepare payload and fetch backend AI proxy
    try {
      const languagePayloadMap = {
        en: 'English',
        hi: 'Hindi',
        ta: 'Tamil'
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: targetChat.messages,
          language: languagePayloadMap[language] || 'English'
        })
      });

      if (!response.ok) {
        throw new Error('Server response was not OK');
      }

      const data = await response.json();

      // 3. Add AI response to local list
      const aiMessage = {
        role: 'assistant',
        content: data.content,
        timestamp: new Date().toISOString()
      };

      // Query latest chats state to avoid closure bugs
      const latestChats = JSON.parse(localStorage.getItem('smart_bharat_chats')) || updatedChats1;
      const latestChatIndex = latestChats.findIndex(c => c.id === chatId);
      
      if (latestChatIndex !== -1) {
        const latestTargetChat = { ...latestChats[latestChatIndex] };
        latestTargetChat.messages = [...latestTargetChat.messages, aiMessage];
        latestTargetChat.updatedAt = new Date().toISOString();
        
        const finalChats = [...latestChats];
        finalChats[latestChatIndex] = latestTargetChat;
        setChats(finalChats);
        localStorage.setItem('smart_bharat_chats', JSON.stringify(finalChats));
      }

    } catch (err) {
      console.error('Chat error:', err);
      // Fallback network error message in chat window
      const errMsg = {
        role: 'assistant',
        content: `Error: Unable to reach the Smart Bharat AI engine. Please verify the backend is running and that your network connection is stable.`,
        timestamp: new Date().toISOString()
      };

      const latestChats = JSON.parse(localStorage.getItem('smart_bharat_chats')) || updatedChats1;
      const latestChatIndex = latestChats.findIndex(c => c.id === chatId);
      if (latestChatIndex !== -1) {
        const latestTargetChat = { ...latestChats[latestChatIndex] };
        latestTargetChat.messages = [...latestTargetChat.messages, errMsg];
        
        const finalChats = [...latestChats];
        finalChats[latestChatIndex] = latestTargetChat;
        setChats(finalChats);
        localStorage.setItem('smart_bharat_chats', JSON.stringify(finalChats));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem-1.5px)] bg-slate-50 overflow-hidden">
      
      {/* Sidebar Container */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-900 text-white shrink-0 border-r border-slate-800">
        {/* New Chat Button */}
        <div className="p-4 border-b border-slate-800">
          <button
            onClick={() => handleNewChat()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-govBlue-600 hover:bg-govBlue-700 text-white font-semibold shadow-md transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {chats.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 font-medium">
              No previous chats found
            </div>
          ) : (
            chats.map((ch) => (
              <div
                key={ch.id}
                onClick={() => setActiveChatId(ch.id)}
                className={`flex justify-between items-center px-4 py-3 rounded-xl cursor-pointer group transition-all duration-200 ${
                  ch.id === activeChatId
                    ? 'bg-govBlue-950/70 border border-govBlue-800/80 text-govBlue-400 font-medium'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <MessageSquare className={`w-4 h-4 shrink-0 ${ch.id === activeChatId ? 'text-govBlue-400' : 'text-slate-500'}`} />
                  <span className="text-sm truncate select-none">{ch.title}</span>
                </div>
                <button
                  onClick={(e) => handleDeleteChat(ch.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 hover:bg-slate-800 rounded-md transition-all duration-150"
                  title="Delete Conversation"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Main Chat Pane */}
      <section className="flex-1 flex flex-col h-full bg-white relative">
        
        {/* Active Conversation Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 space-y-6">
          {!activeChat || activeChat.messages.length === 0 ? (
            
            // Welcome Blank Slate
            <div className="max-w-3xl mx-auto py-12 text-center space-y-8">
              <div className="w-16 h-16 rounded-3xl bg-govBlue-50 border border-govBlue-100 flex items-center justify-center mx-auto shadow-sm">
                <svg className="w-9 h-9 text-govBlue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                  {t('chatWelcome')}
                </h2>
                <p className="text-sm text-slate-500 max-w-xl mx-auto font-medium">
                  I can assist you with passports, voter IDs, eligibility criteria, documentation lists, and portal guides in English, हिन्दी, or தமிழ்.
                </p>
              </div>

              {/* Suggestion Bubbles */}
              <div className="space-y-4 max-w-2xl mx-auto">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-left flex items-center gap-1.5 px-1">
                  <HelpCircle className="w-4 h-4 text-govBlue-500" />
                  <span>{t('quickLinks')}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {getSuggestionBubbles().map((bubble, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!activeChatId) {
                          handleNewChat(bubble.text);
                        } else {
                          setInputMessage(bubble.text);
                        }
                      }}
                      className="text-left px-5 py-4 border border-slate-200 hover:border-govBlue-400 hover:bg-govBlue-50/20 rounded-2xl transition-all duration-200 shadow-sm flex items-center justify-between group"
                    >
                      <div>
                        <span className="block text-xs font-bold text-govBlue-600 uppercase tracking-wider mb-1">{bubble.label}</span>
                        <span className="text-sm font-medium text-slate-700 leading-normal">{bubble.text}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-govBlue-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
          ) : (
            
            // Conversation Message Thread
            <div className="max-w-4xl mx-auto space-y-6">
              <AnimatePresence initial={false}>
                {activeChat.messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* Bot Avatar */}
                    {msg.role !== 'user' && (
                      <div className="w-9 h-9 rounded-xl bg-govBlue-500 border border-govBlue-600 flex items-center justify-center shadow shrink-0 text-white font-bold text-xs mt-0.5">
                        SB
                      </div>
                    )}
                    
                    {/* Message Bubble */}
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-govBlue-600 text-white rounded-tr-none font-medium'
                          : 'bg-slate-100 text-slate-800 rounded-tl-none font-normal border border-slate-200/50'
                      }`}
                    >
                      {/* Markdown-style list / paragraph parsing (simple helper) */}
                      <div className="space-y-2 whitespace-pre-wrap">
                        {msg.content}
                      </div>
                    </div>

                    {/* User Avatar */}
                    {msg.role === 'user' && (
                      <div className="w-9 h-9 rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center shadow shrink-0 text-slate-700 font-bold text-xs mt-0.5">
                        U
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Typing Animation */}
              {isLoading && (
                <div className="flex items-start gap-4 justify-start">
                  <div className="w-9 h-9 rounded-xl bg-govBlue-500 border border-govBlue-600 flex items-center justify-center shadow shrink-0 text-white font-bold text-xs">
                    SB
                  </div>
                  <div className="bg-slate-100 border border-slate-200/50 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
                    {/* Dot animation */}
                    <div className="flex gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-govBlue-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-govBlue-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-govBlue-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{t('typing')}</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Disclaimer banner & Fixed Input Box */}
        <div className="border-t border-slate-100 bg-white p-4 sm:p-6 shadow-inner shrink-0">
          <div className="max-w-4xl mx-auto space-y-4">
            
            {/* Input Form */}
            <form onSubmit={handleSend} className="relative flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t('chatPlaceholder')}
                disabled={isLoading}
                className="w-full pl-5 pr-14 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-govBlue-500 focus:border-transparent text-sm bg-slate-50 text-slate-800 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="absolute right-3.5 p-2 rounded-xl bg-govBlue-600 hover:bg-govBlue-700 text-white shadow-md disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none transition-colors"
              >
                {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </form>

            {/* Disclaimer Disclaimer */}
            <div className="flex items-center gap-2 justify-center text-[11px] text-slate-500">
              <ShieldAlert className="w-4 h-4 text-saffron-500 shrink-0" />
              <p className="text-center font-medium leading-normal">{t('chatDisclaimer')}</p>
            </div>

          </div>
        </div>

      </section>

    </div>
  );
}
