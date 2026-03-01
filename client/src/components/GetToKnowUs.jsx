import React from 'react';
import { FaCheckCircle, FaPlay } from 'react-icons/fa';

const GetToKnowUs = () => {
  return (
    <section className="px-4 lg:px-12 py-20 bg-white">
      {/* Main Container */}
      <div className="relative bg-[#0b0d10] rounded-[40px] min-h-[500px] flex flex-col lg:flex-row overflow-hidden shadow-2xl">
        
        {/* Left Content Section */}
        <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center z-20">
          <div className="flex items-center gap-2 mb-6">
             <div className="w-8 h-8 bg-amber-400 rounded-sm rotate-45 flex items-center justify-center overflow-hidden">
                <span className="text-black font-black -rotate-45 text-xs">▲</span>
             </div>
             <h3 className="text-white text-3xl font-serif italic">GetToKnowUs</h3>
          </div>

          <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-md italic">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Mauris nullam the Lorem ipsum dolor sit amet consectetur adipiscing elit consectetur.
          </p>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="flex items-center gap-3 text-white font-bold tracking-tight">
              <FaCheckCircle className="text-cyan-400 text-xl" />
              <span>Best Travel Deals</span>
            </div>
            <div className="flex items-center gap-3 text-white font-bold tracking-tight">
              <FaCheckCircle className="text-cyan-400 text-xl" />
              <span>Flexible Bookings</span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-amber-400 text-slate-900 font-black px-8 py-4 rounded-full w-fit flex items-center gap-3 hover:bg-white transition-all duration-300 group uppercase text-xs tracking-tighter">
            See Holiday Detail 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Vertical Divider with Text (The Pro Touch) */}
        <div className="hidden lg:flex absolute left-1/2 top-0 bottom-0 w-12 bg-black z-30 items-center justify-center border-x border-white/10">
          <p className="text-white text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap -rotate-90">
            Extra 15% across Africa and the Middle East
          </p>
        </div>

        {/* Right Media Section */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2070" 
            className="w-full h-full object-cover opacity-80" 
            alt="Nature" 
          />
          
          {/* Circular Play Button Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
               {/* Animated Circular Text Placeholder (SVG) */}
               <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                  <text className="text-[8px] font-bold fill-white uppercase tracking-[2px]">
                     <textPath xlinkHref="#circlePath">PLAY REEL • PLAY REEL • PLAY REEL • </textPath>
                  </text>
               </svg>
               {/* Play Icon */}
               <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-110 transition-transform z-10">
                  <FaPlay className="ml-1" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetToKnowUs;