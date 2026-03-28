import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'; // Toaster install thakte hobe: npm install react-hot-toast
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaGoogle, FaSignInAlt } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SectionImage from '../assets/Images/Section.png';

const BASE_URL = "http://localhost:5000";

const Hero = () => {
  const navigate = useNavigate();
  const [showDestinations, setShowDestinations] = useState(false);
  const [selectedDest, setSelectedDest] = useState(null); 
  const [startDate, setStartDate] = useState(null);
  
  const [destList, setDestList] = useState([]);
  const [existingBookings, setExistingBookings] = useState([]);
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const destRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ১. প্যাকেজ লিস্ট এবং বুকিং লিস্ট ফেচ করা
        const [pkgRes, bookingRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/packages`),
          axios.get(`${BASE_URL}/api/bookings`)
        ]);
        setDestList(pkgRes.data);
        setExistingBookings(bookingRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (destRef.current && !destRef.current.contains(event.target)) {
        setShowDestinations(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGoogleLogin = () => {
    const dummyUser = { name: "SOUROV" };
    localStorage.setItem('user', JSON.stringify(dummyUser));
    setUser(dummyUser);
    setShowGoogleModal(false);
  };

const handleSearch = () => {
  if (!selectedDest || !startDate) {
    toast.error("Please select both destination and date!");
    return;
  }

  // সিলেক্ট করা ডেটকে YYYY-MM-DD ফরম্যাটে নিয়ে আসা
  const year = startDate.getFullYear();
  const month = String(startDate.getMonth() + 1).padStart(2, '0');
  const day = String(startDate.getDate()).padStart(2, '0');
  const selectedDateString = `${year}-${month}-${day}`;

  // ডুপ্লিকেট বুকিং চেক করার উন্নত লজিক
  const isAlreadyBooked = existingBookings.some(booking => {
    // ডাটাবেসের created_at থেকে শুধু তারিখের অংশ (প্রথম ১০ ক্যারেক্টার) নেওয়া
    const bookingDateOnly = booking.created_at.substring(0, 10); 
    
    return (
      booking.package_id === selectedDest.id && 
      bookingDateOnly === selectedDateString
    );
  });

  if (isAlreadyBooked) {
    toast.error(`This package is already booked for ${selectedDateString}!`, {
      style: { background: '#121418', color: '#fbbf24' },
    });
  } else {
    navigate(`/package/${selectedDest.id}`);
  }
};

  return (
    <section className="px-4 lg:px-10 py-4 lg:py-6">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="relative bg-[#0b0d10] rounded-[30px] lg:rounded-[40px] min-h-[550px] lg:min-h-[600px] flex flex-col lg:flex-row overflow-hidden border border-white/5 shadow-2xl">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
             style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }}>
        </div>

        {/* Left Content */}
        <div className="w-full lg:w-[50%] p-6 lg:p-24 flex flex-col justify-center z-20 relative order-2 lg:order-1">
          <span className="text-amber-400 font-serif text-sm lg:text-lg mb-2 lg:mb-4 italic tracking-widest">Vacation Agency</span>
          <h1 className="text-white text-4xl lg:text-7xl font-black mb-4 lg:mb-6 leading-tight tracking-tighter">
            Find next place <br /> to visit
          </h1>

          {/* Search Bar Container */}
          <div className="bg-white p-1.5 lg:p-2 rounded-[25px] lg:rounded-full flex flex-col md:flex-row items-center gap-1 shadow-2xl max-w-2xl w-full relative mb-10 z-[100]">
            
            {/* Destination Selection */}
            <div className="relative flex-1 w-full md:border-r border-gray-100" ref={destRef}>
              <div className="flex items-center gap-3 px-4 lg:px-6 py-3 lg:py-4 cursor-pointer" onClick={() => setShowDestinations(!showDestinations)}>
                <FaMapMarkerAlt className="text-amber-500" />
                <span className={`text-xs lg:text-sm font-bold ${selectedDest ? 'text-slate-800' : 'text-slate-400'}`}>
                  {selectedDest ? selectedDest.title : "Where to?"}
                </span>
              </div>
              
              {showDestinations && (
                <div className="absolute top-[105%] left-0 w-full md:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[999]">
                  <div className="max-h-60 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-amber-200">
                    {destList.map((pkg) => (
                      <div key={pkg.id} className="px-4 py-3 hover:bg-amber-400 hover:text-white rounded-xl cursor-pointer transition-all"
                           onClick={() => { setSelectedDest({id: pkg.id, title: pkg.title}); setShowDestinations(false); }}>
                        <p className="text-xs lg:text-sm font-black">{pkg.title}</p>
                        <p className="text-[10px] uppercase font-bold opacity-60">{pkg.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Date Selection */}
            <div className="flex items-center gap-3 px-4 lg:px-6 py-3 lg:py-4 flex-1 w-full relative">
              <FaCalendarAlt className="text-amber-500" />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Select date"
                className="outline-none text-xs lg:text-sm w-full font-extrabold text-slate-800 bg-transparent cursor-pointer"
                dateFormat="yyyy-MM-dd"
              />
            </div>

            <button 
              onClick={handleSearch}
              className="bg-amber-400 w-full md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 rounded-xl md:rounded-full flex items-center justify-center text-slate-900 hover:bg-black hover:text-white transition-all shadow-lg active:scale-95"
            >
              <FaSearch size={20} />
            </button>
          </div>
          
            {/* Auth Section */}
          <div className="flex flex-wrap items-center gap-4 lg:gap-6">
            <div 
              onClick={() => { setShowAuthModal(true); setIsRegister(false); }}
              className="flex items-center gap-2 text-gray-400 hover:text-amber-400 cursor-pointer transition-all group"
            >
              <div className="w-8 h-8 lg:w-9 lg:h-9 bg-white/5 group-hover:bg-amber-400 rounded-full flex items-center justify-center text-gray-400 group-hover:text-black transition-all border border-white/10">
                <FaSignInAlt size={14} />
              </div>
              <span className="text-xs lg:text-sm font-bold tracking-tight">Sign in or Register</span>
            </div>

            <div className="hidden md:block h-5 w-[1px] bg-white/20" />

            <button 
              onClick={() => setShowGoogleModal(true)} 
              className="flex items-center gap-2 group text-gray-500 hover:text-white transition-all"
            >
              <FaGoogle className="text-orange-500 text-sm lg:text-base group-hover:scale-110 transition-transform" />
              <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-[2px]">Continue with Google</span>
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative lg:absolute right-0 top-0 w-full lg:w-[55%] h-[250px] lg:h-full z-10 order-1 lg:order-2">
          <img src={SectionImage} alt="Travel" className="w-full h-full object-cover" 
            style={{ clipPath: window.innerWidth > 1024 ? 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%, 10% 85%, 4% 75%, 12% 65%, 6% 50%, 14% 40%, 8% 25%, 16% 15%)' : 'none' }} />
        </div>
      </div>

       {/* MODAL 1: Email Form Only */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121418] border border-white/10 p-8 rounded-[35px] max-w-md w-full relative animate-in zoom-in duration-300 shadow-2xl">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white">✕</button>
            <h2 className="text-white text-3xl font-black mb-2">{isRegister ? "Create Account" : "Welcome Back"}</h2>
            <p className="text-gray-400 mb-8 text-sm italic">{isRegister ? "Join us today" : "Sign in to your account"}</p>
            
            <div className="space-y-4">
              {isRegister && <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-amber-400 transition-all" />}
              <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-amber-400 transition-all" />
              <input type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-amber-400 transition-all" />
              <button className="w-full bg-amber-400 text-black font-black py-4 rounded-xl hover:bg-white transition-all shadow-lg active:scale-95">
                {isRegister ? "Register Now" : "Sign In"}
              </button>
            </div>

            <p className="text-gray-400 mt-6 text-sm text-center">
              {isRegister ? "Already have an account?" : "Don't have an account?"} 
              <span className="text-amber-400 cursor-pointer ml-2 hover:underline font-bold" onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "Sign In" : "Register Here"}
              </span>
            </p>
          </div>
        </div>
      )}
      
      {/* MODAL 2: Google Only */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121418] border border-white/10 p-10 rounded-[35px] max-w-sm w-full relative animate-in zoom-in duration-300 shadow-2xl text-center">
            <button onClick={() => setShowGoogleModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white text-xl">✕</button>
            
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-inner">
                <FaGoogle className="text-orange-500 text-3xl" />
              </div>
            </div>
            
            <h2 className="text-white text-2xl font-black mb-2 tracking-tight">Google Sign In</h2>
            <p className="text-gray-400 mb-8 text-sm italic">Access your account instantly</p>
            
            <button 
              onClick={handleGoogleLogin} 
              className="w-full bg-white text-black font-black py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-amber-400 transition-all shadow-xl active:scale-95"
            >
              <FaGoogle /> Continue with Google
            </button>

            <p className="text-gray-600 text-[10px] mt-8 uppercase tracking-widest font-bold">Secure Verification</p>
          </div>
        </div>
      )}
      <style>{`.scrollbar-thin::-webkit-scrollbar { width: 4px; } .scrollbar-thin::-webkit-scrollbar-thumb { background: #fbbf24; border-radius: 10px; }`}</style>
    </section>
  );
};

export default Hero;