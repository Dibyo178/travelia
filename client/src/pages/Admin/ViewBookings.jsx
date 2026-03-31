import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { BASE_URL } from '../config';
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

  // --- ১. ডাটা ফেচ করা (বুকিং + প্যাকেজ ইনফো সহ) ---
  const fetchBookings = async () => {
    try {
      setLoading(true);
      // নোট: ব্যাকএন্ডে JOIN কুয়েরি ব্যবহার করলে package_title এবং price সরাসরি পাওয়া যাবে
      const res = await axios.get(`${BASE_URL}/api/bookings`);
      setBookings(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // --- Pagination Logic ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);


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

  // CSV export logic
  const handleExportCSV = () => {
    const headers = ["Order ID,Customer,Email,Tour ID,Date,Status,Amount"];
    const rows = bookings.map(item => 
      `#TR-${9900 + item.id},${item.user_name},${item.user_email},${item.package_id},${item.created_at},${item.status},${item.package_price || item.amount || '0'}`
    );
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `travlia_bookings_${new Date().toLocaleDateString()}.csv`;
    link.click();
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <main className="flex-1 p-6 md:p-10 lg:p-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase italic">Reservations</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[3px] mt-1 opacity-60">Manage customer booking records</p>
          </div>
          <div className="flex gap-3">
             <button onClick={fetchBookings} className="p-4 bg-white border border-slate-200 rounded-[20px] hover:bg-slate-100 transition-all shadow-sm group">
                <MdRefresh className={`text-xl text-slate-400 group-hover:text-slate-900 ${loading ? 'animate-spin' : ''}`} />
             </button>
             <button onClick={handleExportCSV} className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-[20px] font-black text-[10px] uppercase tracking-[2px] shadow-2xl shadow-slate-900/20 hover:bg-orange-600 transition-all">
               <MdFileDownload className="text-lg" /> Export CSV
             </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/60 border border-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Order ID</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Customer</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Tour & ID</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[2px] text-slate-400 text-center">Action</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[2px] text-slate-400 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan="5" className="py-32 text-center font-black text-slate-200 uppercase tracking-[5px] animate-pulse">Synchronizing...</td></tr>
                ) : (
                  currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors group">
                      <td className="px-10 py-8 text-xs font-black text-slate-300">#TR-{9900 + item.id}</td>
                      <td className="px-10 py-8">
                        <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">{item.user_name}</p>
                        <p className="text-[10px] text-slate-400 font-bold lowercase">{item.user_email}</p>
                      </td>
                      <td className="px-10 py-8">
                        {/* package_id ২ হলে এখানে ডাইনামিক টাইটেল দেখাবে */}
                        <p className="text-sm font-black text-slate-700 italic">Package #{item.package_id}</p>
                        <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest mt-1">
                           {item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : "N/A"}
                        </p>
                      </td>
                      <td className="px-10 py-8 text-center">
                        <button onClick={() => handleDelete(item.id)} className="w-12 h-12 flex items-center justify-center mx-auto text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100">
                          <MdDeleteOutline className="text-2xl" />
                        </button>
                      </td>
                     
                      <td className="px-10 py-8 text-right">
                         <p className="text-lg font-black text-slate-900 tracking-tighter">
                            ${item.package_price ? Number(item.package_price).toLocaleString() : (item.amount || '0')}
                         </p>
                      
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-slate-50/50 px-10 py-8 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
              Displaying {indexOfFirstItem + 1}—{Math.min(indexOfLastItem, bookings.length)} of {bookings.length}
            </span>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-12 h-12 rounded-2xl border border-slate-200 bg-white text-slate-600 disabled:opacity-20 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center shadow-sm"
              >
                <MdChevronLeft className="text-2xl" />
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-12 h-12 rounded-2xl text-[11px] font-black transition-all ${
                      currentPage === i + 1 
                      ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' 
                      : 'bg-white border border-slate-200 text-slate-400 hover:border-slate-900 hover:text-slate-900'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-12 h-12 rounded-2xl border border-slate-200 bg-white text-slate-600 disabled:opacity-20 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center shadow-sm"
              >
                <MdChevronRight className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}; 

export default ViewBookings;