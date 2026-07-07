import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe, User, MessageSquare, Search, FileText, LayoutDashboard, Home } from 'lucide-react';

export default function Navbar() {
  const { language, setLanguage, t, getLanguageName } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navItems = [
    { path: '/', labelKey: 'navHome', icon: <Home className="w-4 h-4" /> },
    { path: '/assistant', labelKey: 'navAssistant', icon: <MessageSquare className="w-4 h-4" /> },
    { path: '/schemes', labelKey: 'navSchemes', icon: <Search className="w-4 h-4" /> },
    { path: '/complaints', labelKey: 'navComplaints', icon: <FileText className="w-4 h-4" /> },
    { path: '/dashboard', labelKey: 'navDashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm backdrop-blur-md bg-opacity-95">
      {/* Top Banner (Govt Style) */}
      <div className="bg-gradient-to-r from-saffron-500 via-white to-emerald-600 h-1.5 w-full"></div>
      <div className="bg-slate-900 text-[10px] sm:text-xs text-slate-300 py-1 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Ashoka Chakra Tiny SVG */}
          <svg className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="2" />
            <path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" />
          </svg>
          <span>{t('govTitle')}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">National Single Sign-on Integration Ready</span>
          <span className="text-emerald-400 font-semibold">• Live Services Status: Online</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-govBlue-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                {/* SVG National Flag/Ashoka Chakra styled emblem */}
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <circle cx="12" cy="11" r="3" className="stroke-saffron-300" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-800 font-sans tracking-tight block">
                  Smart Bharat <span className="text-govBlue-500">AI</span>
                </span>
                <span className="text-[10px] text-slate-500 -mt-1 block font-medium">
                  {t('govSubtitle')}
                </span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-250 ${
                    isActive
                      ? 'bg-govBlue-50 text-govBlue-600 shadow-sm border border-govBlue-100/50'
                      : 'text-slate-600 hover:text-govBlue-600 hover:bg-slate-50'
                  }`
                }
              >
                {item.icon}
                {t(item.labelKey)}
              </NavLink>
            ))}
          </div>

          {/* Language Selector + Mobile Button */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 hover:border-govBlue-400 hover:bg-slate-50 transition-colors text-slate-700 text-sm font-medium"
              >
                <Globe className="w-4 h-4 text-govBlue-500" />
                <span>{getLanguageName()}</span>
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white border border-slate-100 shadow-lg py-1.5 z-50 animate-fadeIn">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                      language === 'en' ? 'text-govBlue-600 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange('hi')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                      language === 'hi' ? 'text-govBlue-600 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    हिन्दी
                  </button>
                  <button
                    onClick={() => handleLanguageChange('ta')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                      language === 'ta' ? 'text-govBlue-600 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    தமிழ்
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-govBlue-600 hover:bg-slate-50 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-inner animate-slideDown">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-govBlue-500 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-govBlue-600'
                }`
              }
            >
              {item.icon}
              {t(item.labelKey)}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
