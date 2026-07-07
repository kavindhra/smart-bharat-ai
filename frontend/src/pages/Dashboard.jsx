import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  MapPin,
  Calendar,
  X,
  ToggleLeft
} from 'lucide-react';

export default function Dashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Load data on mount
  useEffect(() => {
    try {
      const savedComplaints = localStorage.getItem('smart_bharat_complaints');
      if (savedComplaints) {
        const parsed = JSON.parse(savedComplaints);
        if (Array.isArray(parsed)) {
          setComplaints(parsed);
        }
      }
    } catch (e) {
      console.error('Error parsing complaints:', e);
      localStorage.removeItem('smart_bharat_complaints');
    }

    try {
      const savedChats = localStorage.getItem('smart_bharat_chats');
      if (savedChats) {
        const parsed = JSON.parse(savedChats);
        if (Array.isArray(parsed)) {
          setChats(parsed);
        }
      }
    } catch (e) {
      console.error('Error parsing chats:', e);
      localStorage.removeItem('smart_bharat_chats');
    }
  }, []);

  // Grievance metrics calculations
  const totalCount = complaints.length;
  const pendingCount = complaints.filter(c => c.status === 'Pending Verification').length;
  const progressCount = complaints.filter(c => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;
  const chatCount = chats.length;

  // Percentage for progress bar
  const resolvedPercent = totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 0;
  const pendingPercent = totalCount > 0 ? Math.round(((pendingCount + progressCount) / totalCount) * 100) : 0;

  // Simulate updating status (Dev-tool/interactive helper)
  const toggleComplaintStatus = (id) => {
    const updated = complaints.map(c => {
      if (c.id === id) {
        let nextStatus = 'In Progress';
        if (c.status === 'Pending Verification') nextStatus = 'In Progress';
        else if (c.status === 'In Progress') nextStatus = 'Resolved';
        else nextStatus = 'Pending Verification';
        
        return { ...c, status: nextStatus };
      }
      return c;
    });

    setComplaints(updated);
    localStorage.setItem('smart_bharat_complaints', JSON.stringify(updated));
    
    // Update selected modal view if active
    if (selectedComplaint && selectedComplaint.id === id) {
      const match = updated.find(c => c.id === id);
      setSelectedComplaint(match);
    }
  };

  // Delete complaint helper
  const deleteComplaint = (id, e) => {
    e.stopPropagation();
    const updated = complaints.filter(c => c.id !== id);
    setComplaints(updated);
    localStorage.setItem('smart_bharat_complaints', JSON.stringify(updated));
    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint(null);
    }
  };

  return (
    <div className="bg-tricolor-gradient min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <LayoutDashboard className="w-8 h-8 text-govBlue-600" />
              <span>{t('dashboardTitle')}</span>
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              {t('dashboardSubtitle')}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/complaints')}
              className="px-5 py-2.5 rounded-full bg-govBlue-600 hover:bg-govBlue-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              File New Grievance
            </button>
            <button
              onClick={() => navigate('/assistant')}
              className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors"
            >
              Consult AI Companion
            </button>
          </div>
        </div>

        {/* Stats Tickers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Total complaints */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase block">{t('totalComplaints')}</span>
              <span className="text-3xl font-extrabold text-slate-800">{totalCount}</span>
            </div>
            <div className="p-3.5 bg-govBlue-50 text-govBlue-600 rounded-2xl">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Pending */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase block">{t('pendingIssues')}</span>
              <span className="text-3xl font-extrabold text-saffron-600">{pendingCount + progressCount}</span>
            </div>
            <div className="p-3.5 bg-saffron-50 text-saffron-600 rounded-2xl">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          {/* Card 3: Resolved */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase block">{t('resolvedIssues')}</span>
              <span className="text-3xl font-extrabold text-emerald-600">{resolvedCount}</span>
            </div>
            <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: AI Chats count */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase block">AI Chats Saved</span>
              <span className="text-3xl font-extrabold text-slate-800">{chatCount}</span>
            </div>
            <div className="p-3.5 bg-slate-100 text-slate-700 rounded-2xl">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Analytics Breakdown & Progress Bar */}
        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-base">Resolution Ratio</h3>
              <p className="text-xs text-slate-400 font-medium">Breakdown of registered civic complaints</p>
            </div>
            <span className="text-sm font-extrabold text-emerald-600">{resolvedPercent}% Resolved</span>
          </div>

          <div className="space-y-2">
            {/* Visual Bar */}
            <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: `${resolvedPercent}%` }} title="Resolved"></div>
              <div className="bg-saffron-400 h-full" style={{ width: `${totalCount > 0 ? Math.round((progressCount / totalCount) * 100) : 0}%` }} title="In Progress"></div>
              <div className="bg-govBlue-300 h-full" style={{ width: `${totalCount > 0 ? Math.round((pendingCount / totalCount) * 100) : 0}%` }} title="Pending Verification"></div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 pt-1">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Resolved ({resolvedCount})</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-saffron-400"></span> In Progress ({progressCount})</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-govBlue-300"></span> Pending Verification ({pendingCount})</span>
            </div>
          </div>
        </div>

        {/* Double Column: Chats and Complaints */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Complaints registry */}
          <div className="lg:col-span-8 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-base">{t('recentComplaints')}</h3>
                <p className="text-xs text-slate-400 font-medium">Click on any grievance card to view details or simulate status update.</p>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">{complaints.length} Records</span>
            </div>

            {complaints.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-2xl text-sm text-slate-400 font-medium space-y-3">
                <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                <p>{t('noComplaintsYet')}</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
                {complaints.map((comp) => (
                  <div
                    key={comp.id}
                    onClick={() => setSelectedComplaint(comp)}
                    className="p-4 border border-slate-150 hover:border-govBlue-400 hover:bg-govBlue-50/10 rounded-2xl cursor-pointer transition-all duration-200 flex justify-between items-center group relative overflow-hidden"
                  >
                    <div className="space-y-2 max-w-[70%]">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-extrabold text-govBlue-600 font-mono tracking-wider">{comp.id}</span>
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                          comp.status === 'Resolved' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                            : comp.status === 'In Progress' 
                            ? 'bg-saffron-50 text-saffron-700 border border-saffron-100' 
                            : 'bg-govBlue-50 text-govBlue-700 border border-govBlue-100'
                        }`}>
                          {comp.status === 'Resolved' ? t('statusResolved') : comp.status === 'In Progress' ? t('statusProgress') : t('statusPending')}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 leading-normal">{comp.category}</h4>
                      <p className="text-xs text-slate-400 font-medium flex items-center gap-1"><MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" /> {comp.location}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleComplaintStatus(comp.id);
                        }}
                        className="text-[10px] font-extrabold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 rounded-lg transition-colors flex items-center gap-1 shrink-0 print:hidden"
                        title="Simulate workflow next stage"
                      >
                        <ToggleLeft className="w-3.5 h-3.5 text-govBlue-600" />
                        <span>Cycle Status</span>
                      </button>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-govBlue-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: AI Chats history */}
          <div className="lg:col-span-4 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-base">{t('recentChats')}</h3>
                <p className="text-xs text-slate-400 font-medium">Click to resume conversation thread</p>
              </div>
            </div>

            {chats.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-2xl text-sm text-slate-400 font-medium space-y-3">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto" />
                <p>{t('noChatsYet')}</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                {chats.map((ch) => (
                  <div
                    key={ch.id}
                    onClick={() => navigate('/assistant')}
                    className="p-3.5 border border-slate-100 hover:border-govBlue-400 hover:bg-govBlue-50/15 rounded-xl cursor-pointer transition-all flex items-center gap-3"
                  >
                    <div className="p-2.5 bg-slate-100 text-slate-600 rounded-xl group-hover:bg-govBlue-50 group-hover:text-govBlue-600 transition-colors">
                      <MessageSquare className="w-4 h-4 text-govBlue-600" />
                    </div>
                    <div className="overflow-hidden flex-1">
                      <span className="text-xs font-bold text-slate-700 block truncate leading-normal">{ch.title}</span>
                      <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5"><Calendar className="w-3 h-3" /> {new Date(parseInt(ch.id)).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Complaint Detailed Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 relative overflow-hidden animate-zoomIn">
              <button 
                onClick={() => setSelectedComplaint(null)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-extrabold text-govBlue-600 font-mono tracking-wider">{selectedComplaint.id}</span>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    selectedComplaint.status === 'Resolved' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                      : selectedComplaint.status === 'In Progress' 
                      ? 'bg-saffron-50 text-saffron-700 border border-saffron-100' 
                      : 'bg-govBlue-50 text-govBlue-700 border border-govBlue-100'
                  }`}>
                    {selectedComplaint.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 leading-snug">{selectedComplaint.category}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-500 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                  <div>Complainant: <span className="text-slate-850 font-bold">{selectedComplaint.name}</span></div>
                  <div>Phone No: <span className="text-slate-850 font-bold">{selectedComplaint.phone}</span></div>
                  <div>Filed Date: <span className="text-slate-850 font-bold">{selectedComplaint.date}</span></div>
                  <div>Priority: <span className="text-slate-850 font-bold">{selectedComplaint.priority}</span></div>
                  <div className="sm:col-span-2">Location: <span className="text-slate-850 font-bold">{selectedComplaint.location}</span></div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-800 block">Description of Grievance</span>
                  <p className="p-4 bg-slate-50 border border-slate-100 rounded-xl leading-relaxed text-sm italic font-medium whitespace-pre-wrap">
                    "{selectedComplaint.description}"
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => toggleComplaintStatus(selectedComplaint.id)}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <ToggleLeft className="w-4 h-4 text-govBlue-400" />
                  <span>Cycle Grievance Stage</span>
                </button>
                <button
                  onClick={(e) => deleteComplaint(selectedComplaint.id, e)}
                  className="py-3 px-4 bg-red-50 hover:bg-red-100 text-red-700 border border-red-100 rounded-xl font-bold text-xs transition-colors"
                >
                  Remove Record
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
