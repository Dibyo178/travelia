import React, { useState } from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import Swal from 'sweetalert2';
import { 
  MdCached, 
  MdCheckCircleOutline, 
  MdOutlinePendingActions, 
  MdFileDownload,
  MdDeleteOutline,
  MdChevronLeft,
  MdChevronRight 
} from 'react-icons/md';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([
    { id: "#TR-9902", customer: "John Doe", email: "john@example.com", tour: "Italy – Santa Cruza", date: "Oct 24, 2026", status: "Confirmed", amount: "$1,200" },
    { id: "#TR-9903", customer: "Sarah Khan", email: "sarah@mail.com", tour: "Bali – Uluwatu", date: "Nov 12, 2026", status: "Pending", amount: "$850" },
    { id: "#TR-9905", customer: "Rakib Chen", email: "rakib@agency.com", tour: "Japan – Kyoto", date: "Dec 05, 2026", status: "Pending", amount: "$2,100" },
    { id: "#TR-9906", customer: "Alex Root", email: "alex@test.com", tour: "Paris – Eiffel", date: "Jan 10, 2027", status: "Confirmed", amount: "$1,500" },
  ]);

  // --- Pagination Logic ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // প্রতি পেজে কয়টি দেখাবে
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  
  // বর্তমান পেজের ডাটা আলাদা করা
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);

  // --- Delete Logic ---
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
    }).then((result) => {
      if (result.isConfirmed) {
        setBookings(bookings.filter(item => item.id !== id));
        Swal.fire({
          title: 'Deleted!',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
          customClass: { popup: 'rounded-[30px]' }
        });
      }
    });
  };

  // --- Export CSV Logic (Fixed) ---
  const handleExportCSV = () => {
    const headers = ["Order ID,Customer,Email,Tour,Date,Status,Amount"];
    const rows = bookings.map(item => 
      `${item.id},${item.customer},${item.email},"${item.tour}",${item.date},${item.status},${item.amount.replace(/,/g, '')}`
    );
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "travlia_bookings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'CSV Downloaded',
      showConfirmButton: false,
      timer: 2000
    });
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
          <button onClick={handleExportCSV} className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[2px] shadow-sm hover:bg-slate-900 hover:text-white transition-all group">
            <MdFileDownload className="text-lg" /> Export CSV
          </button>
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
                {currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="px-8 py-6 text-xs font-bold text-slate-400">{item.id}</td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-900">{item.customer}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{item.email}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-slate-700">{item.tour}</p>
                      <p className="text-[10px] text-orange-500 font-black uppercase">{item.date}</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button onClick={() => handleDelete(item.id)} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                        <MdDeleteOutline className="text-2xl" />
                      </button>
                    </td>
                    <td className="px-8 py-6 text-right font-black text-slate-900">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- New Pagination Section --- */}
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