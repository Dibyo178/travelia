import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCamera, FaTrashAlt, FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
// Toaster Import
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [tempPhoto, setTempPhoto] = useState(null);
  const [formData, setFormData] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    address: 'Sylhet, Bangladesh',
    phone: '+880 1XXX-XXXXXX',
    bio: 'Travel enthusiast & Explorer'
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setFormData(prev => ({ ...prev, ...userData }));
      if (userData.photo) setTempPhoto(userData.photo);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempPhoto(reader.result);
        toast.success('Photo uploaded!', {
          style: { borderRadius: '10px', background: '#121418', color: '#fff', border: '1px solid #fbbf24' }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = { ...formData, photo: tempPhoto };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    
    // Success Toast
    toast.success('Profile Updated Successfully!', {
      duration: 3000,
      position: 'top-center',
      style: {
        borderRadius: '15px',
        background: '#121418',
        color: '#fbbf24',
        border: '1px solid rgba(251, 191, 36, 0.2)',
        padding: '16px',
        fontSize: '14px',
        fontWeight: 'bold'
      },
      iconTheme: { primary: '#fbbf24', secondary: '#000' }
    });
  };

  const handleDeleteDetails = () => {
    toast((t) => (
      <span className="flex flex-col gap-3">
        <b className="text-white">Are you sure you want to clear?</b>
        <div className="flex gap-2">
          <button 
            className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold"
            onClick={() => {
              setFormData({ name: 'Guest User', email: 'guest@example.com', address: '', phone: '', bio: '' });
              setTempPhoto(null);
              localStorage.removeItem('user');
              toast.dismiss(t.id);
              toast.error('Details Cleared');
            }}
          >
            Yes, Delete
          </button>
          <button className="bg-white/10 text-white px-3 py-1 rounded-lg text-xs" onClick={() => toast.dismiss(t.id)}>
            Cancel
          </button>
        </div>
      </span>
    ), { duration: 5000, style: { background: '#121418', border: '1px solid #ef4444' } });
  };

  return (
    <div className="min-h-screen bg-[#0b0d10] text-white font-sans selection:bg-amber-400 selection:text-black">
      {/* Toaster Component - এটি অবশ্যই রিটার্নের ভেতরে থাকতে হবে */}
      <Toaster />

      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }}></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 lg:py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-10">
          <div>
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-amber-500 mb-4 hover:gap-3 transition-all font-bold text-sm uppercase tracking-widest">
              <FaArrowLeft /> Back to Home
            </button>
            <h1 className="text-5xl lg:text-6xl font-black italic tracking-tighter uppercase">
              User <span className="text-amber-400 text-outline">Profile</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="px-8 py-4 bg-amber-400 text-black font-black rounded-2xl hover:bg-white transition-all shadow-xl uppercase text-xs tracking-widest">
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleSave} className="p-4 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-all shadow-lg">
                  <FaSave size={20} />
                </button>
                <button onClick={() => setIsEditing(false)} className="p-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all">
                  <FaTimes size={20} />
                </button>
              </div>
            )}
            <button onClick={handleDeleteDetails} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20">
              <FaTrashAlt size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="bg-[#121418] border border-white/10 p-10 rounded-[40px] text-center sticky top-10 shadow-2xl">
              <div className="relative inline-block mb-6">
                <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-amber-400/30 p-2">
                  {tempPhoto ? (
                    <img src={tempPhoto} alt="Profile" className="w-full h-full object-cover rounded-full shadow-inner" />
                  ) : (
                    <div className="w-full h-full bg-white/5 rounded-full flex items-center justify-center">
                      <FaUser size={60} className="text-gray-700" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-2 right-2 w-12 h-12 bg-amber-400 text-black rounded-full flex items-center justify-center border-4 border-[#121418] hover:scale-110 transition-transform shadow-xl"
                  >
                    <FaCamera size={18} />
                  </button>
                )}
                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">{formData.name}</h2>
              <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-6">{formData.bio}</p>
              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 text-gray-400 text-sm justify-center">
                  <FaEnvelope className="text-amber-400/50" /> {formData.email}
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm justify-center">
                  <FaMapMarkerAlt className="text-amber-400/50" /> {formData.address || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#121418] border border-white/10 p-8 lg:p-12 rounded-[40px] shadow-2xl">
              <h3 className="text-white text-xl font-black mb-8 italic uppercase tracking-wider border-l-4 border-amber-400 pl-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[2px]">Full Name</label>
                  <input type="text" value={formData.name} disabled={!isEditing} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-400 disabled:opacity-50 transition-all font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[2px]">Email Address</label>
                  <input type="email" value={formData.email} disabled={!isEditing} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-400 disabled:opacity-50 transition-all font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[2px]">Phone Number</label>
                  <input type="text" value={formData.phone} disabled={!isEditing} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-400 disabled:opacity-50 transition-all font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[2px]">Location</label>
                  <input type="text" value={formData.address} disabled={!isEditing} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-400 disabled:opacity-50 transition-all font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[2px]">Headline / Bio</label>
                  <textarea rows="3" value={formData.bio} disabled={!isEditing} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-amber-400 disabled:opacity-50 transition-all font-bold resize-none"></textarea>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[{ label: 'Tours', val: '12' }, { label: 'Cities', val: '45' }, { label: 'Reviews', val: '08' }].map((stat, i) => (
                <div key={i} className="bg-amber-400 p-6 rounded-[30px] text-center shadow-lg transform hover:-translate-y-1 transition-all">
                  <p className="text-black text-3xl font-black italic tracking-tighter leading-none">{stat.val}</p>
                  <p className="text-black/60 text-[10px] font-black uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`.text-outline { -webkit-text-stroke: 1px #fbbf24; color: transparent; }`}</style>
    </div>
  );
};

export default Profile;