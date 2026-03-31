import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  MdDashboard, 
  MdCardTravel, 
  MdEventAvailable, 
  MdPeople, 
  MdArrowBack, 
  MdLogout,
  MdArticle, 
  MdMessage,
  MdGroup 
} from 'react-icons/md';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('User');

  useEffect(() => {
    // LocalStorage 
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.role) {
      setUserRole(userData.role);
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleSignOut = () => {
    localStorage.removeItem('user'); 
    localStorage.removeItem('adminToken');
    navigate('/admin/login'); 
  };

  const allMenuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <MdDashboard />, roles: ['Admin', 'User'] },
    { name: 'Manage Packages', path: '/admin/manage-packages', icon: <MdCardTravel />, roles: ['Admin'] },
    { name: 'View Bookings', path: '/admin/view-bookings', icon: <MdEventAvailable />, roles: ['Admin', 'User'] },
    { name: 'Manage Blogs', path: '/admin/manage-blogs', icon: <MdArticle />, roles: ['Admin'] },
    { name: 'Contact Messages', path: '/admin/messages', icon: <MdMessage />, roles: ['Admin', 'User'] },
    { name: 'User List', path: '/admin/users', icon: <MdPeople />, roles: ['Admin'] }, 
    { name: 'App Members', path: '/admin/members', icon: <MdGroup />, roles: ['Admin'] }, 
  ];

  const filteredMenuItems = allMenuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="w-72 min-h-screen bg-slate-900 text-slate-300 flex flex-col shadow-2xl sticky top-0 h-screen">
      <div className="p-8 border-b border-slate-800 text-center">
        <h2 className="text-2xl font-black text-white tracking-tighter mb-2">
          Travlia<span className="text-orange-500">.</span> {userRole === 'Admin' ? 'Admin' : 'Portal'}
        </h2>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          {userRole === 'Admin' ? 'Control Panel' : 'User Panel'}
        </p>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        {filteredMenuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800 space-y-2">
        <Link to="/" className="flex items-center gap-4 px-4 py-3 text-sm font-bold hover:text-orange-400 transition">
          <MdArrowBack /> Back to Website
        </Link>
        <button 
          onClick={handleSignOut} 
          className="w-full flex items-center gap-4 px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition"
        >
          <MdLogout /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;