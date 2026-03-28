import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const BASE_URL = "http://localhost:5000";

const PopularDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // ১. ডাটাবেস থেকে প্যাকেজগুলো ফেচ করা
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        // আপনার ব্যাকএন্ডের প্যাকেজ লিস্ট API
        const res = await axios.get(`${BASE_URL}/api/packages`);
        setDestinations(res.data);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (loading) return <div className="text-center py-20 font-black text-slate-400">Loading Destinations...</div>;

  return (
    <section className="py-20 bg-[#fdf7f0] px-4 lg:px-10">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Popular Destinations</h2>
        <p className="text-amber-600 font-serif italic text-lg">Vacation Agency</p>
      </div>

      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-16"
        >
          {destinations.map((dest) => (
            <SwiperSlide key={dest.id}>
              <div className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all group mb-10 h-full flex flex-col">
                {/* Image Section */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    // ডাটাবেসে যদি ইমেজের পাথ থাকে তবে BASE_URL সহ দেখাবে
                    src={dest.image.startsWith('http') ? dest.image : `${BASE_URL}${dest.image}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                    alt={dest.title}
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                    {dest.location}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-black text-lg mb-4 text-slate-800 h-14 overflow-hidden">
                    {dest.title}
                  </h3>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-center border-t pt-4 border-gray-100">
                      <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Starting From</span>
                          <span className="font-black text-slate-900 text-xl">${dest.price}</span>
                      </div>
                      <div className="text-right">
                          <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Duration</span>
                          <span className="text-[11px] font-black text-slate-700 whitespace-nowrap">
                            {dest.days} Days - {dest.nights || (dest.days - 1)} Nights
                          </span>
                      </div>
                    </div>

                    <Link 
                      to={`/package/${dest.id}`}
                      className="w-full mt-6 bg-amber-400 text-slate-900 text-[11px] font-black py-4 rounded-xl hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest flex justify-center items-center"
                    >
                      Explore Trip & Book
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #fbbf24 !important;
          width: 25px !important;
          border-radius: 5px !important;
        }
      `}</style>
    </section>
  );
};

export default PopularDestinations;