import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdTrendingUp, MdOutlineDateRange, MdPeopleOutline, MdAttachMoney } from 'react-icons/md';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPackages: 0,
    activeBookings: 158,
    totalUsers: 1240,
    totalRevenue: 45200
  });
  const [loading, setLoading] = useState(true);

  const [adminData, setAdminData] = useState({
    name: 'Admin',
    email: '',
    role: 'Super Admin',
    image: null 
  });

  const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://api.yourdomain.com';

  useEffect(() => {
    // ১. ইউজার ডাটা লোড করা
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAdminData({
          name: user?.name || 'Admin User',
          email: user?.email || '',
          role: user?.role || 'Super Admin',
          image: user?.image || null 
        });
      } catch (e) {
        console.error("User parsing error", e);
      }
    }

    // ২. ড্যাশবোর্ড ডাটা ফেচ করা
    const fetchDashboardData = async () => {
      try {
        const packageRes = await axios.get(`${API_BASE}/api/packages`);
        if (packageRes.data) {
          setStats(prev => ({
            ...prev,
            totalPackages: Array.isArray(packageRes.data) ? packageRes.data.length : 0
          }));
        }
      } catch (error) {
        console.error("Dashboard API error:", error);
      } finally {
        // এই লাইনটি নিশ্চিত করবে যে ডাটা আসুক বা না আসুক, স্ক্রিন থেকে লোডিং চলে যাবে
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [API_BASE]);

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans w-full">
      <div className="flex-1 p-4 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1 font-medium">
              Hello {adminData.name.split(' ')[0]}, welcome back to your travel empire.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-full shadow-sm border border-slate-100">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-inner border-2 border-slate-50 bg-slate-100">
            <img 
  // যদি পাথ এর শুরুতে / না থাকে তবে একটি / যোগ করে নিন
  src={adminData.image 
    ? `${API_BASE}${adminData.image.startsWith('/') ? '' : '/'}${adminData.image}` 
    : `https://ui-avatars.com/api/?name=${adminData.name}&background=f97316&color=fff`
  } 
  className="w-full h-full object-cover" 
  alt="Admin Profile" 
  // এরর হ্যান্ডলিং যাতে ইমেজ না পেলে সাদা না দেখায়
  onError={(e) => { 
    e.target.onerror = null; 
    e.target.src = `https://ui-avatars.com/api/?name=${adminData.name}&background=f97316&color=fff`; 
  }}
/>
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 leading-none">{adminData.name}</p>
              <p className="text-[10px] text-orange-500 font-bold uppercase tracking-wider mt-1">{adminData.role}</p>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Packages" value={loading ? "..." : stats.totalPackages} icon={<MdTrendingUp />} color="from-blue-500 to-blue-600" />
          <StatCard title="Active Bookings" value={loading ? "..." : stats.activeBookings} icon={<MdOutlineDateRange />} color="from-emerald-500 to-emerald-600" />
          <StatCard title="Total Users" value={loading ? "..." : stats.totalUsers.toLocaleString()} icon={<MdPeopleOutline />} color="from-violet-500 to-violet-600" />
          <StatCard title="Total Revenue" value={loading ? "..." : `$${stats.totalRevenue.toLocaleString()}`} icon={<MdAttachMoney />} color="from-orange-500 to-orange-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[32px] shadow-xl shadow-slate-200/50 p-8 border border-white">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-slate-900">Recent Booking Requests</h3>
              <button className="text-xs font-bold text-orange-500 hover:underline transition-all">View All</button>
            </div>
            <div className="text-center py-20 border-2 border-dashed border-slate-50 rounded-3xl bg-slate-50/50">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-2xl">✨</div>
                <p className="text-slate-400 font-medium">No pending requests. You're all caught up!</p>
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl">
             <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">System Health</h3>
                <p className="text-slate-400 text-sm mb-6">Server status is optimal.</p>
                <div className="space-y-4">
                    <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                      <p className="text-xs text-slate-500 font-bold uppercase mb-1">Database</p>
                      <div className="flex justify-between items-center">
                         <span className="text-sm font-bold">99.9% Up</span>
                         <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-800">
                      <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Logged in as:</p>
                      <p className="text-xs text-slate-300 truncate font-mono">{adminData.email || 'N/A'}</p>
                    </div>
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-[32px] shadow-xl shadow-slate-200/40 flex items-center gap-4 border border-white hover:translate-y-[-5px] transition-all duration-300">
    <div className={`bg-gradient-to-br ${color} text-white w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{title}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

export default Dashboard;