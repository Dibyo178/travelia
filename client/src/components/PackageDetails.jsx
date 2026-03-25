import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdLocationOn, MdAccessTime, MdDoneAll } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast'; // Toaster Import

const BASE_URL = "http://localhost:5000";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    travel_date: '',
    guests: 1
  });

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/packages/${id}`);
        setPackageData(res.data);
      } catch (err) {
        toast.error("Failed to load package details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPackageDetails();
    window.scrollTo(0, 0);
  }, [id]);

const handleBooking = async (e) => {
  e.preventDefault();
  
  // pathanor age check korun 'id' koto asche
  console.log("Sending Package ID:", id); 

  const bookingData = {
    package_id: id, // eiti nishchit korun jate database-er sathe match hoy
    user_name: formData.customer_name,
    user_email: formData.customer_email
  };

  const loadingToast = toast.loading('Sending Request...');

  try {
    const res = await axios.post(`http://localhost:5000/api/bookings/add`, bookingData);
    if (res.status === 201) {
      toast.success("Success! Booking request received.", { id: loadingToast });
      setFormData({ customer_name: '', customer_email: '', travel_date: '', guests: 1 });
      setTimeout(() => navigate('/'), 2000);
    }
  } catch (err) {
    // Error message arektu detail-e dekhabe
    const errorMsg = err.response?.data?.error || "Booking failed. Please check package ID.";
    toast.error(errorMsg, { id: loadingToast });
  }
};

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Package Info */}
        <div className="space-y-6">
          <div className="relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
            <img src={`${BASE_URL}${packageData.image}`} className="w-full h-full object-cover" alt={packageData.title} />
            <div className="absolute top-6 left-6 bg-white/95 px-5 py-2 rounded-2xl font-black text-orange-600 shadow-xl">
              ${packageData.price} <span className="text-[10px] text-slate-400">/ Person</span>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <h1 className="text-4xl font-black text-slate-900 leading-tight">{packageData.title}</h1>
            <div className="flex gap-4 text-xs font-black text-slate-500 uppercase">
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                <MdLocationOn className="text-orange-500" /> {packageData.location}
              </span>
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                <MdAccessTime className="text-orange-500" /> {packageData.days} Days
              </span>
            </div>
          </div>
        </div>

        {/* Right: Modern Booking Form */}
        <div className="bg-white p-10 rounded-[50px] shadow-2xl border border-slate-100 sticky top-24">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-8">
             <MdDoneAll className="text-green-500" /> Book This Trip
          </h2>
          <form onSubmit={handleBooking} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2">Full Name</label>
              <input 
                type="text" 
                placeholder="Ex: Sourov Purkayastha"
                className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all font-bold"
                value={formData.customer_name}
                onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2">Email Address</label>
              <input 
                type="email" 
                placeholder="example@mail.com"
                className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all font-bold"
                value={formData.customer_email}
                onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2">Departure</label>
                <input type="date" className="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-orange-500" value={formData.travel_date} onChange={(e) => setFormData({...formData, travel_date: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2">Guests</label>
                <input type="number" min="1" className="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-orange-500" value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} />
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl uppercase tracking-widest hover:bg-orange-500 transition-all duration-300 shadow-xl mt-4 active:scale-95">
              Send Booking Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;