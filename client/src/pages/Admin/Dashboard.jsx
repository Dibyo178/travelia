import React from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar';

const Dashboard = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 lg:p-12">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500">Welcome back, Admin! Here is what's happening today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-bold text-slate-900">Sourov Ahmed</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
            <img 
              src="https://ui-avatars.com/api/?name=Admin&background=f97316&color=fff" 
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
              alt="Admin"
            />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Packages" value="24" icon="🌍" color="bg-blue-500" />
          <StatCard title="Active Bookings" value="158" icon="📅" color="bg-green-500" />
          <StatCard title="Total Users" value="1,240" icon="👥" color="bg-purple-500" />
          <StatCard title="Total Revenue" value="$45,200" icon="💰" color="bg-orange-500" />
        </div>

        {/* Recent Activity / Table Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Booking Requests</h3>
          <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-xl">
            <p className="text-slate-400">No recent bookings to display. All caught up!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple StatCard Component (Internal)
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-5 border border-slate-100">
    <div className={`${color} text-white w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

export default Dashboard;