import React from 'react';

const About = () => {
  return (
    <div className="pt-10 pb-20">
      {/* Page Header */}
      <div className="bg-slate-100 py-16 text-center mb-16">
        <h1 className="text-4xl font-black text-slate-900 mb-2">About Travlia</h1>
        <p className="text-orange-500 font-medium">Home / About Us</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60" 
            alt="About Travlia" 
            className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
          />
          <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-8 rounded-2xl hidden lg:block">
            <p className="text-4xl font-black">15+</p>
            <p className="text-sm font-bold uppercase tracking-widest">Years Experience</p>
          </div>
        </div>

        {/* Right: Content */}
        <div>
          <h4 className="text-orange-500 font-bold uppercase tracking-widest mb-4">Get to know us</h4>
          <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
            We Are Professional <br /> Travel Agency Since 2011
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Travlia is a world-leading travel management company. We help you explore the most 
            beautiful destinations across the globe with comfort and safety. Our mission is to 
            provide unforgettable travel experiences for every adventurer.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 font-bold text-slate-800">
              <span className="text-orange-500">✓</span> Best Price Guarantee
            </li>
            <li className="flex items-center gap-3 font-bold text-slate-800">
              <span className="text-orange-500">✓</span> Professional Local Guides
            </li>
            <li className="flex items-center gap-3 font-bold text-slate-800">
              <span className="text-orange-500">✓</span> 24/7 Customer Support
            </li>
          </ul>
          <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition">
            Discover More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;