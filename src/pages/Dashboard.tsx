import React from 'react';
import { Link } from 'react-router-dom';
import { useFirebaseData } from '../hooks/useFirebaseData';

const Dashboard: React.FC = () => {
  // Subscribe to tactical alerts
  const { data: alerts } = useFirebaseData('stadium_vitals/alerts/current', {
    title: "CROWD ALERT: GATE 4A CONGESTION",
    description: "High traffic detected at North Entrance. We recommend using Gate 2B for faster entry. Est. wait: 14 mins.",
    severity: "secondary"
  });

  // Subscribe to match schedule
  const { data: schedule } = useFirebaseData('stadium_vitals/schedule', [
    { id: 1, date: "14", month: "OCT", fixture: "VELOCITY VS DRAGONS", status: "PLAYOFF QUARTER-FINALS", time: "19:30", active: true },
    { id: 2, date: "21", month: "OCT", fixture: "STORM VS TITANS", status: "REGULAR SEASON", time: "20:00", active: false },
    { id: 3, date: "28", month: "OCT", fixture: "VELOCITY VS RAIDERS", status: "SEASON FINALE", time: "18:00", active: true }
  ]);

  // Subscribe to kick-off countdown
  const { data: countdown } = useFirebaseData('stadium_vitals/countdown', {
    minutesRem: 42,
    secondsRem: 18
  });

  return (
    <div className="px-6 max-w-7xl mx-auto space-y-8">
      {/* Hero Section: Crowd Alert & Countdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Real-time Crowd Alert */}
        <div className="lg:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container-low p-1">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent opacity-50"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-6">
            <div className={`bg-${alerts.severity}/10 p-4 rounded-full`}>
              <span className={`material-symbols-outlined text-${alerts.severity} text-4xl animate-pulse`} style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className={`font-headline font-bold text-xl text-${alerts.severity} tracking-tight uppercase`}>{alerts.title}</h2>
              <p className="text-on-surface-variant mt-1">{alerts.description}</p>
            </div>
            <Link to="/portfolio/live-map" className={`px-6 py-3 rounded-xl border border-${alerts.severity}/30 text-${alerts.severity} font-headline font-bold text-sm tracking-widest hover:bg-${alerts.severity}/10 transition-colors uppercase`}>
              VIEW MAP
            </Link>
          </div>
        </div>

        {/* Kick-off Countdown */}
        <div className="lg:col-span-4 bg-surface-container-high rounded-xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden border-l-4 border-primary">
          <span className="text-xs font-headline font-black text-primary tracking-[0.3em] uppercase mb-2">KICK-OFF IN</span>
          <div className="flex gap-4 items-baseline">
            <span className="font-headline text-5xl font-black text-on-background tracking-tighter">{countdown.minutesRem}</span>
            <span className="text-primary font-bold">MIN</span>
            <span className="font-headline text-5xl font-black text-on-background tracking-tighter">{countdown.secondsRem}</span>
            <span className="text-primary font-bold">SEC</span>
          </div>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Digital Ticket Card */}
        <div className="lg:col-span-1 glass-card rounded-xl p-8 flex flex-col items-center justify-between shadow-2xl min-h-[500px] border border-white/5">
          <div className="w-full space-y-1 text-center">
            <p className="text-xs font-headline font-bold text-primary tracking-[0.4em] uppercase">MATCHDAY TICKET</p>
            <h3 className="text-2xl font-black font-headline tracking-tighter uppercase">VELOCITY VS TITANS</h3>
          </div>
          
          {/* Ticket QR Visual */}
          <div className="relative w-full aspect-square max-w-[240px] bg-white p-4 rounded-xl shadow-[0_0_40px_rgba(143,245,255,0.2)] group cursor-pointer">
            <img 
              alt="ticket qr code" 
              className="w-full h-full object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWg7eggtZz4R7Kb_63mNiC9qNItlxlP7Smc20myuwIVQr85D2lG6iVQSM_GfkkvXgyRRvgf9NiLBxqkKb7BAkalimy9nnleOtPNAVzpngzlOqdiwl7Gt4Gj7ysOX8Wg2SSCc6LpZzj45oczFvtT6eSUN1KVSB_1yBAjRxr8Xe-m7ohYgrnWzTREOa8L0HRMHqLWFhKxfgXV7qmYCcGKeQj76wMGJ9bCtOg4bMWFEkI-2XcNKQfKrI6-oa3amduRR9AJwpdkTx3EQ" 
            />
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
              <span onClick={() => alert("ENLARGING SECURE TICKET... 100% Verified.")} className="text-primary font-headline font-bold text-sm uppercase tracking-widest">TAP TO ENLARGE</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div className="text-center">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">GATE</p>
              <p className="text-lg font-headline font-black text-on-background">4A</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">ROW</p>
              <p className="text-lg font-headline font-black text-on-background">12</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">SEAT</p>
              <p className="text-lg font-headline font-black text-on-background">108</p>
            </div>
          </div>
        </div>

        {/* Match Schedule Card */}
        <div className="lg:col-span-2 bg-surface-container rounded-xl overflow-hidden flex flex-col">
          <div className="p-6 flex justify-between items-end">
            <div>
              <h3 className="font-headline font-black text-3xl tracking-tighter uppercase">UPCOMING AT KINETIC</h3>
              <p className="text-slate-400 text-sm mt-1">Don't miss the playoff series action</p>
            </div>
            <button onClick={() => alert("CALENDAR: Loading full season schedule...")} className="text-primary font-bold text-xs tracking-widest uppercase hover:underline">SEE FULL CALENDAR</button>
          </div>
          
          <div className="flex-1 flex flex-col p-2 gap-2">
            {schedule.map((match: any) => (
              <MatchRow 
                key={match.id}
                date={match.date} 
                month={match.month} 
                fixture={match.fixture} 
                status={match.status} 
                time={match.time} 
                active={match.active} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Section: Quick Actions & Stadium Visual */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Link to="/portfolio/concessions" className="md:col-span-1 glass-card rounded-xl p-6 flex flex-col justify-between border border-white/5 hover:bg-surface-container-highest transition-colors group">
          <span className="material-symbols-outlined text-tertiary text-3xl group-hover:scale-110 transition-transform">fastfood</span>
          <div className="mt-8">
            <h4 className="font-headline font-bold text-lg leading-tight uppercase">PRE-ORDER<br/>REFRESHMENTS</h4>
            <p className="text-xs text-slate-400 mt-2">Skip the line. Pick up at Section 102.</p>
          </div>
        </Link>
        <button 
          onClick={() => alert("SHUTTLE TRACKER: Next shuttle arriving at Gate 4A in 8 minutes.")}
          className="md:col-span-1 glass-card rounded-xl p-6 flex flex-col justify-between border border-white/5 hover:bg-surface-container-highest transition-colors text-left"
        >
          <span className="material-symbols-outlined text-primary text-3xl">directions_bus</span>
          <div className="mt-8">
            <h4 className="font-headline font-bold text-lg leading-tight uppercase">SHUTTLE<br/>TRACKER</h4>
            <p className="text-xs text-slate-400 mt-2">Next shuttle arriving in 8 mins.</p>
          </div>
        </button>
        <div className="md:col-span-2 relative rounded-xl overflow-hidden h-48 group">
          <img 
            alt="stadium view" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlSpi2rhfWo8nx8JeewiTO_mRUBJ2OxU0Oyvvs2Wf1IdwuKodeuSnOY7b3OWg4WHOALD7SSrL9ar9jjZ-uIJJcTxDeFxQaj-Hjd74ry0LNR1WY3rFLoCEYGJmUdNARvH0Gb4kbprBwF0qo2YO57PYhs6RxP7-tEEZayTCe3R8ZPcN9JRCuP-MbPQ0WDPHhdWOSd1Qtf5ZI2yY7Jy68uO1w86zPg4Bs4m5o38AWTNQoNauAwmgVE0rJtcwrYd_BeWLd1B161XVtLA" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
          <div className="absolute bottom-4 left-6">
            <p className="text-[10px] font-headline font-black text-primary tracking-[0.3em] uppercase">NOW LIVE</p>
            <h4 className="text-xl font-headline font-bold text-white uppercase italic tracking-tighter">ATMOSPHERE: ELECTRIC</h4>
          </div>
        </div>
      </div>

      {/* FAB (Contextual for Dashboard) */}
      <button 
        onClick={() => alert("Digital Ticket: SECTION 102, ROW 12, SEAT 108. Ready for scanning.")}
        className="fixed bottom-24 right-6 w-16 h-16 rounded-full kinetic-gradient flex items-center justify-center shadow-[0_0_48px_rgba(143,245,255,0.2)] hover:scale-110 active:scale-95 transition-transform z-40 md:bottom-10"
      >
        <span className="material-symbols-outlined text-on-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>confirmation_number</span>
      </button>
    </div>
  );
};

const MatchRow: React.FC<{ date: string; month: string; fixture: string; status: string; time: string; active?: boolean }> = ({ date, month, fixture, status, time, active }) => (
  <button 
    onClick={() => alert(`MATCH DETAILS: ${fixture} - Secure entry protocol active.`)}
    className="group w-full flex items-center justify-between p-6 rounded-xl hover:bg-surface-container-highest transition-all text-left"
  >
    <div className="flex items-center gap-6">
      <div className="text-center w-12">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{month}</p>
        <p className="text-xl font-black font-headline text-on-background">{date}</p>
      </div>
      <div className="h-10 w-[1px] bg-white/10"></div>
      <div>
        <h4 className="font-headline font-bold text-on-background tracking-tight uppercase">{fixture}</h4>
        <p className={`text-xs font-medium tracking-wide uppercase ${active ? 'text-primary' : 'text-slate-400'}`}>{status}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-slate-500 text-sm font-medium">{time}</span>
      <span className="material-symbols-outlined text-slate-700 group-hover:text-primary transition-colors">arrow_forward_ios</span>
    </div>
  </button>
);

export default Dashboard;
