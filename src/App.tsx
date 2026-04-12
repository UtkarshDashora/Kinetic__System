import React, { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';

const App: React.FC = () => {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  const handleSeed = async () => {
    setSyncStatus('syncing');
    try {
      const response = await fetch('/api/seed', { method: 'POST' });
      if (!response.ok) throw new Error('Backend sync failed');
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (e) {
      console.error(e);
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body selection:bg-primary selection:text-on-primary">
      {/* TopAppBar - Fixed Across All Pages */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-20 bg-[#090f15]/50 backdrop-blur-xl shadow-[0_0_20px_rgba(143,245,255,0.08)]">
        <div className="flex items-center gap-4">
          <Link to="/" className="w-10 h-10 rounded-full border-2 border-primary/30 overflow-hidden">
            <img 
              alt="user profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAkCxNmLamq3a4ZmEbBPlhHpV4Oo6J_8BH8rSZpLf9MMjL0Zjaal8i-XkePH2LrDiEX0enP94jGv_3Wll9wMr0IzHdeThp3eX56-_ljVh-PT2eMQ2vvTvR78IsO9LlSuBlkq-DQmXi4W45kqnn15IGRP0NGjrfprhC1CCdeThU7WznjGnD1puubttFmeQxIrcrPRixY4yw7ev29JvF_Bu69QN986E0INqE62MdVgJXSoiciRHsjJASswEFMVDFpWM4C_Q6aAeNeg" 
            />
          </Link>
          <h1 className="text-2xl font-black italic tracking-tighter text-[#8ff5ff] font-headline uppercase">KINETIC STADIUM</h1>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 font-headline text-sm font-bold tracking-widest">
            <NavTab to="/" label="DASHBOARD" />
            <NavTab to="/portfolio/live-map" label="CROWD MAP" />
            <NavTab to="/portfolio/concessions" label="CONCESSIONS" />
            <NavTab to="/portfolio/friend-finder" label="FRIENDS" />
          </nav>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleSeed}
              disabled={syncStatus === 'syncing'}
              className={`text-[10px] font-bold transition-all uppercase tracking-widest border px-3 py-1.5 rounded-lg active:scale-95 disabled:opacity-50 ${
                syncStatus === 'success' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' :
                syncStatus === 'error' ? 'bg-error/20 border-error/50 text-error' :
                'text-[#8ff5ff]/40 hover:text-[#8ff5ff] border-[#8ff5ff]/20'
              }`}
            >
              {syncStatus === 'syncing' ? 'SYNCING...' : 
               syncStatus === 'success' ? 'SYNCED!' :
               syncStatus === 'error' ? 'SYNC FAILED!' : 'SYNC DB'}
            </button>
            <button 
              onClick={() => alert("COMM CENTER: 0 New notifications. Shielding active.")}
              className="material-symbols-outlined text-slate-400 hover:text-[#00eefc] transition-colors active:scale-95 duration-200"
            >
              notifications
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 pb-32">
        <Outlet />
      </main>

      {/* BottomNavBar - Fixed for Mobile */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#090f15]/80 backdrop-blur-2xl border-t border-cyan-500/10 shadow-[0_-4px_24px_rgba(0,0,0,0.4)] md:hidden">
        <MobileTab to="/" icon="dashboard" label="DASHBOARD" />
        <MobileTab to="/portfolio/live-map" icon="map" label="CROWD MAP" />
        <MobileTab to="/portfolio/concessions" icon="fastfood" label="CONCESSIONS" />
        <MobileTab to="/portfolio/friend-finder" icon="group" label="FRIENDS" />
      </nav>
    </div>
  );
};

const NavTab: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => 
      `transition-colors uppercase ${isActive ? 'text-[#8ff5ff]' : 'text-slate-400 hover:text-[#00eefc]'}`
    }
  >
    {label}
  </NavLink>
);

const MobileTab: React.FC<{ to: string; icon: string; label: string }> = ({ to, icon, label }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => 
      `flex flex-col items-center justify-center py-2 transition-all active:scale-90 ${
        isActive 
          ? 'bg-gradient-to-br from-[#8ff5ff] to-[#00eefc] text-[#090f15] rounded-[1.5rem] px-5 scale-105 shadow-[0_4px_15px_rgba(143,245,255,0.3)]' 
          : 'text-slate-500'
      }`
    }
  >
    <span className="material-symbols-outlined">{icon}</span>
    <span className="font-headline text-[10px] font-bold tracking-widest mt-1 uppercase">{label}</span>
  </NavLink>
);

export default App;
