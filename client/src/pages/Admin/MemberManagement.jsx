import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdPeople, MdEmail, MdCalendarToday, MdOutlineVerifiedUser, MdDeleteOutline } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';

const BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://travalia.sourovdev.space/";

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

// MemberManagement.jsx
useEffect(() => {
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/members/members-list`); 
      setMembers(response.data);
    } catch (err) {
      console.error("Error fetching members:", err);
      toast.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  fetchMembers();
}, []); // এখানে অতিরিক্ত ); ছিল যা মুছে দেওয়া হয়েছে

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <Toaster />
      
      {/* হেডার সেকশন */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3 italic uppercase tracking-tighter">
            <MdPeople className="text-orange-500" /> App Member List
          </h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1 opacity-70">
            Database Table: app_members
          </p>
        </div>
        <div className="bg-slate-900 px-8 py-4 rounded-[25px] shadow-lg border-b-4 border-orange-500">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Users</p>
           <p className="text-2xl font-black text-white">{members.length}</p>
        </div>
      </div>

      {/* মেম্বার টেবিল কার্ড */}
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em]">ID</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em]">Member Info</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em]">Auth Method</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em]">Joined Date</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="p-20 text-center font-bold text-slate-400 animate-pulse">Accessing app_members table...</td></tr>
              ) : members.map((member) => (
                <tr key={member.member_id} className="hover:bg-orange-50/30 transition-all duration-300 group">
                  <td className="px-8 py-6">
                    <span className="font-black text-slate-300 group-hover:text-orange-500 transition-colors">
                      #{member.member_id}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 group-hover:bg-orange-500 group-hover:text-white rounded-2xl flex items-center justify-center font-black text-lg transition-all shadow-sm">
                        {(member.full_name || "U").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 text-base">{member.full_name}</p>
                        <p className="text-slate-400 text-xs font-bold flex items-center gap-1">
                          <MdEmail className="text-orange-400" size={14}/> {member.email_address}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                      member.auth_provider === 'google' 
                      ? 'bg-blue-50 text-blue-600 border-blue-100' 
                      : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    }`}>
                      {member.auth_provider || 'Email'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-slate-600 text-sm font-bold flex items-center gap-2">
                      <MdCalendarToday className="text-slate-300" />
                      {new Date(member.joined_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <button className="bg-red-50 text-red-500 p-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                       <MdDeleteOutline size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberManagement;