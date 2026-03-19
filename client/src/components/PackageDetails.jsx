import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdLocationOn, MdAccessTime, MdPeople, MdDoneAll } from 'react-icons/md';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    travel_date: '',
    guests: 1
  });

  useEffect(() => {
    // ডামি ডাটা লোড করা হচ্ছে
    setPackageData({
      id: id,
      name: "Exclusive Tour Package",
      price: "750",
      location: "Paris, France",
      days: "5 Days - 4 Nights",
      img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
    });
    // স্ক্রল টপে নেওয়ার জন্য
    window.scrollTo(0, 0);
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      // এখানে আপনার API কল হবে
      console.log("Booking Data:", { ...formData, package_id: id });
      
      alert(`ধন্যবাদ ${formData.customer_name}! আপনার বুকিং রিকোয়েস্ট সফল হয়েছে।`);
      navigate('/'); 
    } catch (err) {
      alert("বুকিং করতে সমস্যা হয়েছে।");
    }
  };

  if (!packageData) return <div className="text-center py-20 font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Package Info */}
        <div className="space-y-6">
          <div className="relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl">
            <img src={packageData.img} className="w-full h-full object-cover" alt={packageData.name} />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl font-black text-orange-600 shadow-sm">
              ${packageData.price} <span className="text-[10px] text-slate-400">/ Person</span>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <h1 className="text-4xl font-black text-slate-900 leading-tight">{packageData.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-500">
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 italic">
                <MdLocationOn className="text-orange-500" /> {packageData.location}
              </span>
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 italic">
                <MdAccessTime className="text-orange-500" /> {packageData.days}
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              Join us for an unforgettable experience exploring the most beautiful destinations. 
              Everything from accommodation to local guides is included in this premium package.
            </p>
          </div>
        </div>

        {/* Right Side: Booking Form */}
        <div className="bg-white p-8 lg:p-12 rounded-[40px] shadow-2xl border border-slate-100 sticky top-24">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <MdDoneAll className="text-green-500" /> Book This Trip
            </h2>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">Fill the form to confirm</p>
          </div>

          <form onSubmit={handleBooking} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase ml-2">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all font-semibold"
                value={formData.customer_name}
                onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase ml-2">Email Address</label>
              <input 
                type="email" 
                placeholder="example@mail.com"
                className="w-full p-4 bg-slate-50 rounded-2xl border border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all font-semibold"
                value={formData.customer_email}
                onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase ml-2">Travel Date</label>
                <input 
                  type="date" 
                  className="w-full p-4 bg-slate-100 rounded-2xl outline-none font-semibold text-slate-600 border border-transparent focus:border-orange-500"
                  onChange={(e) => setFormData({...formData, travel_date: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase ml-2">Guests</label>
                <div className="relative">
                  <input 
                    type="number" 
                    min="1"
                    value={formData.guests}
                    className="w-full p-4 bg-slate-100 rounded-2xl outline-none font-semibold"
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  />
                  <MdPeople className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl uppercase tracking-widest hover:bg-orange-500 shadow-xl hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-1 mt-4">
              Send Booking Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;