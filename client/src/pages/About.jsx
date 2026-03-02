import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import GetToKnowUs from '../components/GetToKnowUs';
import about from '../assets/Images/about.png'; 

const About = () => {
  return (
    <main className="bg-white">
      {/* 1. New Banner Design (Ref: image_4320fe.jpg) */}
      <section className="px-4 lg:px-10 py-10">
        <div className="relative w-full max-w-7xl mx-auto h-[450px] rounded-[40px] overflow-hidden flex items-center bg-[#fdf7f0]">
          {/* Left Grid Background */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="container mx-auto px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 items-center h-full relative z-10">
            <div>
              <h1 className="text-7xl font-black text-slate-900 uppercase tracking-tighter mb-4">About</h1>
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm w-fit px-4 py-2 rounded-xl border border-orange-100">
                <span className="font-bold text-sm uppercase">Home</span>
                <span className="text-orange-500 font-black">»</span>
                <span className="font-bold text-sm uppercase text-gray-400">About</span>
              </div>
            </div>

            {/* Banner Right Image (Couple with Suitcase) */}
            <div className="hidden lg:block h-full relative">
              <img 
                src={about} 
                className="absolute bottom-0 right-0 h-[110%] object-contain"
                alt="Travelers"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. New Destination Section (Ref: image_431d9c.jpg) */}
      <section className="py-20 container mx-auto px-6 lg:px-20 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <span className="text-amber-600 font-serif italic text-xl block mb-4">Vacation Agency</span>
            <h2 className="text-5xl font-black text-slate-900 leading-[1.1] mb-6">
              Building destination to <br /> Get things done
            </h2>
            <p className="text-slate-500 text-lg mb-10 max-w-md">
              No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality.
            </p>

            {/* Features Box with Map Background */}
            <div className="relative p-10 rounded-[40px] border border-gray-100 shadow-2xl bg-white overflow-hidden group">
               {/* Background Map Texture */}
               <div className="absolute inset-0 opacity-5 grayscale group-hover:scale-110 transition duration-700" 
                    style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/world-map.png)' }}></div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 relative z-10">
                 {[
                   "Trusted, Local Travel Experts",
                   "Flexible, Hassle-Free Bookings",
                   "Real-Time Itinerary Updates",
                   "Trusted, Local Travel Experts",
                   "Various versions have evolved over",
                   "Real-Time Itinerary Updates"
                 ].map((text, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <div className="w-5 h-5 bg-amber-400 rotate-45 flex items-center justify-center">
                        <span className="text-[10px] text-white -rotate-45 font-bold">✦</span>
                     </div>
                     <span className="font-bold text-slate-800 text-sm tracking-tight">{text}</span>
                   </div>
                 ))}
               </div>

               <div className="mt-10 flex items-center gap-6">
                  <button className="bg-amber-400 hover:bg-black hover:text-white text-slate-900 font-black px-8 py-4 rounded-full transition-all duration-300 uppercase text-xs tracking-widest">
                    Explore Trip
                  </button>
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <img key={i} className="w-10 h-10 rounded-full border-2 border-white object-cover" src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                    ))}
                    <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">+</div>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Floating UI Section (Ref: image_431d9c.jpg) */}
          <div className="relative">
             <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3" alt="travel" className="w-full h-[500px] object-cover" />
             </div>
             
             {/* Floating Card 1 (Review) */}
             <div className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl z-20 hidden md:block w-64">
                <div className="flex items-center gap-3 mb-2">
                   <img src="https://i.pravatar.cc/100?u=9" className="w-10 h-10 rounded-full" alt="" />
                   <div>
                      <h4 className="font-black text-xs">Craig Ramirez</h4>
                      <p className="text-[10px] text-gray-400">@craig_ramirez_04</p>
                   </div>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full mb-2"></div>
                <div className="h-2 w-2/3 bg-gray-100 rounded-full"></div>
             </div>

             {/* Floating Card 2 (Instagram Style) */}
             <div className="absolute -bottom-10 -left-10 bg-white p-4 rounded-3xl shadow-2xl z-20 hidden md:block">
                <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" className="w-40 h-40 rounded-2xl object-cover mb-3" alt="" />
                <div className="flex justify-between items-center px-1">
                   <span className="font-bold text-xs">Iris Mendoza</span>
                   <span className="text-pink-500 text-xs">❤️</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Existing GetToKnowUs Component */}
      <GetToKnowUs />
    </main>
  );
};

export default About;