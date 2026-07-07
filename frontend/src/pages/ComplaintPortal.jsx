import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  FileText, 
  User, 
  Phone, 
  MapPin, 
  AlertTriangle, 
  Info,
  CheckCircle,
  Clock,
  Printer,
  LayoutDashboard
} from 'lucide-react';

const CATEGORIES = [
  "Garbage & Waste Disposal",
  "Potholes & Road Repair",
  "Streetlight Malfunction",
  "Water Logging & Drainage",
  "Public Drinking Water Supply",
  "Electricity & Power Cuts",
  "Stray Animal Menace",
  "Public Safety & Security",
  "Others"
];

export default function ComplaintPortal() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    category: 'Potholes & Road Repair',
    description: '',
    priority: 'Medium'
  });

  const [submittedComplaint, setSubmittedComplaint] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.location || !formData.description) {
      alert('Please fill in all required fields.');
      return;
    }

    const complaintId = `SB-COMP-${Math.floor(100000 + Math.random() * 900000)}`;
    const submissionDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newComplaint = {
      ...formData,
      id: complaintId,
      date: submissionDate,
      status: 'Pending Verification' // Default Status
    };

    // Load existing complaints, append and save
    let existing = [];
    try {
      const saved = localStorage.getItem('smart_bharat_complaints');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          existing = parsed;
        }
      }
    } catch (e) {
      console.error('Error parsing existing complaints:', e);
    }
    
    const updated = [newComplaint, ...existing];
    localStorage.setItem('smart_bharat_complaints', JSON.stringify(updated));

    setSubmittedComplaint(newComplaint);

    // Reset Form
    setFormData({
      name: '',
      phone: '',
      location: '',
      category: 'Potholes & Road Repair',
      description: '',
      priority: 'Medium'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-tricolor-gradient min-h-screen py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:py-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Page Title */}
        <div className="text-center space-y-2 print:text-left print:mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('complaintTitle')}
          </h1>
          <p className="text-sm text-slate-500 font-medium max-w-2xl mx-auto print:hidden">
            {t('complaintSubtitle')}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submittedComplaint ? (
            
            // Submission Form Grid
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-govBlue-500" />
                      <span>{t('labelName')} *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rajesh Kumar"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-govBlue-500 focus:border-transparent text-sm bg-slate-50 text-slate-800"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-govBlue-500" />
                      <span>{t('labelPhone')} *</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 9876543210"
                      pattern="[0-9+ ]{10,14}"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-govBlue-500 focus:border-transparent text-sm bg-slate-50 text-slate-800"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-govBlue-500" />
                      <span>{t('labelCategoryCivic')} *</span>
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

                  {/* Priority */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-govBlue-500" />
                      <span>{t('labelPriority')} *</span>
                    </label>
                    <div className="flex gap-4">
                      {['Low', 'Medium', 'High'].map(prio => (
                        <label 
                          key={prio} 
                          className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border cursor-pointer select-none text-xs font-bold transition-all ${
                            formData.priority === prio
                              ? prio === 'High'
                                ? 'bg-red-50 border-red-500 text-red-700 shadow-sm'
                                : prio === 'Medium'
                                ? 'bg-saffron-50 border-saffron-500 text-saffron-700 shadow-sm'
                                : 'bg-govBlue-50 border-govBlue-500 text-govBlue-700 shadow-sm'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
                          }`}
                        >
                          <input
                            type="radio"
                            name="priority"
                            value={prio}
                            checked={formData.priority === prio}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <span>{prio}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-govBlue-500" />
                      <span>{t('labelLocation')} *</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Block A, Sector 4, Rohini, New Delhi - 110085"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-govBlue-500 focus:border-transparent text-sm bg-slate-50 text-slate-800"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-govBlue-500" />
                      <span>{t('labelDescription')} *</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the issue in detail, including references, duration of the issue, and specific impact on the locality..."
                      rows="4"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-govBlue-500 focus:border-transparent text-sm bg-slate-50 text-slate-800 resize-none"
                    ></textarea>
                  </div>

                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-govBlue-600 hover:bg-govBlue-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:shadow-govBlue-500/20 transition-all flex items-center justify-center gap-2 group"
                  >
                    <FileText className="w-5 h-5" />
                    <span>{t('btnSubmitComplaint')}</span>
                  </button>
                </div>
              </form>
            </motion.div>
            
          ) : (
            
            // Receipt Screen
            <motion.div
              key="receipt"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Seal Background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-5 pointer-events-none flex items-center justify-center">
                <svg className="w-full h-full text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>

              <div className="space-y-8 relative z-10">
                {/* Header Badge */}
                <div className="text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-500 shadow-sm">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{t('complaintSuccess')}</h2>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Grievance Registration Record</p>
                  </div>
                </div>

                {/* Tracking Data */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase block mb-0.5">{t('complaintID')}</span>
                    <span className="font-extrabold text-govBlue-600 text-lg tracking-wider font-mono">{submittedComplaint.id}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase block mb-0.5">{t('complaintDate')}</span>
                    <span className="font-bold text-slate-700">{submittedComplaint.date}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase block mb-0.5">{t('complaintStatus')}</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-saffron-50 text-saffron-700 border border-saffron-200/50 rounded-full text-xs font-extrabold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{t('statusPending')}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase block mb-0.5">Priority Classification</span>
                    <span className={`inline-block text-xs font-bold ${
                      submittedComplaint.priority === 'High' ? 'text-red-600' : submittedComplaint.priority === 'Medium' ? 'text-saffron-600' : 'text-govBlue-600'
                    }`}>
                      {submittedComplaint.priority} Priority
                    </span>
                  </div>
                </div>

                {/* Grievance Body Details */}
                <div className="space-y-4 text-sm text-slate-600 border-t border-b border-dashed border-slate-200 py-6">
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-bold text-slate-800">Complainant:</span>
                    <span className="col-span-2 font-medium">{submittedComplaint.name} ({submittedComplaint.phone})</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-bold text-slate-800">Issue Category:</span>
                    <span className="col-span-2 font-medium">{submittedComplaint.category}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-bold text-slate-800">Location:</span>
                    <span className="col-span-2 font-medium">{submittedComplaint.location}</span>
                  </div>
                  <div className="space-y-1.5 pt-2">
                    <span className="font-bold text-slate-800 block">Description of Issue:</span>
                    <p className="p-4 bg-slate-50 border border-slate-100 rounded-xl leading-relaxed text-xs italic font-medium whitespace-pre-wrap">
                      "{submittedComplaint.description}"
                    </p>
                  </div>
                </div>

                {/* Receipt Footprint */}
                <div className="text-center text-[10px] text-slate-400 font-medium">
                  Please retain this receipt for tracking. You can check the live progress status under your Citizen Dashboard.
                </div>

                {/* Print/Exit Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2 print:hidden">
                  <button
                    onClick={handlePrint}
                    className="flex-1 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-4 h-4 text-govBlue-500" />
                    <span>Print Receipt</span>
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="flex-1 py-3.5 bg-govBlue-600 hover:bg-govBlue-700 text-white rounded-xl font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Go to Dashboard</span>
                  </button>
                </div>

                {/* Register another clicker */}
                <div className="text-center print:hidden">
                  <button 
                    onClick={() => setSubmittedComplaint(null)} 
                    className="text-xs font-bold text-govBlue-500 hover:text-govBlue-700 hover:underline"
                  >
                    Register Another Grievance
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
