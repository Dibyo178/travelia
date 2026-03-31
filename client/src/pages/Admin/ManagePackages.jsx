import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { 
  MdEditNote, 
  MdDeleteOutline, 
  MdAddCircleOutline,
  MdClose,
  MdCloudUpload,
  MdChevronLeft,
  MdChevronRight
} from 'react-icons/md';

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [currentPkg, setCurrentPkg] = useState({ 
    id: null, title: '', location: '', price: '', days: '', nights: '', countries: '', image: '', recommended: false 
  });

 
const BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://travalia.sourovdev.space/";

  // SweetAlert Toast Configuration
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
  });

  const fetchPackages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/packages`);
      setPackages(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // ১. Toggle Recommended Function Fixed
  const handleToggleRecommended = async (pkg) => {
    try {
        // এখানে pkg.id ব্যবহার করা হয়েছে
        await axios.put(`${BASE_URL}/api/packages/toggle-recommended/${pkg.id}`);
        Toast.fire({ icon: 'success', title: 'Status updated!' }); // 'toast' এর বদলে 'Toast'
        fetchPackages(); 
    } catch (error) {
        Toast.fire({ icon: 'error', title: 'Failed to update' });
        console.error("Toggle Error:", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0f172a',
      cancelButtonColor: '#f43f5e',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${BASE_URL}/api/packages/delete/${id}`);
          Toast.fire({ icon: 'success', title: 'Deleted successfully!' });
          fetchPackages();
        } catch (error) {
          Toast.fire({ icon: 'error', title: 'Failed to delete' });
        }
      }
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = packages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(packages.length / itemsPerPage);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const openModal = (pkg = null) => {
    if (pkg) {
      setIsEditing(true);
      setCurrentPkg({ 
        ...pkg, 
        oldImage: pkg.image, 
        recommended: pkg.is_recommended === 1 
      });
      setImageFile(null);
      // ইমেজ পাথ চেক
      setImagePreview(pkg.image ? `${BASE_URL}${pkg.image}` : null);
    } else {
      setIsEditing(false);
      setCurrentPkg({ id: null, title: '', location: '', price: '', days: '', nights: '', countries: '', image: '', recommended: false });
      setImageFile(null);
      setImagePreview(null);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', currentPkg.title);
    formData.append('location', currentPkg.location);
    formData.append('price', currentPkg.price);
    formData.append('days', currentPkg.days);
    formData.append('nights', currentPkg.nights);
    formData.append('countries', currentPkg.countries);
    formData.append('is_recommended', currentPkg.recommended ? 1 : 0);
    
    if (imageFile) {
      formData.append('image', imageFile);
      if (isEditing && currentPkg.oldImage) {
        formData.append('oldImage', currentPkg.oldImage);
      }
    }

    try {
      const url = isEditing 
        ? `${BASE_URL}/api/packages/update/${currentPkg.id}` 
        : `${BASE_URL}/api/packages/add`;
      
      await axios({
        method: isEditing ? 'put' : 'post',
        url: url,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      Toast.fire({ icon: 'success', title: isEditing ? 'Updated!' : 'Published!' });
      setIsModalOpen(false);
      fetchPackages();
    } catch (error) {
      Toast.fire({ icon: 'error', title: 'Error saving data' });
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <main className="flex-1 p-6 md:p-10 lg:p-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Manage Packages</h1>
            <p className="text-slate-500 text-sm">Update your tour destinations and details.</p>
          </div>
          <button onClick={() => openModal()} className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-orange-600 transition-all shadow-xl">
            <MdAddCircleOutline className="text-lg" /> Add New Package
          </button>
        </div>

        <div className="bg-white rounded-[40px] shadow-xl border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="px-8 py-6">Package / Image</th>
                <th className="px-8 py-6">Plan (D/N/C)</th>
                <th className="px-8 py-6 text-center">Recommended</th>
                <th className="px-8 py-6 text-center">Actions</th>
                <th className="px-8 py-6 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentItems.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                        <img 
                          src={pkg.image ? `${BASE_URL}${pkg.image}` : 'https://placehold.co/150'} 
                          alt="tour" 
                          className="w-full h-full object-cover" 
                          onError={(e) => { e.target.src = 'https://placehold.co/150'; }}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{pkg.title}</p>
                        <p className="text-[10px] text-orange-600 font-bold uppercase">{pkg.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-[10px] font-black text-slate-500 uppercase">
                      {pkg.days}D / {pkg.nights}N / {pkg.countries}C
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    {/* ২. handleToggleRecommended কল করার সময় pkg অবজেক্ট পাঠানো হয়েছে */}
                    <button 
                      onClick={() => handleToggleRecommended(pkg)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${pkg.is_recommended === 1 ? 'bg-orange-500' : 'bg-slate-200'}`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${pkg.is_recommended === 1 ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                    <span className="block text-[7px] font-black text-slate-400 mt-1 uppercase tracking-tighter">
                      {pkg.is_recommended === 1 ? 'Featured' : 'Standard'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <button onClick={() => openModal(pkg)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><MdEditNote className="text-2xl" /></button>
                    <button onClick={() => handleDelete(pkg.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><MdDeleteOutline className="text-2xl" /></button>
                  </td>
                  <td className="px-8 py-6 text-right font-black text-slate-900">${pkg.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="p-6 bg-slate-50/30 border-t border-slate-100 flex justify-between items-center">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, packages.length)} of {packages.length}
            </p>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-30 transition-all"
              >
                <MdChevronLeft className="text-xl" />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${currentPage === i + 1 ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-900'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-30 transition-all"
              >
                <MdChevronRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center shrink-0">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{isEditing ? 'Edit Package' : 'Create Package'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><MdClose className="text-xl text-slate-400" /></button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto">
                <div className="border-2 border-dashed border-slate-200 rounded-[25px] p-4 text-center bg-slate-50/50">
                  {imagePreview ? (
                    <div className="relative h-28 w-full max-w-[200px] mx-auto">
                      <img 
                        src={imagePreview} 
                        className="h-full w-full object-cover rounded-xl shadow-sm" 
                        alt="preview" 
                        onError={(e) => { e.target.src = 'https://placehold.co/150'; }}
                      />
                      <button type="button" onClick={() => {setImagePreview(null); setImageFile(null);}} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"><MdClose /></button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center py-2">
                      <MdCloudUpload className="text-2xl text-orange-500 mb-1" />
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Upload Image</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <input required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none font-bold text-slate-700 text-sm focus:ring-2 focus:ring-orange-500" value={currentPkg.title} onChange={(e) => setCurrentPkg({...currentPkg, title: e.target.value})} placeholder="Package Title" />
                  </div>
                  <input required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none font-bold text-slate-700 text-sm focus:ring-2 focus:ring-orange-500" value={currentPkg.location} onChange={(e) => setCurrentPkg({...currentPkg, location: e.target.value})} placeholder="Location" />
                  <input required type="number" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none font-bold text-slate-700 text-sm focus:ring-2 focus:ring-orange-500" value={currentPkg.price} onChange={(e) => setCurrentPkg({...currentPkg, price: e.target.value})} placeholder="Price ($)" />
                  
                  <div className="grid grid-cols-3 gap-2 col-span-2">
                    <input type="number" className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none font-bold text-center text-xs" value={currentPkg.days} onChange={(e) => setCurrentPkg({...currentPkg, days: e.target.value})} placeholder="Days" />
                    <input type="number" className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none font-bold text-center text-xs" value={currentPkg.nights} onChange={(e) => setCurrentPkg({...currentPkg, nights: e.target.value})} placeholder="Nights" />
                    <input type="number" className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none font-bold text-center text-xs" value={currentPkg.countries} onChange={(e) => setCurrentPkg({...currentPkg, countries: e.target.value})} placeholder="Countries" />
                  </div>

                  <div className="col-span-2 flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200 mt-2">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Recommended Status</span>
                    <button 
                      type="button"
                      onClick={() => setCurrentPkg({...currentPkg, recommended: !currentPkg.recommended})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${currentPkg.recommended ? 'bg-orange-500' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${currentPkg.recommended ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-black uppercase tracking-[2px] text-[10px] hover:bg-orange-600 shadow-lg transition-all active:scale-95">
                  {isEditing ? 'Save Changes' : 'Publish Package'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManagePackages;