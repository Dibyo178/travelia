import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdAdd, MdDelete, MdEdit, MdClose, MdCloudUpload } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentBlogId, setCurrentBlogId] = useState(null);
    const [formData, setFormData] = useState({ title: '', content: '', image: '' });
    const [imageFile, setImageFile] = useState(null);

const API_BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://travalia.sourovdev.space/";

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/blogs`);
            setBlogs(res.data);
        } catch (err) {
            // কনসোল এরর (ERR_CONNECTION_REFUSED) সমাধান করতে নিশ্চিত করুন আপনার নোড সার্ভার রান করছে।
            console.error("Backend server not reached", err);
        }
    };

    const handleEdit = (blog) => {
        setIsEditMode(true);
        setCurrentBlogId(blog.id);
        setFormData({ 
            title: blog.title, 
            content: blog.content, 
            image: blog.image 
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            const deleteToast = toast.loading("Deleting...");
            try {
                await axios.delete(`${API_BASE_URL}/api/blogs/delete/${id}`);
                toast.success("Deleted!", { id: deleteToast });
                fetchBlogs();
            } catch (err) {
                toast.error("Failed!", { id: deleteToast });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        if (imageFile) data.append('image', imageFile);

        const t = toast.loading(isEditMode ? "Updating..." : "Publishing...");
        try {
            if (isEditMode) {
                await axios.put(`${API_BASE_URL}/api/blogs/update/${currentBlogId}`, data);
            } else {
                await axios.post(`${API_BASE_URL}/api/blogs/add`, data);
            }
            toast.success("Success!", { id: t });
            closeModal();
            fetchBlogs();
        } catch (err) {
            toast.error("Operation failed!", { id: t });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setFormData({ title: '', content: '', image: '' });
        setImageFile(null);
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <Toaster position="top-right" />
            
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 italic">Blog Admin</h1>
                    <p className="text-slate-500 mt-1 font-medium">Manage your {blogs.length} stories</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg">
                    <MdAdd className="text-xl" /> New Story
                </button>
            </div>

            {/* Table UI */}
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Image</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Blog Title</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {blogs.map((blog) => (
                            <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <img src={`${API_BASE_URL}/Uploads/Blog/${blog.image}`} alt="" className="w-14 h-10 object-cover rounded-lg bg-slate-100" />
                                </td>
                                <td className="px-6 py-4 font-bold text-slate-700">{blog.title}</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center gap-1">
                                        <button onClick={() => handleEdit(blog)} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-xl"><MdEdit className="text-xl" /></button>
                                        <button onClick={() => handleDelete(blog.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl"><MdDelete className="text-xl" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal - Fixed Viewport Issue */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in duration-300">
                        
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-slate-50">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{isEditMode ? "Update Story" : "Add New Story"}</h2>
                            <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><MdClose className="text-2xl text-slate-400" /></button>
                        </div>

                        {/* Modal Body - Scrollable content */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Title</label>
                                    <input type="text" placeholder="Something catchy..." required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-700" />
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Blog Image</label>
                                    <div className="relative w-full h-32 bg-slate-50 rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group hover:border-indigo-400 transition-all cursor-pointer">
                                        {imageFile ? (
                                            <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-full object-cover" />
                                        ) : formData.image ? (
                                            <img src={`${API_BASE_URL}/Uploads/Blog/${formData.image}`} alt="Existing" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center">
                                                <MdCloudUpload className="text-3xl text-indigo-300 mx-auto mb-1" />
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Image</span>
                                            </div>
                                        )}
                                        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Content</label>
                                    <textarea rows="4" placeholder="Write your magic..." required value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-600 resize-none font-medium leading-relaxed"></textarea>
                                </div>

                                <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-[20px] font-black text-lg hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95">
                                    {isEditMode ? "Save Changes" : "Publish Now"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBlogs;