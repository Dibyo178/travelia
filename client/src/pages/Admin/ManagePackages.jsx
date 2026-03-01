import React, { useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/Admin/AdminSidebar';

const ManagePackages = () => {
  const [formData, setFormData] = useState({
    title: '', price: '', location: '', duration: '', image_url: '', description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // আপনার ব্যাকএন্ড পোর্ট যদি ৫০৫১ বা ৫০০০ হয় সেই অনুযায়ী URL দিন
      await axios.post('http://localhost:5000/api/packages/add', formData);
      alert("🎉 Package successfully added to Database!");
    } catch (err) {
      console.error(err);
      alert("Failed to add package. Check server connection.");
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-black text-slate-900 mb-8">Add New Travel Package</h2>
        
        <form onSubmit={handleSubmit} className="max-w-4xl bg-white p-8 rounded-2xl shadow-sm border border-slate-100 grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-slate-700">Package Title</label>
            <input type="text" placeholder="e.g. Bali Summer Trip" className="border p-3 rounded-lg outline-orange-500" required onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-bold text-slate-700">Price ($)</label>
            <input type="number" placeholder="499" className="border p-3 rounded-lg outline-orange-500" required onChange={(e) => setFormData({...formData, price: e.target.value})} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-slate-700">Location</label>
            <input type="text" placeholder="Indonesia" className="border p-3 rounded-lg outline-orange-500" required onChange={(e) => setFormData({...formData, location: e.target.value})} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-slate-700">Duration</label>
            <input type="text" placeholder="5 Days / 4 Nights" className="border p-3 rounded-lg outline-orange-500" required onChange={(e) => setFormData({...formData, duration: e.target.value})} />
          </div>

          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-bold text-slate-700">Image URL</label>
            <input type="text" placeholder="https://unsplash.com/photo..." className="border p-3 rounded-lg outline-orange-500" required onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
          </div>

          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-bold text-slate-700">Description</label>
            <textarea rows="4" placeholder="Describe the journey..." className="border p-3 rounded-lg outline-orange-500" required onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
          </div>

          <button type="submit" className="col-span-2 bg-orange-500 text-white font-bold py-4 rounded-xl hover:bg-slate-900 transition duration-300 shadow-lg shadow-orange-500/20">
            Publish Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagePackages;