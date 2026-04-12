import React from 'react';
import { useFirebaseData } from '../../hooks/useFirebaseData';

const CrowdMap: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState<string>('ALL');

  const { data: sensors } = useFirebaseData('stadium_vitals/crowd/sensors', [
    { id: "s1", x: 400, y: 300, icon: "fastfood", label: "GRID IRON GRILL", sublabel: "Busy • 12m wait", color: "bg-secondary" },
    { id: "s2", x: 600, y: 220, icon: "wc", label: "RESTROOM C", sublabel: "Clear • No wait", color: "bg-primary" },
    { id: "s3", x: 250, y: 180, icon: "local_bar", label: "NEON LOUNGE", sublabel: "High Demand", color: "bg-tertiary" },
    { id: "s4", x: 500, y: 420, icon: "medical_services", label: "MED-STATION B", sublabel: "Staffed", color: "bg-error" }
  ]);

  const { data: hotspots } = useFirebaseData('stadium_vitals/crowd/hotspots', [
    { id: "h1", x: "25%", y: "33%", size: "w-32 h-32", color: "bg-error/40" },
    { id: "h2", x: "75%", y: "75%", size: "w-48 h-48", color: "bg-secondary/30" }
  ]);

  const filteredSensors = activeFilter === 'ALL' 
    ? sensors 
    : sensors.filter((s: any) => s.icon === activeFilter);

  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Sidebar Controls */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        {/* Search & Filters */}
        <section className="bg-surface-container-low p-6 rounded-xl space-y-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              className="w-full bg-surface-container-highest border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary placeholder:text-outline" 
              placeholder="Search amenities..." 
              type="text"
            />
          </div>
          <div className="space-y-4">
            <h3 className="font-headline text-xs tracking-widest uppercase text-outline">Quick Filters</h3>
            <div className="flex flex-wrap gap-2">
              <FilterBtn icon="all_inclusive" label="ALL" active={activeFilter === 'ALL'} onClick={() => setActiveFilter('ALL')} />
              <FilterBtn icon="wc" label="RESTROOMS" active={activeFilter === 'wc'} onClick={() => setActiveFilter('wc')} />
              <FilterBtn icon="fastfood" label="FOOD" active={activeFilter === 'fastfood'} onClick={() => setActiveFilter('fastfood')} />
              <FilterBtn icon="local_bar" label="DRINKS" active={activeFilter === 'local_bar'} onClick={() => setActiveFilter('local_bar')} />
              <FilterBtn icon="medical_services" label="FIRST AID" active={activeFilter === 'medical_services'} onClick={() => setActiveFilter('medical_services')} />
            </div>
          </div>
          <div className="pt-4 border-t border-outline-variant/10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold tracking-wider text-outline uppercase">Live Status</span>
              <span className="flex items-center gap-1.5 text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> LIVE
              </span>
            </div>
            <div className="space-y-3">
              <StatusRow label="North Concourse" status="HEAVY" color="text-error" progress={85} />
              <StatusRow label="Gate 4 Plaza" status="LIGHT" color="text-primary" progress={20} />
            </div>
          </div>
        </section>

        {/* Navigation Card */}
        <section className="bg-gradient-to-br from-primary/10 to-transparent p-6 rounded-xl border border-primary/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>near_me</span>
          </div>
          <h3 className="font-headline text-lg font-bold mb-1 text-primary lowercase">FASTEST ROUTE</h3>
          <p className="text-xs text-on-surface-variant mb-6 uppercase tracking-wider">To: Section 302, Row G</p>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary-container text-on-primary-container w-10 h-10 rounded-xl flex items-center justify-center font-black">4m</div>
            <div>
              <p className="text-sm font-bold">Via Level 2 Express</p>
              <p className="text-[10px] text-on-surface-variant">Avoids Concession Cluster B</p>
            </div>
          </div>
          <button 
            onClick={() => alert("Navigation protocol initiated. Following Section 302 Row G optimized route.")}
            className="w-full py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl font-headline font-bold text-sm tracking-widest transition-transform active:scale-95 uppercase"
          >
            START NAVIGATION
          </button>
        </section>
      </div>

      {/* Central Interactive Map Canvas */}
      <div className="lg:col-span-9 relative bg-surface-container-low rounded-[2rem] overflow-hidden shadow-2xl min-h-[600px] border border-white/5">
        <div className="absolute inset-0 flex items-center justify-center bg-[#0d141b]">
          <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1200px' }}>
            <div className="relative w-[800px] h-[500px]" style={{ transform: 'rotateX(25deg) rotateY(-15deg) rotateZ(5deg)' }}>
              {/* Main Stadium Base */}
              <div className="absolute inset-0 bg-surface-container-high rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden">
                <img 
                  alt="stadium floor plan" 
                  className="w-full h-full object-cover opacity-20 scale-150" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg3g7cMz-vAO2OUrISH3gBzOua0o9aeojHQpWE6HG5rwA1oxHXnEHQO0sReqVrtrDmhp5J6yYf3Gnmr5hhg5dJeyxivfSe6ItZdJH3bFGkBsKr4gvLlUcbB5dIHUO030AjIEUQHfGEVCpIDz24sLNb7wG_MC35avsK0cHxHdDAMjyEjdYGBy5Oo9anTWU4noiwSXD_nat-LoEXYKjHV9Kox6svBv0vNTATwB2jlNHrB87P2TOB17uc9Wa6X3qjDAX-MO0JvZNt6w" 
                />
                
                {/* Heat Map Overlays */}
                {hotspots.map((h: any) => (
                  <div key={h.id} className={`absolute animate-pulse rounded-full blur-[40px] ${h.color} ${h.size}`} style={{ top: h.y, left: h.x, animationDelay: h.id === 'h2' ? '1.5s' : '0s' }}></div>
                ))}
              </div>

              {/* Path Overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 500">
                <path d="M 100 400 Q 250 380 400 300 T 700 150" fill="none" opacity="0.8" stroke="#8ff5ff" strokeDasharray="12 12" strokeLinecap="round" strokeWidth="6">
                  <animate attributeName="stroke-dashoffset" dur="5s" from="100" repeatCount="indefinite" to="0"></animate>
                </path>
              </svg>

              {/* User Location */}
              <MapMarker x={100} y={400} icon="person" label="YOU" color="bg-primary" />
              
              {/* Dynamic Map Markers from Firebase */}
              {filteredSensors.map((s: any) => (
                <MapMarker key={s.id} x={s.x} y={s.y} icon={s.icon} label={s.label} sublabel={s.sublabel} color={s.color} isInteractive />
              ))}

              {/* Destination Marker */}
              <div className="absolute left-[700px] top-[150px] -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,238,252,0.4)] animate-bounce">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay Controls */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          <MapBtn icon="add" />
          <MapBtn icon="remove" />
          <MapBtn icon="layers" className="mt-4" />
        </div>

        {/* Live Legend Overlay */}
        <div className="absolute bottom-6 left-6 p-4 bg-surface-container/60 backdrop-blur-xl rounded-2xl border border-white/5 flex flex-col gap-3">
          <h4 className="text-[10px] font-headline font-black tracking-widest text-outline uppercase">Density Legend</h4>
          <div className="flex items-center gap-4">
            <LegendItem color="bg-primary" label="CLEAR" />
            <LegendItem color="bg-secondary" label="MODERATE" />
            <LegendItem color="bg-error" label="CONGESTED" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterBtn: React.FC<{ icon: string; label: string; active?: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-90 uppercase ${
      active ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high border border-white/5'
    }`}
  >
    <span className="material-symbols-outlined text-sm">{icon}</span> {label}
  </button>
);

const StatusRow: React.FC<{ label: string; status: string; color: string; progress: number }> = ({ label, status, color, progress }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <span className="text-sm text-on-surface-variant font-medium">{label}</span>
      <span className={`text-sm font-black uppercase ${color}`}>{status}</span>
    </div>
    <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
      <div className={`h-full ${color.replace('text-', 'bg-')} transition-all duration-1000`} style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

const MapMarker: React.FC<{ x: number; y: number; icon: string; label?: string; sublabel?: string; color: string; isInteractive?: boolean }> = ({ x, y, icon, label, sublabel, color, isInteractive }) => (
  <div className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer" style={{ left: x, top: y }}>
    <div className={`rounded-xl flex items-center justify-center shadow-xl transition-all hover:scale-110 ${
      label ? 'w-10 h-10 bg-surface-container-highest border border-white/10' : 'w-8 h-8 bg-surface-container-highest border border-white/10 rounded-full'
    }`}>
      <span className={`material-symbols-outlined ${color.replace('bg-', 'text-')} ${label ? '' : 'text-lg'}`}>{icon}</span>
    </div>
    {label && (
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-surface-container-high p-3 rounded-xl border border-white/5 shadow-2xl min-w-[160px] opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-xs font-bold text-on-surface uppercase">{label}</p>
        {sublabel && (
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[10px] text-error font-black uppercase">Busy</span>
            <span className="text-[10px] text-on-surface-variant">• {sublabel.split('•')[1]}</span>
          </div>
        )}
      </div>
    )}
  </div>
);

const MapBtn: React.FC<{ icon: string; className?: string }> = ({ icon, className }) => (
  <button className={`w-12 h-12 bg-surface-container-highest/80 backdrop-blur-md rounded-xl flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-all active:scale-90 ${className}`}>
    <span className="material-symbols-outlined">{icon}</span>
  </button>
);

const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-3 h-3 rounded-full ${color} shadow-[0_0_8px_rgba(143,245,255,0.4)]`}></div>
    <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
  </div>
);

export default CrowdMap;
