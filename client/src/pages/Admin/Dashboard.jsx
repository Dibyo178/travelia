import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  MdTrendingUp, MdOutlineDateRange, MdPeopleOutline, MdAttachMoney, 
} from 'react-icons/md';



const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPackages: 0,
    activeBookings: 0,
    totalMembers: 0,
    totalRevenue: 0,
    areaData: [],
    pieData: []
  });
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState({ name: 'Admin', role: 'Super Admin', image: null });


const API_BASE = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://travalia.sourovdev.space/";

  const PIE_COLORS = ['#6366f1', '#f59e0b', '#10b981'];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAdminData({
          name: user?.full_name || 'Admin User',
          role: user?.role || 'Super Admin',
          image: user?.image || null 
        });
      } catch (e) { console.error(e); }
    }

    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const [packageRes, memberRes, bookingRes] = await Promise.all([
          axios.get(`${API_BASE}/api/packages`),
          axios.get(`${API_BASE}/api/members/members-list`),
          axios.get(`${API_BASE}/api/bookings`)
        ]);

        const totalRev = bookingRes.data.reduce((sum, item) => sum + (Number(item.package_price) || 0), 0);

        // Area Chart Data
        const areaData = bookingRes.data.slice(0, 7).map(item => ({
          name: new Date(item.created_at).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
          revenue: Number(item.package_price) || 0
        })).reverse();

        // Pie Chart Data
        const pieData = [
          { name: 'Packages', value: packageRes.data.length || 0 },
          { name: 'Bookings', value: bookingRes.data.length || 0 },
          { name: 'Members', value: memberRes.data.length || 0 }
        ];

        setStats({
          totalPackages: packageRes.data.length || 0,
          totalMembers: memberRes.data.length || 0,
          activeBookings: bookingRes.data.length || 0,
          totalRevenue: totalRev,
          areaData,
          pieData
        });

      } catch (error) { console.error("Error fetching stats:", error); } finally { setLoading(false); }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans w-full">
      <div className="flex-1 p-4 lg:p-12 overflow-y-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Travlia Control Center</h1>
            <p className="text-slate-500 mt-1 font-bold uppercase text-[10px] tracking-widest opacity-60">Control by admin</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-[20px] shadow-xl shadow-slate-200/50 border border-white">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-orange-500">
              <img 
                src={adminData.image ? `${API_BASE}${adminData.image}` : `https://ui-avatars.com/api/?name=${adminData.name}&background=f97316&color=fff`} 
                className="w-full h-full object-cover" alt="Profile" 
              />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 leading-none">{adminData.name}</p>
              <p className="text-[10px] text-orange-500 font-black uppercase tracking-tighter mt-1">{adminData.role}</p>
            </div>
          </div>
        </header>

        {/* Stats Grid with Original Hover Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatCard title="Total Packages" value={loading ? "..." : stats.totalPackages} icon={<MdTrendingUp />} color="bg-blue-600" />
          <StatCard title="Active Bookings" value={loading ? "..." : stats.activeBookings} icon={<MdOutlineDateRange />} color="bg-emerald-600" />
          <StatCard title="Total Members" value={loading ? "..." : stats.totalMembers} icon={<MdPeopleOutline />} color="bg-violet-600" />
          <StatCard title="Net Revenue" value={loading ? "..." : `$${stats.totalRevenue.toLocaleString()}`} icon={<MdAttachMoney />} color="bg-orange-600" />
        </div>

        {/* Dynamic Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Revenue Flow Chart (Area Chart) */}
          <div className="lg:col-span-2 bg-white rounded-[40px] shadow-2xl shadow-slate-200/60 p-10 border border-white hover:-translate-y-1 transition-all duration-500">
            <h3 className="text-xl font-black text-slate-900 italic uppercase mb-8">Revenue Flow</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.areaData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                  <Tooltip contentStyle={{borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distributions (Pie Chart) */}
          <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/60 p-10 border border-white hover:-translate-y-1 transition-all duration-500">
            <h3 className="text-xl font-black text-slate-900 italic uppercase mb-4">Distributions</h3>
            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats.pieData} innerRadius={65} outerRadius={90} paddingAngle={5} dataKey="value">
                    {stats.pieData.map((entry, index) => <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Sub-components with original hover effect
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-8 rounded-[35px] shadow-2xl shadow-slate-200/50 flex flex-col gap-5 border border-white hover:-translate-y-2 transition-all duration-500 group">
    <div className={`${color} text-white w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:rotate-[15deg] transition-transform`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
      <p className="text-3xl font-black text-slate-900 tracking-tighter">{value}</p>
    </div>
  </div>
);



export default Dashboard;