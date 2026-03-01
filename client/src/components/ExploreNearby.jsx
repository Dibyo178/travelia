import React from 'react';
import { FaShip, FaMountain, FaSun, FaBus } from 'react-icons/fa';

const ExploreNearby = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-20">
        
        {/* Title & Newsletter Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20">
          <div>
            <span className="text-amber-500 font-serif italic text-xl mb-2 block">Vacation Agency</span>
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              Explore  Nearby
            </h2>
          </div>
          <div className="w-full lg:w-1/3 mt-8 lg:mt-4">
       
          </div>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Services List */}
          <div className="lg:col-span-3 space-y-10">
            {[
              { icon: <FaShip />, label: "Ship Cruise" },
              { icon: <FaMountain />, label: "Mountains Tour" },
              { icon: <FaSun />, label: "Summer Rest" },
              { icon: <FaBus />, label: "Bus Tour" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-5 group cursor-pointer">
                <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-amber-400 group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <span className="text-2xl text-slate-700">{item.icon}</span>
                </div>
                <span className="font-black text-xl uppercase tracking-tighter text-slate-900">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Right: Image Grid (Figma Style) */}
          <div className="lg:col-span-9 relative">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="h-44 rounded-[30px] overflow-hidden shadow-lg transform hover:scale-105 transition">
                    <img src="https://images.unsplash.com/photo-1526481285228-5adc33d40855?auto=format&fit=crop&w=500" className="w-full h-full object-cover" alt="tour" />
                </div>
                <div className="h-64 rounded-[40px] overflow-hidden shadow-xl md:row-span-2 relative">
                     <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=500" className="w-full h-full object-cover" alt="tour" />
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <h3 className="text-6xl font-black text-white/30 -rotate-90 uppercase whitespace-nowrap">84K Happy</h3>
                     </div>
                </div>
                <div className="h-44 rounded-[30px] overflow-hidden shadow-lg mt-10">
                    <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=500" className="w-full h-full object-cover" alt="tour" />
                </div>
                <div className="h-44 rounded-[30px] overflow-hidden shadow-lg">
                    <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500" className="w-full h-full object-cover" alt="tour" />
                </div>
                <div className="h-44 rounded-[30px] overflow-hidden shadow-lg">
                    <img src="https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=500" className="w-full h-full object-cover" alt="tour" />
                </div>
            </div>

            {/* Float Stats Badge */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-3xl shadow-2xl z-30 text-center border-4 border-amber-400/10">
                <h4 className="text-amber-500 font-black text-4xl italic">84K HAPPY</h4>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Adventures</p>
            </div>
          </div>
        </div>

        {/* User Quote Section (Fixed Line 79) */}
   
      </div>
    </section>
  );
};

export default ExploreNearby;