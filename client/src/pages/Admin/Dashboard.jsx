import React from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar';
// এখানে MdPeopleOutline এর স্পেসটি সরিয়ে দেওয়া হয়েছে
import { MdTrendingUp, MdOutlineDateRange, MdPeopleOutline, MdAttachMoney } from 'react-icons/md';

const Dashboard = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Executive Dashboard</h1>
            <p className="text-slate-500 mt-1 font-medium">Hello Sourov, welcome back to your travel empire.</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-full shadow-sm border border-slate-100">
            <img 
              src="https://ui-avatars.com/api/?name=Sourov&background=f97316&color=fff" 
              className="w-10 h-10 rounded-full shadow-inner" 
              alt="Admin" 
            />
            <div>
              <p className="text-xs font-black text-slate-900 leading-none">Sourov Ahmed</p>
              <p className="text-[10px] text-orange-500 font-bold uppercase tracking-wider">Super Admin</p>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatCard title="Total Packages" value="24" icon={<MdTrendingUp />} color="from-blue-500 to-blue-600" />
          <StatCard title="Active Bookings" value="158" icon={<MdOutlineDateRange />} color="from-emerald-500 to-emerald-600" />
          <StatCard title="Total Users" value="1,240" icon={<MdPeopleOutline />} color="from-violet-500 to-violet-600" />
          <StatCard title="Total Revenue" value="$45,200" icon={<MdAttachMoney />} color="from-orange-500 to-orange-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[32px] shadow-xl shadow-slate-200/50 p-8 border border-white">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-slate-900">Recent Booking Requests</h3>
              <button className="text-xs font-bold text-orange-500 hover:underline">View All</button>
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
                   <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                      <p className="text-xs text-slate-500 font-bold uppercase mb-1">Database</p>
                      <div className="flex justify-between items-center">
                         <span className="text-sm font-bold">99.9% Up</span>
                         <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      </div>
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
  <div className="bg-white p-7 rounded-[32px] shadow-xl shadow-slate-200/60 flex items-center gap-6 border border-white hover:translate-y-[-5px] transition-all duration-300">
    <div className={`bg-gradient-to-br ${color} text-white w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest mb-1">{title}</p>
      <p className="text-3xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

export default Dashboard;