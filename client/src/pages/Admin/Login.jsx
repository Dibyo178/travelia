import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // আপনার লগইন লজিক এখানে হবে
        navigate('/admin/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="max-w-4xl w-full bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 flex overflow-hidden border border-white">

                {/* Left Side: Image/Branding Section (Hidden on Mobile) */}
                <div className="hidden md:flex md:w-1/2 bg-slate-900 relative p-12 flex-col justify-between text-white">
                    {/* Background Pattern/Overlay */}
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>

                    <div className="relative z-10">
                        <h1 className="text-3xl font-black tracking-tighter">
                            TRAVLIA<span className="text-orange-500">.</span>
                        </h1>
                    </div>

                    <div className="relative z-10">
                        <blockquote className="text-xl font-medium leading-relaxed italic text-slate-200">
                            "The journey of a thousand miles begins with a single step. Manage your travel empire with ease."
                        </blockquote>
                        <div className="mt-4 flex items-center gap-3">
                            <div className="h-1 w-12 bg-orange-500 rounded-full"></div>
                            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">Admin Control</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back!</h2>
                        <p className="text-slate-500 text-sm">Please enter your credentials to access the admin panel.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="admin@travlia.com"
                                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 text-sm"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="accent-orange-500 h-4 w-4" />
                                <span className="text-xs font-bold text-slate-600">Remember me</span>
                            </label>
                            <Link
                                to="/admin/forgot-password"
                                className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors"
                            >
                                Forgot Password?
                            </Link>            </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[2px] hover:bg-orange-600 transition-all duration-500 shadow-xl shadow-slate-200 active:scale-[0.98]"
                        >
                            Sign In to Dashboard
                        </button>
                    </form>

                    <p className="mt-8 text-center text-slate-400 text-xs font-medium">
                        &copy; 2026 Travlia Admin. All rights reserved.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Login;