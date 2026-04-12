import React from 'react';
import { useFirebaseData } from '../../hooks/useFirebaseData';

const Concessions: React.FC = () => {
  const { data: featured } = useFirebaseData('stadium_vitals/concessions/featured', {
    id: "neon-burger",
    name: "NEON BURGER CO.",
    wait: 5,
    desc: "The stadium's signature charcoal-bun burgers with electric-blue garlic aioli."
  });

  const { data: vendors } = useFirebaseData('stadium_vitals/concessions/vendors', [
    { id: "apex", name: "APEX PIZZA", wait: "12 MIN", color: "text-tertiary", icon: "local_pizza", desc: "Stone-fired thin crust with volcanic spicy pepperoni." },
    { id: "velocity", name: "VELOCITY BREWS", wait: "2 MIN", color: "text-primary", icon: "liquor", desc: "Craft beers and artisanal nitrogen-infused refreshments." },
    { id: "zero", name: "ZERO DEGREE", wait: "25 MIN", color: "text-secondary", icon: "icecream", desc: "Liquid nitrogen flash-frozen treats and dairy-free peaks." }
  ]);

  return (
    <div className="px-6 max-w-7xl mx-auto">
      {/* Hero Section: Active Order / Recent */}
      <section className="mb-10">
        <h2 className="font-headline text-3xl font-bold tracking-tighter uppercase mb-6 text-on-background">MY RECENT ORDERS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OrderCard 
            store="NEON BURGER CO." 
            location="GATE 4A" 
            items="2x Double Kinetic Burger, 1x Large Fries" 
            price="34.50" 
            status="secondary"
          />
          <OrderCard 
            store="VELOCITY BREWS" 
            location="SECTOR B" 
            items="1x Nitro Cold Brew, 1x Energy Glazed Donut" 
            price="12.00" 
            status="outline"
          />
        </div>
      </section>

      {/* Vendors Grid */}
      <section className="mb-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-headline text-4xl font-black tracking-tighter uppercase leading-none">VENDORS</h2>
            <p className="text-primary font-body text-sm tracking-wide mt-2 uppercase">Live Wait Times • Express Pickup Available</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-surface-container-highest px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/10">All</button>
            <button className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-on-surface-variant">Food</button>
            <button className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-on-surface-variant">Drinks</button>
          </div>
        </div>

        {/* Bento Grid of Vendors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Featured Vendor */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-xl bg-surface-container-low h-[400px]">
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIC7GCuupU-ERe-RmAY295kbVDjEELPUARUzxo59xQOKQgQq5tt2OpfQ7w3OM6x4alCLsR6Ey1dAHYVaGoYnAoAeBRSoH_2RegUyXgzlrZsAQopO-43PfgawLPBLf3QNRRgcqrXW0paJnzxXY9lN7GitXCQ0dJdsa-OKrktNl0U1XEFAxd9unyQEdcQ2rpLcGR_haquVF4PWWQlVTkvfahXdRwnX7mfENj8uGhWgHh5kbP6Vr0WgzXDQwp8ev5ItuoAq1uroqoqA" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <div className="flex justify-between items-end">
                <div>
                  <div className="inline-flex items-center gap-2 bg-secondary/90 backdrop-blur px-3 py-1 rounded-full mb-4">
                    <span className="material-symbols-outlined text-[14px] text-on-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
                    <span className="text-[10px] font-black text-on-secondary uppercase tracking-widest">{featured.wait} MIN WAIT</span>
                  </div>
                  <h3 className="font-headline text-5xl font-black tracking-tighter uppercase text-white mb-2 italic">{featured.name}</h3>
                  <p className="text-on-surface-variant max-w-md">{featured.desc}</p>
                </div>
                <button 
                  onClick={() => alert("Vendor selected: NEON BURGER CO.")}
                  className="kinetic-gradient text-on-primary-container px-8 py-4 rounded-xl font-headline font-black uppercase italic tracking-tighter text-xl active:scale-95 transition-transform"
                >
                  SELECT
                </button>
              </div>
            </div>
          </div>

          {vendors.map((v: any) => (
            <VendorCard 
              key={v.id}
              icon={v.icon} 
              name={v.name} 
              wait={v.wait} 
              waitColor={v.color} 
              desc={v.desc} 
            />
          ))}
        </div>
      </section>

      {/* Menu Section (Contextual for Selection) */}
      <section className="bg-surface-container rounded-[2rem] p-8 border border-primary/5 shadow-2xl mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-background">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEHMYSZNLxTEe5HaiOiHekaHYe9BGvpkEf3c18OBlFdPRFjmpqNTSQHBtKYsRpvSkxVeVon0y9SP8zxztolWwppIcoanOg5_MQbRjPgKL1-XVjO0BGTc4Gu2CkgpwG1iz71yHFXTQwhCEnLOmFWYbK60LPuiE1Sldx5UuJ6drXZv06sryPQFjV2Qo0cp7U4RGNDorObkpab6a3CZmZRd7x0rB664eqfAXR9vfRvIrTRwUhS_KrJlRG9eIPGiMSgm22K-86CkkmOw" 
              />
            </div>
            <div>
              <h2 className="font-headline text-4xl font-black italic tracking-tighter uppercase">NEON BURGER MENU</h2>
              <div className="flex gap-4 mt-2">
                <span className="text-secondary text-xs font-bold tracking-widest uppercase">FASTEST OPTION</span>
                <span className="text-on-surface-variant text-xs font-bold tracking-widest uppercase">GATE 4A • CONCOURSE LEVEL</span>
              </div>
            </div>
          </div>
          <div className="bg-secondary/10 px-4 py-2 rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary">flash_on</span>
            <span className="text-secondary font-black tracking-widest uppercase text-sm">MOBILE ORDER ACTIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MenuItem name="KINETIC STACK" price="18" desc="Double beef, blue cheese, caramelized onions, and neon glaze on a brioche bun." />
          <MenuItem name="CIRCUIT FRIES" price="9" desc="Seasoned waffle fries with spicy cheese drizzle and pickled jalapeños." />
          <MenuItem name="GLOW SHAKE" price="11" desc="Vanilla bean shake with edible neon sprinkles and blue raspberry swirl." />
        </div>
      </section>
    </div>
  );
};

const OrderCard: React.FC<{ store: string; location: string; items: string; price: string; status: string }> = ({ store, location, items, price, status }) => (
  <div className={`bg-surface-container-low p-5 rounded-xl border-l-4 ${status === 'secondary' ? 'border-secondary' : 'border-outline'} flex justify-between items-center group hover:bg-surface-container transition-all duration-300`}>
    <div className="flex flex-col">
      <span className={`text-[10px] tracking-widest font-bold uppercase mb-1 ${status === 'secondary' ? 'text-secondary' : 'text-outline'}`}>
        COMPLETED • {location}
      </span>
      <h3 className="font-headline text-xl font-bold text-on-surface uppercase tracking-tight">{store}</h3>
      <p className="text-sm text-on-surface-variant">{items}</p>
    </div>
    <div className="text-right">
      <div className="font-headline text-lg font-bold text-primary mb-1">${price}</div>
      <button 
        onClick={() => alert(`Reordering from ${store}`)}
        className="text-[10px] font-bold tracking-widest uppercase py-1.5 px-3 rounded-full border border-outline-variant hover:border-primary hover:text-primary transition-colors"
      >
        REORDER
      </button>
    </div>
  </div>
);

const VendorCard: React.FC<{ icon: string; name: string; wait: string; waitColor: string; desc: string }> = ({ icon, name, wait, waitColor, desc }) => (
  <div className="bg-surface-container-low rounded-xl p-6 flex flex-col justify-between group hover:bg-surface-container transition-colors">
    <div>
      <div className="flex justify-between items-start mb-6">
        <div className="w-14 h-14 bg-surface-container-highest rounded-xl flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-black text-outline uppercase tracking-widest">WAIT TIME</div>
          <div className={`text-xl font-headline font-bold ${waitColor}`}>{wait}</div>
        </div>
      </div>
      <h3 className="font-headline text-2xl font-bold tracking-tighter uppercase mb-2">{name}</h3>
      <p className="text-sm text-on-surface-variant">{desc}</p>
    </div>
    <button 
      onClick={() => alert(`Opening menu for ${name}`)}
      className="mt-6 w-full border border-primary/20 hover:border-primary text-primary py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
    >
      VIEW MENU
    </button>
  </div>
);

const MenuItem: React.FC<{ name: string; price: string; desc: string }> = ({ name, price, desc }) => (
  <div className="bg-surface-container-highest p-6 rounded-2xl flex flex-col justify-between border border-transparent hover:border-primary/20 transition-all group">
    <div>
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-headline text-xl font-bold uppercase tracking-tighter">{name}</h4>
        <span className="font-headline text-xl font-black text-primary">${price}</span>
      </div>
      <p className="text-sm text-on-surface-variant mb-6">{desc}</p>
    </div>
    <button 
      onClick={() => alert(`ADDED TO CART: ${name} ($${price})`)}
      className="kinetic-gradient text-on-primary-container w-full py-4 rounded-xl font-headline font-black uppercase italic tracking-tighter flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform"
    >
      <span className="material-symbols-outlined text-lg">shopping_cart</span>
      ADD TO ORDER
    </button>
  </div>
);

export default Concessions;
