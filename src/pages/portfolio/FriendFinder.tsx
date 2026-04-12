import React from 'react';
import { useFirebaseData } from '../../hooks/useFirebaseData';

const FriendFinder: React.FC = () => {
  const { data: squad } = useFirebaseData('stadium_vitals/squad', [
    { id: "marcus", name: "MARCUS_FLYNN", location: "SECTION 102 • ROW 12", x: "35%", y: "65%", color: "secondary", active: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAM2paBR8rsi9OTiWX-D_k6MDdxNUq6uKA2REonfK8LJbnsEKBLNw-jnum5tCHrveU1JIhUtzg4fXynjrUSID3Woy6OY0Q4ehcbyhb45fzbOuEOAVqiTeXYbjCcsRkzMefpioLtwjfOLsda5bhOdTvwQSuW9gRqOqz0eARGvZsxYtBzpKCbeETdEBT9LyD5yz7TbuoC7kXp7W3eUuMnz09KmDl0wg3j9RBi5lbxwGs9b5bt6Azf6TJVLFSPsd4NSKApMNazP6Ke1w" },
    { id: "sarah", name: "SARAH_JONES", location: "CONCOURSE B • MERCH", x: "60%", y: "30%", color: "primary", active: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAt4-THs_Gh6WhBUq1qOnYK6Din2kAXyAIX1JhXre8_Pk_m-TWg24m3mEYRSpPtquHPjlZI_b1hzKgi3G5Q9_OHG9MzQwq2V9haG_AZe8tXbq904yG42Q3tVw3bj75Nm0QGm6QSeDSb-Q0v8EC2nX7reQVEBDgqv5snaViWuRczLaOWyK_99D-9cI55Y9Btt4grM1g5h-39TiZD2mNujjiHOyZ86ofb7M7Nc2PHsOFkKndOp-XEgB_kXvHTulbZZ9kbibUyt_8GTg" },
    { id: "devron", name: "DEVRON_77", location: "GATE 4A • ENTRY", x: "20%", y: "40%", color: "secondary", active: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIj50wg8BU3Xp5Txr388t6bimo7gb9tTCYzySLXpW1pd1IGHW8sVq8ZFGX8Hkgh1v4QmCWECOH_gZHhCLOprg4FWtYMxXnwyujRjtFN9O4jDn4mZ5kYJObol7XVhTPbuWTgs6BcQuGn4b4mzu4KpkGcTP92W7Q4XU1ylZR2O25_Ig7dWthGkVXYwVWJBsjFZMgZaNEjHWIcNFTqomkl7D_gndqrgCx6T_TffyG_CCqllJ6GaxSf1yOv0U2XGSy_joAyfbnB0OAFA" },
    { id: "lexi", name: "LEXI_ROSE", location: "OFFLINE • 5M AGO", x: "0%", y: "0%", color: "outline", active: false, offline: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNvbp1VYvwA3M0yD0dq6kpqxVC8UOrZUEDpXLlARKtUCOiCow2E8SHfB-MWmjV3GZs1wR7S9yk1uMci8upmv3Yhui-qEUkbcgtlMms-1_g8I3fBYklsoIcmyzsbSlzf9LYUvE1VDKjZDVMsC5M2WogcQM__Jq4TTBBAXRymjN8HifvFnhznK7CoLW__Ccv6HPlzIejRiEQkm4L_XVElVdgHWWqJpw9ncZHoQadKZZCtjBmGk5xCE4HpN-Qzi6ph-f-XOEkoT7I7A" }
  ]);

  return (
    <div className="px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Friends List & Sync Controls */}
      <div className="lg:col-span-5 flex flex-col gap-8">
        {/* Header Section */}
        <section className="flex flex-col gap-2">
          <span className="font-headline font-bold text-secondary text-sm tracking-widest uppercase">Live Sync</span>
          <h2 className="text-4xl font-headline font-black tracking-tight leading-none uppercase">FRIEND FINDER</h2>
          <p className="text-on-surface-variant text-sm mt-2 max-w-sm">Locate your crew across the arena in real-time. Stay connected through the electric pulse.</p>
        </section>

        {/* Sync CTA Button */}
        <button 
          onClick={() => alert("Location shared with squad members. Signal strength: High.")}
          className="group relative w-full bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-headline font-bold py-5 rounded-xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all kinetic-glow overflow-hidden"
        >
          <span className="material-symbols-outlined">share_location</span>
          <span className="tracking-wider uppercase">Share My Location</span>
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
        </button>

        {/* Quick Shouts */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Quick Message</h3>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => alert("Sending: 'Where are you?'")} className="px-4 py-2 rounded-full border border-outline-variant/30 text-xs font-bold hover:bg-surface-container-highest hover:border-primary/50 transition-all text-on-surface uppercase">"Where are you?"</button>
            <button onClick={() => alert("Sending: 'At Concessions'")} className="px-4 py-2 rounded-full border border-outline-variant/30 text-xs font-bold hover:bg-surface-container-highest hover:border-primary/50 transition-all text-on-surface uppercase">"At Concessions"</button>
            <button onClick={() => alert("Sending: 'Heading to seats'")} className="px-4 py-2 rounded-full border border-outline-variant/30 text-xs font-bold hover:bg-surface-container-highest hover:border-primary/50 transition-all text-on-surface uppercase">"Heading to seats"</button>
            <button onClick={() => alert("Sending: 'Need a drink?'")} className="px-4 py-2 rounded-full border border-outline-variant/30 text-xs font-bold hover:bg-surface-container-highest hover:border-primary/50 transition-all text-on-surface uppercase">"Need a drink?"</button>
          </div>
        </div>

        {/* Friends List */}
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Crew ({squad.filter((f:any) => !f.offline).length} Active)</h3>
          {squad.map((friend: any) => (
            <FriendCard 
              key={friend.id}
              name={friend.name} 
              location={friend.location} 
              img={friend.img} 
              active={friend.active}
              offline={friend.offline}
            />
          ))}
        </div>
      </div>

      {/* Right Column: Interactive Map */}
      <div className="lg:col-span-7 h-full min-h-[500px]">
        <div className="w-full h-full bg-surface-container rounded-[2rem] overflow-hidden relative border border-white/5 shadow-2xl">
          {/* Map UI Overlays */}
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
            <div className="bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Live Arena Feed</span>
            </div>
          </div>
          
          <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
            <button className="w-12 h-12 bg-background/80 backdrop-blur-md text-on-background rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-on-primary-container transition-all">
              <span className="material-symbols-outlined">add</span>
            </button>
            <button className="w-12 h-12 bg-background/80 backdrop-blur-md text-on-background rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-on-primary-container transition-all">
              <span className="material-symbols-outlined">remove</span>
            </button>
            <button className="w-12 h-12 bg-background/80 backdrop-blur-md text-on-background rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-on-primary-container transition-all mt-4">
              <span className="material-symbols-outlined">my_location</span>
            </button>
          </div>

          {/* Map Content */}
          <div className="w-full h-full relative overflow-hidden grayscale contrast-[1.2]">
            <img 
              alt="Stadium Map" 
              className="w-full h-full object-cover opacity-30" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6CJ_918hW2C2oMuewvyWggpexfZwlnGXagLRiwqsMHpZZHsKzqi_3-HdMeJzJnFGxhzCKXhjxwDV87oHLTE03Lw3rno7z5anK31WBZuv_TsQeeyz51sZVk5xrHFdVvXssPB1uxHttelKNtSQAw33HFX3c8EnO4KWvGIlhwaqgRcLHiZrlGggWyConP2EqvXeCBNqIrNZF29CEi10GeXkJFgvzSAgb8sZVPVRdg0ZCK_h67ED8PbMJFG5IrJNwkvPGZ9uwyIO83A" 
            />
            
            {/* Pulsating Hotspot (Me) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                <div className="absolute inset-2 bg-primary/40 rounded-full animate-pulse"></div>
                <div className="absolute inset-[1.3rem] bg-primary rounded-full border-4 border-background shadow-lg shadow-primary/50"></div>
              </div>
            </div>

            {/* Friend Markers */}
            <MapFriendMarker x="35%" y="65%" name="Marcus" color="secondary" img="https://lh3.googleusercontent.com/aida-public/AB6AXuA7EW06liO_jzReBsi1d2Vmcllp0KTdOhF_dyyV8M3RpUukBgjVkD9C0Niro886lli5cv1SIBHaXehckbsDIaQJFi5ITCybF94zRMfAVlAlF7GWKYbw-xfiauP2Dic4AvvTee2YG3MHYs15hClKeNfs9Xyg8_4EIHVlBCgGgQTUKT3aoH13k7NnmW4bFCXglMF8wVQ489rJfixdgKq5XmxPSUR2aFUjKe-atfY8xcK_Rdn3aUuP3sEh1qlMjSzhRnf_43G5pVEMqw" />
            <MapFriendMarker x="60%" y="30%" name="Sarah" color="primary" img="https://lh3.googleusercontent.com/aida-public/AB6AXuClwi31iujIDUoD2By6zQxR8YtTSF4InzePtcdH0qu2aX5dfCnNb0sv7-uhsOE717AuFxEQ2agmV2jNKWqIHJhjxhhNgURB1dWEPwhOC-RCEg4Q8WNreGUAOmmzYo8k6_ZCxgko16Do5dxE5v0QWFTwp0MXkSjT9PbMST50eRmOzCp1hZceJdcDMhXf22PQuIAK1JR_HX50ydvwvZB1hXWlHNTA7uyJwOd7tHt75lmpXT2RelrlL5lZLSLgJmAKmRo66vx8CckKHA" />
            <MapFriendMarker x="20%" y="40%" name="Devron" color="secondary" img="https://lh3.googleusercontent.com/aida-public/AB6AXuAFKc6_uhl94HSWRP3usAYAfkoKG3kJaDTDKHVXgh1rFqLNcCxDZK9lUGL8MGhsQ8Zlfe1sEnuKYdujsTCeh67lRZiD5qBqMVbgT3IQpNogB_mPGkYnSw2tkz6UYAnOo7IY1QDKb5q31ydxcHqVCGUXLL17kbU-tO9fbwuZkJlNPJNch40bi4oncJNSM7hT9xhe80r9u7oxkVumXKSHkkgrh0DwYgSBkeWUBgtR3UFNnBQI-S90vPuh5wy5Y7wFtVdBjfl7SKYgrw" />
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-6 left-6 z-10 flex gap-4 bg-background/60 backdrop-blur-md p-4 rounded-2xl border border-white/5">
            <LegendItem label="Your Location" color="bg-primary" />
            <LegendItem label="Heavy Crowd" color="bg-secondary" />
            <LegendItem label="Exit Path" color="bg-tertiary" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FriendCard: React.FC<{ name: string; location: string; img: string; active?: boolean; offline?: boolean }> = ({ name, location, img, active, offline }) => (
  <div className={`bg-surface-container-low p-4 rounded-xl flex items-center justify-between group hover:bg-surface-container transition-colors relative overflow-hidden ${offline ? 'opacity-60' : ''}`}>
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>}
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl overflow-hidden relative">
        <img alt={name} className={`w-full h-full object-cover ${offline ? 'grayscale' : ''}`} src={img} />
        {!offline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary border-2 border-surface-container-low rounded-full"></div>}
      </div>
      <div className="flex flex-col">
        <span className="font-headline font-bold text-on-surface uppercase tracking-tight">{name}</span>
        <span className={`text-[10px] font-bold tracking-widest uppercase ${active ? 'text-secondary' : 'text-on-surface-variant'}`}>{location}</span>
      </div>
    </div>
    <button 
      onClick={() => alert(`Opening secure channel to ${name}...`)}
      className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
    >
      <span className="material-symbols-outlined">chat_bubble</span>
    </button>
  </div>
);

const MapFriendMarker: React.FC<{ x: string; y: string; name: string; color: string; img: string }> = ({ x, y, name, color, img }) => (
  <div className="absolute group" style={{ top: x, left: y }}>
    <div className="flex flex-col items-center gap-2">
      <div className={`bg-${color} px-3 py-1 rounded-full text-[9px] font-bold text-on-${color} uppercase tracking-widest shadow-lg translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all`}>
        {name}
      </div>
      <div className={`w-10 h-10 rounded-full border-2 border-${color} overflow-hidden shadow-xl hover:scale-110 transition-transform cursor-pointer`}>
        <img alt={name} className="w-full h-full object-cover" src={img} />
      </div>
    </div>
  </div>
);

const LegendItem: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-tighter">{label}</span>
    <div className={`h-1 w-full ${color} rounded-full`}></div>
  </div>
);

export default FriendFinder;
