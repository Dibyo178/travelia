import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrash, FaEye, FaChevronLeft, FaChevronRight, FaRoute, FaCalendarAlt, FaClock } from 'react-icons/fa';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const messagesPerPage = 6;

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/contacts');
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    // ২৪ ঘণ্টা চেক করার লজিক
    const isNewLead = (createdAt) => {
        const leadDate = new Date(createdAt);
        const now = new Date();
        const diffInHours = (now - leadDate) / (1000 * 60 * 60);
        return diffInHours < 24; // যদি ২৪ ঘণ্টার কম হয় তবে true
    };

    // Premium Inquiry Details Popup
    const handleViewDetails = (msg) => {
        Swal.fire({
            html: `
                <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 35px 20px; border-radius: 25px 25px 0 0; margin: -20px -20px 20px -20px;">
                    <h2 style="font-family: 'Poppins', sans-serif; text-transform: uppercase; font-weight: 900; color: #fff; font-size: 22px; margin: 0;">Inquiry Details</h2>
                </div>
                <div style="padding: 20px; text-align: left; font-family: 'Inter', sans-serif;">
                    <div style="background: #f8fafc; padding: 15px; border-radius: 15px; margin-bottom: 15px; border: 1px solid #e2e8f0;">
                        <p style="margin:0; font-size:12px; color:#64748b; font-weight:800;">ROUTE</p>
                        <p style="margin:5px 0 0; font-weight:900; color:#1e293b;">${msg.from_location} ➔ ${msg.to_location}</p>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                        <div style="background: #fff; padding: 12px; border-radius: 12px; border: 1px solid #f1f5f9;">
                            <span style="display:block; font-size:10px; color:#94a3b8; font-weight:800;">GUESTS</span>
                            <span style="font-weight:700; color:#334155;">${msg.guests}</span>
                        </div>
                        <div style="background: #fff; padding: 12px; border-radius: 12px; border: 1px solid #f1f5f9;">
                            <span style="display:block; font-size:10px; color:#94a3b8; font-weight:800;">BUDGET</span>
                            <span style="font-weight:700; color:#334155;">${msg.budget}</span>
                        </div>
                    </div>
                    <p style="text-align:center; font-size:10px; color:#cbd5e1; font-weight:700;">RECEIVED: ${new Date(msg.created_at).toLocaleString('en-GB')}</p>
                </div>
            `,
            showConfirmButton: false,
            showCloseButton: true,
            width: '450px',
            borderRadius: '25px',
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Lead?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1e293b",
            cancelButtonColor: "#f43f5e",
            confirmButtonText: "Yes, delete!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/api/contacts/${id}`);
                    Swal.fire("Deleted!", "Lead has been removed.", "success");
                    fetchMessages();
                } catch (error) {
                    Swal.fire("Error", "Delete failed", "error");
                }
            }
        });
    };

    const totalPages = Math.ceil(messages.length / messagesPerPage);
    const currentMessages = messages.slice((currentPage - 1) * messagesPerPage, currentPage * messagesPerPage);

    return (
        <div className="p-8 bg-[#f8fafc] min-h-screen font-sans">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Inquiry Manager</h1>
                <div className="bg-white px-5 py-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
                    <FaClock className="text-orange-400" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Updates</span>
                </div>
            </div>

            <div className="bg-white rounded-[35px] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                            <th className="px-10 py-6">Inquiry Info</th>
                            <th className="px-10 py-6">Lead Status</th>
                            <th className="px-10 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {currentMessages.map((msg) => (
                            <tr key={msg.id} className="hover:bg-slate-50/50 transition-all">
                                <td className="px-10 py-7">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center">
                                            <FaRoute />
                                        </div>
                                        <div>
                                            <div className="text-[14px] font-black text-slate-800">${msg.from_location} to ${msg.to_location}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase mt-1 italic">${msg.budget} budget</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-7">
                                    {/* স্ট্যাটাস কন্ডিশনাল রেন্ডারিং */}
                                    {isNewLead(msg.created_at) ? (
                                        <span className="bg-amber-100 text-amber-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-200 animate-pulse">
                                            🔥 New Lead
                                        </span>
                                    ) : (
                                        <span className="bg-slate-100 text-slate-400 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-200">
                                            Old Inquiry
                                        </span>
                                    )}
                                </td>
                                <td className="px-10 py-7">
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => handleViewDetails(msg)} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
                                            <FaEye size={14} />
                                        </button>
                                        <button onClick={() => handleDelete(msg.id)} className="w-10 h-10 bg-rose-50 text-rose-400 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all">
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminMessages;