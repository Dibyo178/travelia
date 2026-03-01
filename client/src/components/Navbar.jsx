import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // মেনু ওপেন/ক্লোজ স্টেট

  return (
    <nav className="bg-white sticky top-0 z-[100] shadow-sm">
      <div className="flex items-center justify-between px-6 lg:px-12 py-5 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-slate-900 tracking-tighter">
          TRAVLIA<span className="text-orange-500">.</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 font-bold text-slate-700 uppercase text-[13px] tracking-widest">
          <li className="hover:text-orange-500 transition cursor-pointer">Home</li>
          <li className="hover:text-orange-500 transition cursor-pointer">About</li>
          <li className="hover:text-orange-500 transition cursor-pointer">Tours</li>
          <li className="hover:text-orange-500 transition cursor-pointer">Blog</li>
          <li className="hover:text-orange-500 transition cursor-pointer">Contact</li>
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="p-3 bg-gray-100 rounded-full hover:bg-orange-100 transition"><FaSearch /></button>
          <button className="hidden md:block bg-black text-white px-7 py-3 rounded font-black text-[12px] uppercase tracking-widest hover:bg-orange-500 transition">
            Explore Trip
          </button>

          {/* Toggle Button (Hamburger) */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="bg-amber-400 p-3 rounded text-white lg:hidden text-xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t absolute w-full left-0 shadow-xl animate-fade-in-down">
          <ul className="flex flex-col p-6 gap-4 font-bold uppercase text-sm">
            <li className="py-2 border-b border-gray-50">Home</li>
            <li className="py-2 border-b border-gray-50">About</li>
            <li className="py-2 border-b border-gray-50">Tours</li>
            <li className="py-2">Contact</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;