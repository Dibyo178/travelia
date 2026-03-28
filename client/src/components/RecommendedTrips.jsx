import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMoon, FaGlobe } from 'react-icons/fa';

const BASE_URL = "http://localhost:5000";

const RecommendedTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedTrips = async () => {
      try {
        setLoading(true);
        // ডাটাবেস থেকে সব প্যাকেজ আনা হচ্ছে
        const res = await axios.get(`${BASE_URL}/api/packages`);
        
        // শুধুমাত্র is_recommended === 1 ফিল্টার করা হচ্ছে
        const recommended = res.data.filter(pkg => pkg.is_recommended === 1);
        setTrips(recommended);
      } catch (err) {
        console.error("Error loading recommended trips:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendedTrips();
  }, []);

  if (loading) return <div className="py-20 text-center font-black text-slate-400">Loading Featured Trips...</div>;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Lines */}
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
            Recommended Trips For You
          </h2>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-[35px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-xl transition-all duration-500 group flex flex-col">
              
              {/* Image Section */}
              <div className="h-[300px] overflow-hidden relative">
                <img 
                  src={trip.image.startsWith('http') ? trip.image : `${BASE_URL}${trip.image}`} 
                  alt={trip.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                />
                <div className="absolute top-5 right-5 bg-orange-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                  Featured
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-black text-slate-800 mb-1">{trip.title}</h3>
                <p className="text-gray-400 text-sm font-bold mb-6">Location: {trip.location}</p>

                {/* Stats Icons - Using Database Columns */}
                <div className="flex items-center justify-between py-4 border-y border-gray-100 mb-6">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
                    <FaCalendarAlt className="text-slate-400" />
                    {trip.days} Days
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
                    <FaMoon className="text-slate-400" />
                    {trip.nights || (trip.days - 1)} Nights
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
                    <FaGlobe className="text-slate-400" />
                    {trip.countries || 1} Countries
                  </div>
                </div>

                {/* Price and Button */}
                <div className="mt-auto flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Starting From</p>
                    <p className="text-2xl font-black text-slate-900">${trip.price}</p>
                  </div>
                  <Link 
                    to={`/package/${trip.id}`}
                    className="bg-slate-100 text-slate-900 font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-amber-400 hover:text-white transition-all duration-300"
                  >
                    View Tour
                  </Link>
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