import React from 'react';
import { Link } from 'react-router-dom'; // রাউটিং এর জন্য ইম্পোর্ট

const Footer = () => {
  return (
    <footer className="bg-[#0b0d10] text-white pt-20 pb-10 px-6 lg:px-20 border-t border-white/5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/">
            <h2 className="text-3xl font-black mb-6 italic cursor-pointer">
              Travlia<span className="text-amber-500">.</span>
            </h2>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Leading travel management company committed to providing the best travel experience for our clients.
          </p>
        </div>

        {/* Links Section - Updated with Routes */}
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-amber-500">Links</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li>
              <Link to="/about" className="hover:text-white cursor-pointer transition block">About Us</Link>
            </li>
            <li>
              <Link to="/tours" className="hover:text-white cursor-pointer transition block">Tour Package</Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-white cursor-pointer transition block">Latest Blog</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white cursor-pointer transition block">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-amber-500">Contact</h4>
          <p className="text-gray-400 text-sm mb-2">Email: info@travlia.com</p>
          <p className="text-gray-400 text-sm mb-4">Location: Sylhet, Bangladesh</p>
          <Link to="/contact" className="text-amber-500 text-sm italic underline hover:text-amber-400 transition">
            Get Directions
          </Link>
        </div>

        {/* Newsletter Section */}
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-amber-500">Newsletter</h4>
          <div className="flex bg-white/10 p-2 rounded-full border border-white/5 focus-within:border-amber-500/50 transition">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-transparent px-4 py-2 outline-none w-full text-sm text-white placeholder:text-gray-500" 
            />
            <button className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-2 rounded-full font-black text-xs uppercase transition-all active:scale-95">
              Go
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-20 pt-8 border-t border-white/10 text-center text-gray-500 text-[10px] md:text-xs tracking-widest uppercase">
        © 2026 Travlia - Traveling Agency Design
      </div>
    </footer>
  );
};

export default Footer;