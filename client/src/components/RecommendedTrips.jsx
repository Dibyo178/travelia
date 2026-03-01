import React from 'react';
import { FaCalendarAlt, FaMoon, FaGlobe, FaArrowRight } from 'react-icons/fa';

const RecommendedTrips = () => {
  const trips = [
    {
      name: "Lithaniya - Santa Cruza",
      location: "Roman",
      days: "4 Days",
      nights: "4 Nights",
      countries: "08 Country",
      price: "359",
      img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963"
    },
    {
      name: "Velouria - Monte Sienna",
      location: "Bhutan",
      days: "6 Days",
      nights: "3 Nights",
      countries: "08 Country",
      price: "859",
      img: "https://images.unsplash.com/photo-1526481285228-5adc33d40855"
    },
    {
      name: "Elvarra - Costa Lumia",
      location: "Morocco",
      days: "5 Days",
      nights: "2 Nights",
      countries: "08 Country",
      price: "689",
      img: "https://images.unsplash.com/photo-1533105079780-92b9be482077"
    },
    {
      name: "Seraphina - Porto Luno",
      location: "Venice",
      days: "8 Days",
      nights: "7 Nights",
      countries: "08 Country",
      price: "1099",
      img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
    },
    {
      name: "Calethia - Isla Verona",
      location: "Maldives",
      days: "7 Days",
      nights: "3 Nights",
      countries: "08 Country",
      price: "859",
      img: "https://images.unsplash.com/photo-1506929113670-b4319aa58813"
    },
    {
      name: "Verona - Isla Calethia",
      location: "London",
      days: "7 Days",
      nights: "3 Nights",
      countries: "08 Country",
      price: "859",
      img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Lines (Optional) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1440 400">
          <path d="M0,100 C200,50 400,150 600,100 C800,50 1000,150 1440,100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10,10" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-500 font-serif italic text-lg block mb-2">Best Tours</span>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase">
            Recommended Trips For Your
          </h2>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip, index) => (
            <div key={index} className="bg-white rounded-[35px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-xl transition-all duration-500 group">
              
              {/* Image Section */}
              <div className="h-[300px] overflow-hidden">
                <img 
                  src={trip.img} 
                  alt={trip.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                />
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h3 className="text-xl font-black text-slate-800 mb-1">{trip.name}</h3>
                <p className="text-gray-400 text-sm font-bold mb-6">Location: {trip.location}</p>

                {/* Stats Icons */}
                <div className="flex items-center justify-between py-4 border-y border-gray-100 mb-6">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
                    <FaCalendarAlt className="text-slate-400" />
                    {trip.days}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
                    <FaMoon className="text-slate-400" />
                    {trip.nights}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
                    <FaGlobe className="text-slate-400" />
                    {trip.countries}
                  </div>
                </div>

                {/* Price and Button */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Starting From</p>
                    <p className="text-2xl font-black text-slate-900">${trip.price}</p>
                  </div>
                  <button className="bg-slate-100 text-slate-900 font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-amber-400 hover:text-white transition-all duration-300">
                    View Tour
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedTrips;