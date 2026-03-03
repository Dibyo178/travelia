import React, { useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import { MdCloudUpload, MdCheckCircle } from 'react-icons/md';

const ManagePackages = () => {
  const [formData, setFormData] = useState({
    title: '', price: '', location: '', duration: '', description: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // FormData তৈরি করা হচ্ছে ফাইল পাঠানোর জন্য
    const data = new FormData();
    data.append('title', formData.title);
    data.append('price', formData.price);
    data.append('location', formData.location);
    data.append('duration', formData.duration);
    data.append('description', formData.description);
    data.append('image', image); // ফাইলটি এখানে যোগ করা হচ্ছে

    try {
      await axios.post('http://localhost:5000/api/packages/add', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("🎉 Package and Image successfully uploaded!");
      // ফর্ম ক্লিয়ার করার লজিক এখানে দিতে পারেন
    } catch (err) {
      console.error(err);
      alert("Error uploading package. Check server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Create Package</h2>
            <p className="text-slate-500 font-medium">Upload new destination with high-quality assets.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-12 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* --- ইমেজ আপলোড সেকশন --- */}
              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">Package Cover Image</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <div className="border-2 border-dashed border-slate-200 bg-slate-50 p-10 rounded-[30px] flex flex-col items-center justify-center transition-all group-hover:border-orange-400 group-hover:bg-orange-50/30">
                    {image ? (
                      <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
                        <MdCheckCircle className="text-4xl text-emerald-500 mb-2" />
                        <p className="text-sm font-bold text-slate-700">{image.name}</p>
                        <p className="text-[10px] text-slate-400">Click or drag to change</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 mb-4 group-hover:scale-110 transition-transform">
                          <MdCloudUpload className="text-3xl" />
                        </div>
                        <p className="text-sm font-bold text-slate-700">Drop your image here</p>
                        <p className="text-xs text-slate-400 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* --- অন্যান্য ইনপুটস --- */}
              <CustomInput label="Package Title" placeholder="e.g. Majestic Maldives Suite" onChange={(val) => setFormData({...formData, title: val})} />
              <CustomInput label="Base Price ($)" type="number" placeholder="1200" onChange={(val) => setFormData({...formData, price: val})} />
              <CustomInput label="Location" placeholder="Male, Maldives" onChange={(val) => setFormData({...formData, location: val})} />
              <CustomInput label="Trip Duration" placeholder="7 Days / 6 Nights" onChange={(val) => setFormData({...formData, duration: val})} />

              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">Journey Description</label>
                <textarea 
                  rows="5" 
                  className="w-full bg-slate-50 border border-slate-100 p-5 rounded-3xl outline-none focus:border-orange-500 focus:bg-white transition-all text-sm leading-relaxed" 
                  placeholder="Tell them about the adventure..." 
                  required
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`mt-10 w-full md:w-auto px-16 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 shadow-xl shadow-slate-200 
                ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-orange-500 hover:shadow-orange-200'}`}
            >
              {loading ? "Publishing..." : "Publish to Website"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Custom Input Component
const CustomInput = ({ label, type = "text", placeholder, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-sm font-semibold"
      required 
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default ManagePackages;