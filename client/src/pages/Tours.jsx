import React, { useState, useEffect } from 'react';
import TourImage from '../assets/Images/tours.png'; 

const allTours = [
  { id: 1, title: "Lithaniya – Santa Cruza", location: "Italy", duration: 4, nights: "4 Nights", price: 359, category: "Adventure", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800" },
  { id: 2, title: "Velouria – Monte Sienna", location: "Bhutan", duration: 6, nights: "3 Nights", price: 859, category: "Cultural", img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800" },
  { id: 3, title: "Elvarra – Costa Lumia", location: "Morroco", duration: 5, nights: "2 Nights", price: 689, category: "Relaxation", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800" },
  { id: 4, title: "Seraphina – Porto Luno", location: "Venice", duration: 8, nights: "7 Nights", price: 950, category: "Water", img: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=800" },
  { id: 5, title: "Calethia – Isla Verona", location: "Maldives", duration: 7, nights: "3 Nights", price: 1099, category: "Water", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800" },
  { id: 6, title: "Verona – Isla Calethia", location: "London", duration: 7, nights: "3 Nights", price: 750, category: "Adventure", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800" },
  { id: 7, title: "Japan And Bali Special", location: "Japan", duration: 9, nights: "8 Nights", price: 699, category: "Cultural", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800" },
];

const Tours = () => {
  const [filteredTours, setFilteredTours] = useState(allTours);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [priceRange, setPriceRange] = useState(1099);
  const [durationRange, setDurationRange] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 6;

  useEffect(() => {
    let result = allTours.filter(tour => tour.price <= priceRange && tour.duration <= durationRange);
    if (selectedDestinations.length > 0) result = result.filter(tour => selectedDestinations.includes(tour.location));
    if (selectedActivities.length > 0) result = result.filter(tour => selectedActivities.includes(tour.category));
    setFilteredTours(result);
    setCurrentPage(1);
  }, [selectedDestinations, selectedActivities, priceRange, durationRange]);

  const toggleFilter = (item, state, setState) => {
    setState(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const indexOfLastTour = currentPage * toursPerPage;
  const currentTours = filteredTours.slice(indexOfLastTour - toursPerPage, indexOfLastTour);
  const totalPages = Math.ceil(filteredTours.length / toursPerPage);

  return (
    <main className="bg-white">
      {/* ব্যানার সেকশন - আপনার মার্ক করা ডিজাইন অনুযায়ী */}
      <section className="bg-[#fdf7f0] py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* বাম পাশের টেক্সট */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
                Trip Search <br /> Result
              </h1>
              <div className="flex items-center gap-2 mt-6 text-sm font-bold uppercase tracking-widest text-slate-500">
                <span>Home</span> <span className="text-orange-500 font-black">»</span> <span className="text-slate-900">Trip Search Result</span>
              </div>
            </div>

            {/* ডান পাশের ইমেজ - মার্ক করা বক্স অনুযায়ী ফিক্সড সাইজ */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] h-[250px] lg:h-[300px] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={TourImage} 
                  alt="Tour Banner" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* মেইন কন্টেন্ট এবং ফিল্টার সেকশন */}
      <section className="py-20 container mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* লেফট ফিল্টার সাইডবার */}
          <aside className="w-full lg:w-1/4 space-y-8">
             <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-5">
               <h3 className="text-xl font-bold mb-6">Criteria</h3>
               
               {/* Destination Filter */}
               <div className="mb-8">
                 <div className="flex justify-between items-center mb-4 text-slate-900 font-bold text-sm uppercase">
                   <p>Destination</p>
                   <span className="text-gray-400">^</span>
                 </div>
                 {['Bhutan', 'Italy', 'London', 'Maldives'].map(dest => (
                   <label key={dest} className="flex justify-between items-center mb-3 cursor-pointer group">
                     <div className="flex items-center gap-3">
                       <input type="checkbox" className="accent-yellow-500 w-4 h-4 rounded" onChange={() => toggleFilter(dest, selectedDestinations, setSelectedDestinations)} />
                       <span className="text-sm text-gray-600 group-hover:text-yellow-600 font-medium">{dest}</span>
                     </div>
                     <span className="text-xs text-gray-300">1</span>
                   </label>
                 ))}
                 <button className="text-orange-500 text-xs font-bold mt-2 underline">Show More</button>
               </div>

               {/* Price Filter */}
               <div className="mb-8 border-t pt-6">
                 <p className="font-bold text-sm uppercase mb-4">Price</p>
                 <input type="range" className="w-full accent-yellow-400" min="359" max="1099" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
                 <div className="flex justify-between text-xs font-bold mt-2 text-slate-500">
                   <span>$359</span>
                   <span className="text-slate-900">${priceRange}</span>
                 </div>
               </div>

               {/* Duration Filter */}
               <div className="mb-8 border-t pt-6">
                 <p className="font-bold text-sm uppercase mb-4">Duration</p>
                 <input type="range" className="w-full accent-yellow-400" min="4" max="9" value={durationRange} onChange={(e) => setDurationRange(e.target.value)} />
                 <div className="flex justify-between text-xs font-bold mt-2 text-slate-500">
                   <span>4 Days</span>
                   <span className="text-slate-900">{durationRange} Days</span>
                 </div>
               </div>
             </div>
          </aside>

          {/* রাইট কার্ড গ্রিড */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentTours.map((tour) => (
                <div key={tour.id} className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl group border border-gray-50 transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img src={tour.img} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-orange-500 font-bold uppercase mb-2">{tour.location}</p>
                    <h3 className="text-xl font-black text-slate-800 mb-4 leading-tight group-hover:text-orange-500 transition-colors">{tour.title}</h3>
                    <div className="flex items-center justify-between border-y py-3 mb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <span>📅 {tour.duration} Days</span>
                      <span>🌙 {tour.nights}</span>
                      <span>🌍 08 Country</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Starting From</p>
                        <p className="text-xl font-black text-slate-900">${tour.price}</p>
                      </div>
                      <button className="bg-slate-900 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-orange-500 transition-all shadow-lg hover:shadow-orange-200">View Tour</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* প্যাজিনেশন */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-3">
                {[...Array(totalPages)].map((_, index) => (
                  <button key={index} onClick={() => setCurrentPage(index + 1)} className={`w-12 h-12 rounded-full font-bold transition-all ${currentPage === index + 1 ? 'bg-orange-500 text-white shadow-lg scale-110' : 'bg-white border text-gray-400 hover:border-orange-500 hover:text-orange-500'}`}>
                    0{index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Tours;