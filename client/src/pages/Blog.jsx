import React, { useState } from 'react';

const Blog = () => {
  // ১. সব পোস্টের ডাটা (লজিক চেক করার জন্য এখানে ১২টি পোস্ট দেওয়া হলো)
  const allPosts = [
    { title: "Top 10 Places to Visit in Italy", date: "Oct 24, 2025", author: "Admin", img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800" },
    { title: "How to Travel on a Budget", date: "Nov 02, 2025", author: "Traveler", img: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=800" },
    { title: "The Best Beaches in Maldives", date: "Dec 15, 2025", author: "Expert", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800" },
    { title: "Essential Gear for Hikers", date: "Jan 10, 2026", author: "Guide", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800" },
    { title: "Exploring Ancient Ruins", date: "Feb 05, 2026", author: "Admin", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800" },
    { title: "Winter Wonderland Guide", date: "Mar 01, 2026", author: "Traveler", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800" },
    { title: "Safari Adventures in Africa", date: "Apr 12, 2026", author: "Expert", img: "https://images.unsplash.com/photo-1516422213484-2142eddf634c?auto=format&fit=crop&w=800" },
    { title: "Hidden Gems of Japan", date: "May 20, 2026", author: "Guide", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800" },
    { title: "Paris: The City of Lights", date: "Jun 05, 2026", author: "Admin", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800" },
   
  ];

  // ২. ডাইনামিক প্যাজিনেশন লজিক
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; 

  // হিসাব: বর্তমান পেজে কোন পোস্টগুলো দেখাবে
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  // মোট পেজ সংখ্যা হিসাব
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  // পেজ হ্যান্ডেলার ফাংশন
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 450, behavior: 'smooth' }); // চেঞ্জ হলে গ্রিড সেকশনে স্ক্রল করবে
  };

  return (
    <main className="bg-white">
      {/* 1. Blog Banner */}
      <section className="px-4 lg:px-10 py-10">
        <div className="relative w-full max-w-7xl mx-auto h-[450px] rounded-[40px] overflow-hidden flex items-center bg-[#fdf7f0]">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <div className="container mx-auto px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 items-center h-full relative z-10">
            <div>
              <span className="text-orange-500 font-serif italic text-xl block mb-2">Our Insights</span>
              <h1 className="text-6xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-none">Latest <br /> News</h1>
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm w-fit px-4 py-2 rounded-xl border border-orange-100 shadow-sm mt-4">
                <span className="font-bold text-xs uppercase text-slate-700">Home</span>
                <span className="text-orange-500 font-black">»</span>
                <span className="font-bold text-xs uppercase text-gray-400">Blog</span>
              </div>
            </div>
            <div className="hidden lg:block h-full relative">
              <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000" className="absolute bottom-0 right-0 h-[115%] object-contain" alt="Blogger" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Blog Posts Grid (Using currentPosts) */}
      <section className="py-24 container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {currentPosts.map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="rounded-[40px] overflow-hidden h-72 mb-8 relative shadow-lg">
                <img src={post.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" alt={post.title} />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm">
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">{post.date}</span>
                </div>
              </div>
              <div className="px-2">
                <div className="flex items-center gap-3 mb-3">
                   <span className="w-8 h-[2px] bg-amber-400"></span>
                   <span className="text-[10px] font-bold uppercase text-amber-600 tracking-widest">By {post.author}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4 group-hover:text-amber-500 transition-colors duration-300">{post.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 italic">Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal...</p>
                <button className="flex items-center gap-2 text-xs font-black uppercase tracking-tighter group-hover:gap-4 transition-all duration-300">
                  Read Full Article <span className="text-amber-500 text-lg">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Updated Functional Pagination Section */}
        {totalPages > 1 && (
          <div className="mt-24 flex flex-col items-center">
            <div className="flex items-center gap-3">
              {/* Previous Button */}
              <button 
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className={`w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300 ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black hover:text-white hover:border-black shadow-sm'}`}
              >
                <span className="text-xl">←</span>
              </button>

              {/* Dynamic Page Numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-14 h-14 rounded-full font-black text-sm transition-all duration-300 transform active:scale-90 ${
                      currentPage === pageNum 
                      ? 'bg-amber-400 text-slate-900 shadow-xl shadow-amber-400/20 scale-110' 
                      : 'bg-white border border-gray-200 text-slate-500 hover:border-amber-400 hover:text-amber-500 shadow-sm'
                    }`}
                  >
                    {pageNum < 10 ? `0${pageNum}` : pageNum}
                  </button>
                );
              })}

              {/* Next Button */}
              <button 
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300 ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black hover:text-white hover:border-black shadow-sm'}`}
              >
                <span className="text-xl">→</span>
              </button>
            </div>
            
            {/* Page Indicator Text */}
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
              Showing Page <span className="text-slate-900">{currentPage}</span> of {totalPages}
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Blog;