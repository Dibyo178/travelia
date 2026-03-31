import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarCheck, FaMapMarkerAlt, FaSignOutAlt, FaSuitcase } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://travalia.sourovdev.space/"; 

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchUserBookings = async () => {
      try {
    
        const emailToSearch = user.email || user.email_address; 
        
        if (emailToSearch) {
          const response = await axios.get(`${BASE_URL}/api/bookings/user/${emailToSearch.trim()}`);
          setBookings(response.data);
          console.log("Bookings fetched successfully:", response.data);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        toast.error("Failed to load your travel history");
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0b0d10] text-white p-6 lg:p-20 font-sans">
      <Toaster />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-start">
        

        <div className="w-full md:w-1/3 bg-[#121418] border border-white/5 p-8 rounded-[40px] text-center shadow-2xl sticky top-10">
          <div className="relative inline-block mb-6">
            <div className="w-28 h-28 bg-gradient-to-tr from-amber-400 to-yellow-200 rounded-full flex items-center justify-center text-black text-5xl font-black shadow-lg">
              {(user.name || user.full_name)?.charAt(0).toUpperCase()}
            </div>
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-[#121418] rounded-full"></div>
          </div>
          
          <h2 className="text-2xl font-black mb-1">{user.name || user.full_name}</h2>
          <p className="text-gray-400 text-sm italic mb-6 break-all">{user.email || user.email_address}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
             <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <p className="text-[10px] uppercase text-gray-500 font-bold">Total Trips</p>
                <p className="text-xl font-black text-amber-400">{bookings.length}</p>
             </div>
             <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <p className="text-[10px] uppercase text-gray-500 font-bold">Account</p>
                <p className="text-xl font-black text-green-400">Active</p>
             </div>
          </div>

          <div className="h-[1px] bg-white/10 mb-6" />
          
          <button 
            onClick={handleLogout} 
            className="flex items-center justify-center gap-2 w-full bg-red-500/10 text-red-500 py-4 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-95"
          >
            <FaSignOutAlt /> Logout Account
          </button>
        </div>

      
        <div className="w-full md:w-2/3">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-amber-400 p-2 rounded-lg">
                <FaSuitcase className="text-black text-xl" />
              </div>
              <h3 className="text-2xl font-black tracking-tight uppercase">Booking History</h3>
            </div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
              {bookings.length} Records
            </span>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-[#121418] border border-white/5 rounded-[30px] animate-pulse"></div>
              ))}
            </div>
          ) : bookings.length > 0 ? (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-[#121418] border border-white/5 p-5 rounded-[35px] flex flex-col sm:flex-row justify-between items-center group hover:border-amber-400/40 transition-all shadow-xl hover:shadow-amber-400/5">
                  <div className="flex items-center gap-5 w-full">
                    {/* ডাটাবেস থেকে পাওয়া ছবি */}
                    <div className="w-20 h-20 bg-white/5 rounded-3xl overflow-hidden shrink-0 border border-white/10 group-hover:border-amber-400/30 transition-all">
                       {booking.package_image ? (
                         <img 
                          src={`${BASE_URL}${booking.package_image}`} 
                          alt={booking.package_title} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Tour'; }}
                         />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-amber-400">
                            <FaMapMarkerAlt size={24} />
                         </div>
                       )}
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-bold group-hover:text-amber-400 transition-colors line-clamp-1">{booking.package_title}</h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
                          #TRV-{booking.id}
                        </p>
                        <p className="text-gray-400 text-xs font-medium">
                          📅 {new Date(booking.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                        {booking.guests > 0 && (
                          <p className="text-gray-400 text-xs font-medium italic">
                            👥 {booking.guests} {booking.guests > 1 ? 'Guests' : 'Guest'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-0 flex flex-col items-end gap-3 w-full sm:w-auto">
                    <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      booking.status === 'Confirmed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                      booking.status === 'Pending' ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {booking.status}
                    </span>
                    <p className="text-amber-400 font-black text-lg">
                      {booking.amount > 0 ? `$${booking.amount}` : 'Free'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#121418] border border-dashed border-white/10 p-20 rounded-[40px] text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                 <FaSuitcase className="text-gray-600 text-3xl" />
              </div>
              <p className="text-gray-500 font-bold italic text-lg mb-2">No active bookings found!</p>
              <p className="text-gray-600 text-sm mb-6 max-w-xs mx-auto">Explore our premium tour packages to start your journey.</p>
              <button 
                onClick={() => navigate('/')} 
                className="bg-amber-400 text-black px-8 py-3 rounded-2xl font-black text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-lg shadow-amber-400/20"
              >
                Find Destinations
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;