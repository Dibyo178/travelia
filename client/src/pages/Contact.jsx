import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <main className="bg-white">
      {/* 1. New Contact Banner (Ref: image_428e9c.jpg) */}
      <section className="px-4 lg:px-10 py-10">
        <div className="relative w-full max-w-7xl mx-auto h-[450px] rounded-[40px] overflow-hidden flex items-center bg-[#fdf7f0]">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="container mx-auto px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 items-center h-full relative z-10">
            <div>
              <h1 className="text-7xl font-black text-slate-900 uppercase tracking-tighter mb-4">Contact</h1>
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm w-fit px-4 py-2 rounded-xl border border-orange-100 shadow-sm">
                <span className="font-bold text-xs uppercase text-slate-700">Home</span>
                <span className="text-orange-500 font-black">»</span>
                <span className="font-bold text-xs uppercase text-gray-400">Contact</span>
              </div>
            </div>

            {/* Banner Image - Travelers with Suitcase */}
            <div className="hidden lg:block h-full relative">
              <img 
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60" 
                className="absolute bottom-0 right-0 h-[110%] object-contain"
                alt="Travelers"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Form & Special Sale Section (Ref: image_428e42.jpg) */}
      <section className="py-20 bg-[#fdf7f0] relative overflow-hidden">
        {/* Background Map Decoration */}
        <div className="absolute top-10 right-0 opacity-5 pointer-events-none">
           <img src="https://www.transparenttextures.com/patterns/world-map.png" className="w-[600px] grayscale" alt="map" />
        </div>

        <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content & Image */}
          <div className="relative">
            {/* Special Sale Badge */}
            <div className="mb-8">
               <span className="text-sm font-black text-slate-800 uppercase tracking-[0.2em]">Special Sale</span>
               <h2 className="text-6xl font-black text-blue-500 leading-tight tracking-tighter mt-2">
                 Enjoy Your <br /> 
                 <span className="text-blue-400">Vacations</span> <br />
                 With Us
               </h2>
            </div>

            {/* Discount Card */}
            <div className="bg-[#8b5e3c] text-white w-40 p-6 rounded-2xl shadow-xl transform -rotate-12 mb-10 border-4 border-dashed border-white/20">
               <p className="text-[10px] uppercase font-bold text-center mb-1">Receive up to</p>
               <h3 className="text-4xl font-black text-center">50%</h3>
               <p className="text-[10px] uppercase font-bold text-center">Discount</p>
            </div>

            {/* Person Image */}
            <div className="relative z-10 w-full max-w-md">
               <img 
                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3" 
                className="rounded-[40px] shadow-2xl grayscale-[10%] hover:grayscale-0 transition duration-500" 
                alt="traveler" 
               />
               {/* Decorative floating elements */}
               <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-amber-400 rounded-full blur-3xl opacity-30"></div>
            </div>
          </div>

          {/* Right Side: Booking Form */}
          <div className="bg-white p-10 lg:p-14 rounded-[40px] shadow-2xl relative z-20 border border-gray-100">
             <h3 className="text-4xl font-black text-slate-900 mb-8 tracking-tighter">Contact <br /> With Us</h3>
             
             <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-400 ml-1 flex items-center gap-2">
                         <FaMapMarkerAlt className="text-slate-800" /> From
                      </label>
                      <select className="w-full bg-slate-50 p-4 rounded-xl outline-none focus:ring-2 ring-amber-400 text-sm font-bold text-slate-600 appearance-none">
                         <option>Where To Next?</option>
                         <option>USA</option>
                         <option>Europe</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-400 ml-1 flex items-center gap-2">
                         <FaMapMarkerAlt className="text-slate-800" /> To
                      </label>
                      <select className="w-full bg-slate-50 p-4 rounded-xl outline-none focus:ring-2 ring-amber-400 text-sm font-bold text-slate-600 appearance-none">
                         <option>Where To Next?</option>
                         <option>Asia</option>
                         <option>Africa</option>
                      </select>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-black uppercase text-slate-400 ml-1">Date of Journey</label>
                   <input type="date" className="w-full bg-slate-50 p-4 rounded-xl outline-none focus:ring-2 ring-amber-400 text-sm font-bold uppercase" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-400 ml-1">Guests</label>
                      <select className="w-full bg-slate-50 p-4 rounded-xl outline-none focus:ring-2 ring-amber-400 text-sm font-bold">
                         <option>1 Person</option>
                         <option>2 Persons</option>
                         <option>Family</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-400 ml-1">Budget</label>
                      <select className="w-full bg-slate-50 p-4 rounded-xl outline-none focus:ring-2 ring-amber-400 text-sm font-bold">
                         <option>10 USD</option>
                         <option>500 USD</option>
                         <option>1000 USD+</option>
                      </select>
                   </div>
                </div>

                <button className="w-full bg-black text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] text-xs hover:bg-amber-400 hover:text-black transition-all duration-300 shadow-lg active:scale-95">
                   Explore Trip
                </button>
             </form>
          </div>
        </div>
      </section>

      {/* 3. Old Info Boxes (Simplified for modern look) */}
      <section className="py-20 container mx-auto px-6">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-10 bg-white border border-gray-50 rounded-[30px] shadow-sm hover:shadow-xl transition">
               <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-2xl mb-6"><FaPhoneAlt /></div>
               <h4 className="font-black text-xl mb-2">Call Us</h4>
               <p className="text-slate-500 font-bold">+123 456 789</p>
            </div>
            <div className="flex flex-col items-center text-center p-10 bg-white border border-gray-50 rounded-[30px] shadow-sm hover:shadow-xl transition">
               <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-6"><FaEnvelope /></div>
               <h4 className="font-black text-xl mb-2">Email</h4>
               <p className="text-slate-500 font-bold">info@travlia.com</p>
            </div>
            <div className="flex flex-col items-center text-center p-10 bg-white border border-gray-50 rounded-[30px] shadow-sm hover:shadow-xl transition">
               <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center text-2xl mb-6"><FaMapMarkerAlt /></div>
               <h4 className="font-black text-xl mb-2">Location</h4>
               <p className="text-slate-500 font-bold">New York, USA</p>
            </div>
         </div>
      </section>
    </main>
  );
};

export default Contact;