import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { SiBehance } from 'react-icons/si';
import SectionImage from '../assets/Images/Section.png';


const Hero = () => {
  return (
    <section className="px-4 lg:px-10 py-6">
      <div className="relative bg-[#0b0d10] rounded-[40px] min-h-[600px] flex flex-col lg:flex-row overflow-hidden border border-white/5">
        
        {/* Left Content (Grid Background) */}
        <div className="w-full lg:w-[50%] p-10 lg:p-20 flex flex-col justify-center z-20 relative bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
          <span className="text-amber-400 font-serif text-lg mb-4 italic">Vacation Agency</span>
          <h1 className="text-white text-5xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
            Find next place <br /> to visit
          </h1>
          <p className="text-gray-300 text-lg mb-10 font-light italic">
            Choose from thousands of organized Adventures
          </p>

          {/* Search Bar (Figma Style) */}
          <div className="bg-white p-2 rounded-full flex flex-col md:flex-row items-center gap-2 shadow-2xl max-w-2xl w-full">
            <div className="flex items-center gap-3 px-6 py-3 border-r border-gray-100 flex-1 w-full">
              <FaMapMarkerAlt className="text-gray-400" />
              <input type="text" placeholder="Where to?" className="outline-none text-sm w-full font-medium" />
            </div>
            <div className="flex items-center gap-3 px-6 py-3 flex-1 w-full">
              <FaCalendarAlt className="text-gray-400" />
              <input type="text" placeholder="Select dates" onFocus={(e) => e.target.type='date'} className="outline-none text-sm w-full font-medium" />
            </div>
            <button className="bg-amber-400 w-full md:w-14 h-14 rounded-full flex items-center justify-center text-slate-900 hover:bg-black hover:text-white transition-all duration-300 shadow-lg">
              <FaSearch size={20} />
            </button>
          </div>

          {/* Social Icons (Bottom Left) */}
          <div className="mt-16 flex items-center gap-8 text-gray-400 text-sm font-medium">
            <div className="flex items-center gap-2 cursor-pointer hover:text-white transition">
               <span className="text-lg">👤</span> Sign in or Register
            </div>
            <div className="flex items-center gap-5 border-l border-gray-700 pl-8">
              <FaFacebookF className="hover:text-white cursor-pointer" />
              <SiBehance className="hover:text-white cursor-pointer" />
              <FaYoutube className="hover:text-white cursor-pointer text-lg" />
            </div>
          </div>
        </div>

        {/* Right Image with Torn Paper Effect (Figma Look) */}
        <div className="hidden lg:block absolute right-0 top-0 w-[55%] h-full z-10">
          <img 
            src={SectionImage} 
            alt="Travel Destination" 
            className="w-full h-full object-cover" 
            style={{ 
              clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%, 8% 85%, 2% 75%, 10% 65%, 4% 50%, 12% 40%, 6% 25%, 14% 15%)' 
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;