import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AIAssistant from './pages/AIAssistant';
import SchemeFinder from './pages/SchemeFinder';
import ComplaintPortal from './pages/ComplaintPortal';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assistant" element={<AIAssistant />} />
          <Route path="/schemes" element={<SchemeFinder />} />
          <Route path="/complaints" element={<ComplaintPortal />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
