import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blog = () => {
  // ১. স্টেট ডিক্লেয়ারেশন
  const [allPosts, setAllPosts] = useState([]); // ডাটাবেস থেকে আসা সব পোস্ট
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // ২. এপিআই থেকে ডাটা ফেচ করা
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // আপনার ব্যাকএন্ড ইউআরএল (Localhost/Live)
        const res = await axios.get('http://localhost:5000/api/blogs');
        setAllPosts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // ৩. ডাইনামিক প্যাজিনেশন লজিক
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 450, behavior: 'smooth' });
  };

  if (loading) return <div className="py-20 text-center font-bold">Loading Insights...</div>;

  return (
    <main className="bg-white">
      {/* 1. Blog Banner (Static as per your design) */}
      <section className="px-4 lg:px-10 py-10">
        <div className="relative w-full max-w-7xl mx-auto h-[450px] rounded-[40px] overflow-hidden flex items-center bg-[#fdf7f0]">
          {/* ... Banner Content (Same as your code) ... */}
          <div className="container mx-auto px-10 lg:px-20 relative z-10">
            <h1 className="text-6xl lg:text-7xl font-black text-slate-900 uppercase">Latest News</h1>
          </div>
        </div>
      </section>

      {/* 2. Blog Posts Grid (Using Dynamic Data) */}
      <section className="py-24 container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {currentPosts.length > 0 ? currentPosts.map((post, i) => (
            <div key={post.id || i} className="group cursor-pointer">
              <div className="rounded-[40px] overflow-hidden h-72 mb-8 relative shadow-lg">
                {/* ইমেজ পাথ ব্যাকএন্ড ইউআরএল সহ */}
                <img
                  src={`http://localhost:5000/Uploads/Blog/${post.image}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  alt={post.title}
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-black uppercase text-slate-800">
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
              <div className="px-2">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[2px] bg-amber-400"></span>
                  <span className="text-[10px] font-bold uppercase text-amber-600 tracking-widest">By Admin</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4 group-hover:text-amber-500 transition-colors">
                  {post.title}
                </h3>
                {/* কন্টেন্ট থেকে শর্ট ডেসক্রিপশন */}
                <p className="text-slate-500 text-sm leading-relaxed mb-6 italic">
                  {post.content.substring(0, 120)}...
                </p>
                {/* existing button replace korun niche deya code diye */}
                <Link to={`/blog/${post.id}`}>
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-tighter group-hover:gap-4 transition-all duration-300">
                    Read Full Article <span className="text-amber-500 text-lg">→</span>
                  </button>
                </Link>
              </div>
            </div>
          )) : (
            <div className="col-span-3 text-center text-slate-400">No blog posts found.</div>
          )}
        </div>

        {/* 3. Pagination Section (Dynamic) */}
        {totalPages > 1 && (
          <div className="mt-24 flex flex-col items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${currentPage === 1 ? 'opacity-30' : 'hover:bg-black hover:text-white'}`}
              >
                ←
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`w-14 h-14 rounded-full font-black text-sm transition-all ${currentPage === index + 1 ? 'bg-amber-400 text-slate-900' : 'bg-white border hover:border-amber-400'
                    }`}
                >
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${currentPage === totalPages ? 'opacity-30' : 'hover:bg-black hover:text-white'}`}
              >
                →
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Blog;