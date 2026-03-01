import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0b0d10] text-white pt-20 pb-10 px-6 lg:px-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-3xl font-black mb-6 italic">Travlia<span className="text-amber-500">.</span></h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Leading travel management company committed to providing the best travel experience for our clients.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-amber-500">Links</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer transition">About Us</li>
            <li className="hover:text-white cursor-pointer transition">Tour Package</li>
            <li className="hover:text-white cursor-pointer transition">Latest Blog</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-amber-500">Contact</h4>
          <p className="text-gray-400 text-sm mb-4">Email: Infor@company.com</p>
          <p className="text-gray-400 text-sm italic underline">Get Directions</p>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-amber-500">Newsletter</h4>
          <div className="flex bg-white/10 p-2 rounded-full">
            <input type="text" placeholder="Email Address" className="bg-transparent px-4 py-2 outline-none w-full text-sm" />
            <button className="bg-amber-400 text-black px-6 py-2 rounded-full font-black text-xs uppercase">Go</button>
          </div>
        </div>
      </div>
      <div className="mt-20 pt-8 border-t border-white/10 text-center text-gray-500 text-xs tracking-widest uppercase">
        © 2026 Travlia - Traveling Agency Design
      </div>
    </footer>
  );
};

export default Footer;