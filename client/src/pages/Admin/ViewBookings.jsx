import React, { useState } from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import { 
  MdCached, 
  MdCheckCircleOutline, 
  MdOutlinePendingActions, 
  MdFileDownload 
} from 'react-icons/md';

const ViewBookings = () => {
  // স্ট্যাটিক ডাটা স্টেট
  const [bookings, setBookings] = useState([
    { id: "#TR-9902", customer: "John Doe", email: "john@example.com", tour: "Italy – Santa Cruza", date: "Oct 24, 2026", status: "Confirmed", amount: "$1,200" },
    { id: "#TR-9903", customer: "Sarah Khan", email: "sarah@mail.com", tour: "Bali – Uluwatu", date: "Nov 12, 2026", status: "Pending", amount: "$850" },
    { id: "#TR-9905", customer: "Rakib Chen", email: "rakib@agency.com", tour: "Japan – Kyoto", date: "Dec 05, 2026", status: "Pending", amount: "$2,100" },
  ]);

  // --- Export CSV Logic ---
  const handleExportCSV = () => {
    // CSV Header
    const csvRows = ["Order ID,Customer,Email,Tour,Date,Status,Amount"];
    
    // Data Rows
    bookings.forEach(item => {
      // Amount থেকে কমা (,) সরানো হয়েছে যাতে CSV ফরম্যাট নষ্ট না হয়
      const cleanAmount = item.amount.replace(/,/g, '');
      const row = `${item.id},${item.customer},${item.email},"${item.tour}",${item.date},${item.status},${cleanAmount}`;
      csvRows.push(row);
    });

    // Create Blob and Download
    const blob = new Blob([csvRows.join("\n")], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "travlia_bookings_report.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // স্ট্যাটাস পরিবর্তন করার ফাংশন
  const toggleStatus = (id) => {
    setBookings(prevBookings => 
      prevBookings.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status: item.status === "Confirmed" ? "Pending" : "Confirmed"
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 lg:p-12 overflow-x-hidden">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Reservations</h1>
            <p className="text-slate-500 font-medium mt-1">Manage and export customer booking records.</p>
          </div>
          
          {/* Updated Export Button with onClick */}
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white border border-slate-200 px-7 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[2px] shadow-sm hover:bg-slate-900 hover:text-white transition-all active:scale-95 group"
          >
            <MdFileDownload className="text-base group-hover:translate-y-0.5 transition-transform" />
            Export CSV
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/60 border border-white overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-7 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Order ID</th>
                <th className="px-8 py-7 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Customer</th>
                <th className="px-8 py-7 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Tour Details</th>
                <th className="px-8 py-7 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Status Control</th>
                <th className="px-8 py-7 text-[10px] font-black uppercase tracking-[2px] text-slate-400 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {bookings.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/40 transition-colors group">
                  <td className="px-8 py-6 text-xs font-bold text-slate-400">{item.id}</td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-slate-900">{item.customer}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{item.email}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-slate-700">{item.tour}</p>
                    <p className="text-[10px] text-orange-500 font-black uppercase tracking-tighter">{item.date}</p>
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => toggleStatus(item.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm border ${
                        item.status === 'Confirmed' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
                        : 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100'
                      }`}
                    >
                      {item.status === 'Confirmed' ? <MdCheckCircleOutline className="text-sm" /> : <MdOutlinePendingActions className="text-sm" />}
                      {item.status}
                      <MdCached className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity animate-spin-slow" />
                    </button>
                  </td>
                  <td className="px-8 py-6 text-right font-black text-slate-900">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <p className="mt-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[3px]">
          System showing {bookings.length} total records
        </p>
      </div>
    </div>
  );
};

export default ViewBookings;