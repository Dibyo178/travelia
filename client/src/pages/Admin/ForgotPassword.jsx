import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 p-8 lg:p-12 border border-white relative overflow-hidden">
        
        {/* Background Decorative Element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-50 rounded-full blur-3xl"></div>

        <Link to="/admin/login" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-orange-500 transition-colors mb-8 group">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Login
        </Link>

        {!isSent ? (
          <>
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-3">Forgot Password?</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Enter the email address associated with your account and we'll send you instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@travlia.com" 
                    className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm"
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[2px] hover:bg-orange-600 transition-all duration-500 shadow-xl shadow-slate-200"
              >
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              <FaEnvelope />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3">Check Your Email</h2>
            <p className="text-slate-500 text-sm mb-8">
              We have sent a password recovery link to <br /><span className="font-bold text-slate-800">{email}</span>
            </p>
            <button 
              onClick={() => navigate('/admin/login')}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[2px] hover:bg-orange-600 transition-all"
            >
              Return to Login
            </button>
          </div>
        )}

        <p className="mt-10 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          TRAVLIA Security System
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;