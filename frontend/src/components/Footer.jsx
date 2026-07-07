import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldAlert, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-full bg-govBlue-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">Smart Bharat <span className="text-govBlue-400">AI</span></span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              Empowering Indian citizens with an intelligent, multilingual companion for navigating public services, understanding central and state government schemes, and fast-tracking civic grievances.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-saffron-500" /> Helpline: 1950</span>
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-govBlue-400" /> support@smartbharat.gov.in</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Official Portals</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  National Portal of India <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.myscheme.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  myScheme Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  CPGRAMS PGPortal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://uidai.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  UIDAI Aadhaar <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">Important Notice</h4>
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-800 flex gap-2">
              <ShieldAlert className="w-10 h-10 text-saffron-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-normal">
                Smart Bharat AI is an independent AI-driven facilitation tool. This is not an official government agency or administrative body. Scheme details and processes should be cross-verified directly on official domains.
              </p>
            </div>
          </div>
          
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Smart Bharat AI Facilitation. Built for Digital India Initiatives.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Citizen Charter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
