import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { MdOutlineAdd, MdOutlineEdit, MdOutlineDeleteSweep, MdCloudUpload } from 'react-icons/md';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', email: '', role: 'User' });
  const [selectedFile, setSelectedFile] = useState(null);


  const API_BASE = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://travalia.sourovdev.space/";

  const BASE_URL = `${API_BASE}/api/users`;
  const IMAGE_URL = API_BASE; 

  const fetchUsers = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load users!");
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`${BASE_URL}/delete/${id}`);
        toast.success("User deleted successfully!");
        fetchUsers();
      } catch (error) {
        toast.error("Delete failed!");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', currentUser.name);
    formData.append('email', currentUser.email);
    formData.append('role', currentUser.role);
    if (selectedFile) formData.append('image', selectedFile);

    const loadToast = toast.loading(isEditing ? "Updating..." : "Registering...");

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      
      if (isEditing) {
        await axios.put(`${BASE_URL}/update/${currentUser.id}`, formData, config);
        toast.success("User updated successfully! ✨", { id: loadToast });
      } else {
        await axios.post(`${BASE_URL}/add`, formData, config);
        toast.success("User registered successfully! 🎉", { id: loadToast });
      }
      
      setShowModal(false);
      setSelectedFile(null); // রিসেট ফাইল
      fetchUsers();
    } catch (error) {
      toast.error("Action failed. Try again!", { id: loadToast });
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex-1 p-8 lg:p-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">User Directory</h1>
            <p className="text-slate-500 font-medium">Manage team members with real-time updates.</p>
          </div>
          <button 
            onClick={() => {
              setCurrentUser({ id: null, name: '', email: '', role: 'User' });
              setIsEditing(false);
              setSelectedFile(null);
              setShowModal(true);
            }} 
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-slate-900 transition-all active:scale-95"
          >
            <MdOutlineAdd className="text-xl" /> Add New User
          </button>
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-white overflow-hidden">
          {loading ? (
            <div className="p-20 text-center font-bold text-slate-400">Fetching Data...</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400">User Details</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400">Role</th>
                  <th className="px-8 py-6 text-right text-[10px] font-black uppercase text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={user.image ? `${IMAGE_URL}${user.image}` : `https://ui-avatars.com/api/?name=${user.name}`} 
                          className="w-11 h-11 rounded-full object-cover border-2 border-slate-100 shadow-sm" 
                          alt="profile" 
                          onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${user.name}`; }}
                        />
                        <div>
                          <p className="text-sm font-black text-slate-900">{user.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${user.role === 'Admin' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => { setCurrentUser(user); setIsEditing(true); setShowModal(true); }} className="p-2 text-slate-400 hover:text-orange-500 transition-colors"><MdOutlineEdit size={20}/></button>
                        <button onClick={() => handleDelete(user.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><MdOutlineDeleteSweep size={22}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 duration-200">
              <h3 className="text-2xl font-black text-slate-900 mb-6">{isEditing ? 'Update Profile' : 'Register User'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="flex flex-col items-center mb-4">
                  <label className="cursor-pointer group relative">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-slate-200 group-hover:border-orange-500 transition-all">
                      {selectedFile ? (
                        <img src={URL.createObjectURL(selectedFile)} className="w-full h-full object-cover" alt="Preview" />
                      ) : currentUser.image ? (
                        <img src={`${IMAGE_URL}${currentUser.image}`} className="w-full h-full object-cover" alt="Current" />
                      ) : (
                        <MdCloudUpload className="text-slate-300 group-hover:text-orange-500" size={30} />
                      )}
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                  </label>
                  <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Click to Upload Photo</p>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Full Name</label>
                  <input required className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-orange-500" value={currentUser.name} onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Email Address</label>
                  <input required type="email" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-orange-500" value={currentUser.email} onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Role</label>
                  <select className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-orange-500 font-bold" value={currentUser.role} onChange={(e) => setCurrentUser({...currentUser, role: e.target.value})}>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    
                  </select>
                </div>
                
                <div className="flex gap-4 mt-8">
                  <button type="submit" className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-orange-500 transition-all uppercase text-[10px] tracking-widest">
                    {isEditing ? 'Save Changes' : 'Confirm Registration'}
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} className="px-6 font-bold text-slate-400 hover:text-slate-900 text-[10px] uppercase tracking-widest">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;