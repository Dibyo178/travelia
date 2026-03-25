import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import Swal from 'sweetalert2';
import axios from 'axios';
import { 
  MdFileDownload,
  MdDeleteOutline,
  MdChevronLeft,
  MdChevronRight,
  MdRefresh 
} from 'react-icons/md';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. Fetch Data from Backend ---
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      // Data load na holeo loading false kora dorkar
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // --- Pagination Logic ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);

  // --- 2. Delete Logic (Backend Integration) ---
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0f172a',
      cancelButtonColor: '#f87171',
      confirmButtonText: 'Yes, delete it!',
      customClass: { popup: 'rounded-[30px]' }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/bookings/delete/${id}`);
          setBookings(bookings.filter(item => item.id !== id));
          Swal.fire({
            title: 'Deleted!',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false,
            customClass: { popup: 'rounded-[30px]' }
          });
        } catch (err) {
          Swal.fire('Error', 'Delete operation failed!', 'error');
        }
      }
    });
  };

  // --- 3. CSV Export Logic ---
  const handleExportCSV = () => {
    const headers = ["Order ID,Customer,Email,Tour,Date,Status,Amount"];
    const rows = bookings.map(item => 
      `#TR-${9900 + item.id},${item.user_name},${item.user_email},"${item.package_title || 'N/A'}",${item.created_at},${item.status || 'Pending'},${item.price || '0'}`
    );
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "travlia_bookings.csv";
    link.click();
  };

  return (
    <div className="flex min-h-screen bg-slate-50">


      <main className="flex-1 p-6 md:p-10 lg:p-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">Reservations</h1>
            <p className="text-slate-500 font-medium mt-1">Manage customer booking records.</p>
          </div>
          <div className="flex gap-3">
             <button onClick={fetchBookings} className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-100 transition-all shadow-sm">
                <MdRefresh className={`text-xl ${loading ? 'animate-spin' : ''}`} />
             </button>
             <button onClick={handleExportCSV} className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[2px] shadow-sm hover:bg-slate-900 hover:text-white transition-all group">
               <MdFileDownload className="text-lg" /> Export CSV
             </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Order ID</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Customer</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Tour Details</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400 text-center">Action</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[2px] text-slate-400 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan="5" className="py-20 text-center font-bold text-slate-300 uppercase tracking-widest animate-pulse">Loading Reservations...</td></tr>
                ) : (
                  currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/40 transition-colors group">
                      <td className="px-8 py-6 text-xs font-bold text-slate-400">#TR-{9900 + item.id}</td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-black text-slate-900">{item.user_name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{item.user_email}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-bold text-slate-700">{item.package_title || "Standard Tour"}</p>
                        <p className="text-[10px] text-orange-500 font-black uppercase">
                           {item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : "Oct 24, 2026"}
                        </p>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <button onClick={() => handleDelete(item.id)} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                          <MdDeleteOutline className="text-2xl" />
                        </button>
                      </td>
                      <td className="px-8 py-6 text-right font-black text-slate-900">${item.price || '1,200'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          <div className="bg-slate-50/50 px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, bookings.length)} of {bookings.length} entries
            </span>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 hover:bg-slate-900 hover:text-white transition-all"
              >
                <MdChevronLeft className="text-xl" />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${
                    currentPage === i + 1 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                    : 'bg-white border border-slate-200 text-slate-400 hover:border-slate-900 hover:text-slate-900'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 hover:bg-slate-900 hover:text-white transition-all"
              >
                <MdChevronRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[3px]">
          Total {bookings.length} reservations found
        </p>
      </main>
    </div>
  );
};

export default ViewBookings;