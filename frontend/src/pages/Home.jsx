import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  MessageSquare, 
  Search, 
  FileText, 
  HelpCircle, 
  ShieldCheck, 
  Globe, 
  Clock, 
  Award, 
  ArrowRight,
  TrendingUp,
  BookOpen,
  LayoutDashboard
} from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const services = [
    { name: "Aadhaar Card", desc: "UIDAI identification, address update, card download guidance.", type: "identity" },
    { name: "PAN Card", desc: "Permanent Account Number application, status tracking, linking with Aadhaar.", type: "finance" },
    { name: "Passport Services", desc: "Fresh passport reissue application procedure, document checklists.", type: "travel" },
    { name: "Voter ID Card", desc: "Voter registration, EPIC card updates, polling station search help.", type: "civic" },
    { name: "Driving License", desc: "Learner's license, slot booking, permanent license renewal process.", type: "transport" },
    { name: "Birth Certificate", desc: "Online registration procedure, state-wise portal guides, corrections.", type: "certificate" },
  ];

  const stats = [
    { value: "48,500+", labelKey: "statsActiveUsers", icon: <TrendingUp className="w-5 h-5 text-saffron-500" /> },
    { value: "12,200+", labelKey: "statsResolvedComplaints", icon: <ShieldCheck className="w-5 h-5 text-emerald-500" /> },
    { value: "850+", labelKey: "statsSupportedSchemes", icon: <BookOpen className="w-5 h-5 text-govBlue-500" /> },
  ];

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-tricolor-gradient min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-govBlue-50 border border-govBlue-100/60 mb-6"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-govBlue-500 animate-ping"></span>
            <span className="text-xs font-bold text-govBlue-700 uppercase tracking-widest">
              Digital India Facilitation Portal
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-sans"
          >
            {t('heroTitle')}
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            {t('heroSubtitle')}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => navigate('/assistant')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-govBlue-600 hover:bg-govBlue-700 text-white font-semibold text-base shadow-lg hover:shadow-xl hover:shadow-govBlue-500/20 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{t('btnStartAI')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/schemes')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-govBlue-600 font-semibold text-base shadow-sm hover:shadow transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span>{t('btnExploreSchemes')}</span>
            </button>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-saffron-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      </section>

      {/* Statistics Section */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="max-w-6xl mx-auto bg-white/75 backdrop-blur-md border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50/50 transition-colors">
              <div className="p-3 bg-slate-100 rounded-2xl">
                {stat.icon}
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">{stat.value}</span>
                <span className="text-xs sm:text-sm font-medium text-slate-500">{t(stat.labelKey)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Smart Bharat Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">{t('whyChooseTitle')}</h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto font-medium">
              {t('whyChooseDesc')}
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-saffron-500"></div>
              <div className="p-3 bg-saffron-50 rounded-xl w-fit text-saffron-600 mb-5">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{t('feature1Title')}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{t('feature1Desc')}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-govBlue-500"></div>
              <div className="p-3 bg-govBlue-50 rounded-xl w-fit text-govBlue-600 mb-5">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{t('feature2Title')}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{t('feature2Desc')}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
              <div className="p-3 bg-emerald-50 rounded-xl w-fit text-emerald-600 mb-5">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{t('feature3Title')}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{t('feature3Desc')}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-700"></div>
              <div className="p-3 bg-slate-100 rounded-xl w-fit text-slate-700 mb-5">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{t('feature4Title')}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{t('feature4Desc')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Government Services Grid */}
      <section className="py-16 bg-slate-900 text-white px-4 sm:px-6 lg:px-8 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-saffron-500 font-bold uppercase tracking-widest text-xs">AI-Guided Service Directory</span>
            <h2 className="text-3xl font-bold text-white mt-2">Civic Services Covered</h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto font-medium">
              Click any of the central public documents below to launch the assistant with pre-loaded queries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate('/assistant', { state: { service: svc.name } })}
                className="bg-slate-800/50 hover:bg-slate-800 border border-slate-800 hover:border-govBlue-500/50 p-6 rounded-2xl cursor-pointer transition-all duration-200 group transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-lg text-slate-200 group-hover:text-govBlue-400 transition-colors">{svc.name}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-govBlue-950 group-hover:text-govBlue-400 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-50 border border-saffron-100 text-saffron-700 text-xs font-bold uppercase tracking-wider">
              Citizen Welfare Powered by Gemini
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              An intelligent companion that speaks your language
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              We leverage advanced artificial intelligence to translate complex administrative files, application guidelines, eligibility lists, and scheme prerequisites into conversational language.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">24/7 Citizen Support</h4>
                  <p className="text-xs text-slate-500">Instant answers without long queues or office waiting times.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-govBlue-50 text-govBlue-600 rounded-lg shrink-0 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Vernacular Access</h4>
                  <p className="text-xs text-slate-500">Accessible interfaces in Hindi, Tamil, and English to bridge the digital divide.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-saffron-50 text-saffron-600 rounded-lg shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Accurate Grievance Routing</h4>
                  <p className="text-xs text-slate-500">Helpful templates and procedures for registering municipal, utility, or identity card complaints.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            {/* Visual Call To Action Panel */}
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-xl w-full max-w-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-saffron-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 -mr-6 -mt-6"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-govBlue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 -ml-6 -mb-6"></div>
              
              <div className="relative text-center space-y-6">
                <HelpCircle className="w-16 h-16 text-govBlue-500 mx-auto" />
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Have queries about schemes?</h3>
                  <p className="text-slate-500 text-sm mt-2">Ask our AI companion directly, or check eligibility using the Scheme Finder.</p>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/assistant')}
                    className="w-full py-3 bg-govBlue-600 hover:bg-govBlue-700 text-white rounded-full font-semibold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Talk to Assistant</span>
                  </button>
                  <button
                    onClick={() => navigate('/schemes')}
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <span>Check Welfare Eligibility</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
