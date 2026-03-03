import React, { useState } from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import { MdOutlineAdd, MdOutlineEdit, MdOutlineDeleteSweep, MdPeopleOutline } from 'react-icons/md';

const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Sourov Ahmed", email: "sourov@travelia.com", role: "Admin", status: "Active" },
    { id: 2, name: "John Doe", email: "john@example.com", role: "User", status: "Active" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', email: '', role: 'User' });

  // Delete User
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // Open Modal for Add/Edit
  const openModal = (user = { id: null, name: '', email: '', role: 'User' }) => {
    setCurrentUser(user);
    setIsEditing(!!user.id);
    setShowModal(true);
  };

  // Handle Add/Edit Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setUsers(users.map(u => u.id === currentUser.id ? currentUser : u));
    } else {
      setUsers([...users, { ...currentUser, id: Date.now(), status: 'Active' }]);
    }
    setShowModal(false);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <AdminSidebar />
      <div className="flex-1 p-8 lg:p-12">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">User Directory</h1>
            <p className="text-slate-500 font-medium">Manage your community and team members.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-200 hover:bg-slate-900 transition-all active:scale-95"
          >
            <MdOutlineAdd className="text-xl" /> Add New User
          </button>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-white overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400">User Details</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400">Role</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                        <MdPeopleOutline size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-600">{user.role}</td>
                  <td className="px-8 py-6">
                    <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase">Active</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openModal(user)} className="p-2 text-slate-400 hover:text-orange-500 transition-colors"><MdOutlineEdit size={20}/></button>
                      <button onClick={() => handleDelete(user.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><MdOutlineDeleteSweep size={22}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal (Add/Edit) */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 duration-200">
              <h3 className="text-2xl font-black text-slate-900 mb-6">{isEditing ? 'Update User' : 'Register New User'}</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Full Name</label>
                  <input 
                    required 
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-orange-500" 
                    value={currentUser.name}
                    onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Email Address</label>
                  <input 
                    required type="email"
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-orange-500" 
                    value={currentUser.email}
                    onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Role</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-orange-500"
                    value={currentUser.role}
                    onChange={(e) => setCurrentUser({...currentUser, role: e.target.value})}
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
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