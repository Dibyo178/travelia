import React from 'react';
import { Link } from 'react-router-dom'; // লিঙ্ক ইম্পোর্ট করা হয়েছে
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const PopularDestinations = () => {
  const destinations = [
    { id: 1, name: "Lithaniya - Santa Cruza", price: "359", img: "https://images.unsplash.com/photo-1526481285228-5adc33d40855", location: "ROME", days: "4 Days - 4 Nights" },
    { id: 2, name: "Velouria - Monte Sienna", price: "850", img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963", location: "BHUTAN", days: "6 Days - 3 Nights" },
    { id: 3, name: "Elvarra - Costa Lumia", price: "689", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077", location: "MOROCCO", days: "5 Days - 2 Nights" },
    { id: 4, name: "Seraphina - Porto Luno", price: "1099", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34", location: "VENICE", days: "8 Days - 7 Nights" },
    { id: 5, name: "Paris - Eiffel Magic", price: "720", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34", location: "PARIS", days: "3 Days - 2 Nights" },
  ];

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
              <div className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all group mb-10">
                {/* Image Section */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={dest.img} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                    alt={dest.name}
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                    {dest.location}
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded-md font-bold flex items-center gap-1 backdrop-blur-sm">
                    ⭐ 4.5
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="font-black text-lg mb-4 text-slate-800 h-14 overflow-hidden">
                    {dest.name}
                  </h3>
                  
                  <div className="flex justify-between items-center border-t pt-4 border-gray-100">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Starting From</span>
                        <span className="font-black text-slate-900 text-xl">${dest.price}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Package</span>
                        <span className="text-[11px] font-black text-slate-700 whitespace-nowrap">{dest.days}</span>
                    </div>
                  </div>

                  {/* Button -> Link এ পরিবর্তন */}
                  <Link 
                    to={`/package/${dest.id}`}
                    className="w-full mt-6 bg-amber-400 text-slate-900 text-[11px] font-black py-4 rounded-xl hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest flex justify-center items-center"
                  >
                    Explore Trip & Book
                  </Link>
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