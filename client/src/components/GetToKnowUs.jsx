import React, { useState } from 'react';
import { FaCheckCircle, FaPlay, FaTimes } from 'react-icons/fa';

const GetToKnowUs = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // from embadded link (TENERIFE | Cinematic travel film)
  const videoUrl = "https://www.youtube.com/embed/xtM7agQLx2o?autoplay=1";

  return (
    <section className="px-4 lg:px-12 py-20 bg-white font-sans">
      <div className="relative bg-[#0b0d10] rounded-[40px] min-h-[500px] flex flex-col lg:flex-row overflow-hidden shadow-2xl">
        
        {/* Left Content Section */}
        <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center z-20">
          <div className="flex items-center gap-2 mb-6">
             <div className="w-8 h-8 bg-amber-400 rounded-sm rotate-45 flex items-center justify-center">
                <span className="text-black font-black -rotate-45 text-xs">▲</span>
             </div>
             <h3 className="text-white text-3xl font-serif italic">Get To Know Us</h3>
          </div>

          <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-md italic">
            Leading travel management company committed to providing the best travel experience for our clients.
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
        </div>

        {/* Right Media Section */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2070" 
            className="w-full h-full object-cover opacity-80" 
            alt="Travel Destination" 
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
               {/* Spinning Text */}
               <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                  <text className="text-[8px] font-bold fill-white uppercase tracking-[2px]">
                     <textPath xlinkHref="#circlePath">PLAY REEL • PLAY REEL • PLAY REEL • </textPath>
                  </text>
               </svg>
               
               {/* Play Button - এটি এখন ভিডিও ওপেন করবে */}
               <div 
                onClick={() => setIsVideoOpen(true)}
                className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-110 transition-transform z-10"
               >
                  <FaPlay className="ml-1" />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Popup */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-300">
          {/* Close Button */}
          <button 
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-8 right-8 text-white text-4xl hover:text-amber-500 transition-colors z-[10001]"
          >
            <FaTimes />
          </button>
          
          <div className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative">
            <iframe 
              className="w-full h-full"
              src={videoUrl}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default GetToKnowUs;