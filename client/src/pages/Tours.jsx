import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TourImage from '../assets/Images/tours.png';

const BASE_URL = "http://localhost:5000"; // Apnar backend URL

const Tours = () => {
    const [allTours, setAllTours] = useState([]); // Database theke asha sob data
    const [filteredTours, setFilteredTours] = useState([]);
    const [selectedDestinations, setSelectedDestinations] = useState([]);
    const [priceRange, setPriceRange] = useState(2000); // Max price limit
    const [durationRange, setDurationRange] = useState(10); // 0-10 Days match
    const [currentPage, setCurrentPage] = useState(1);
    const toursPerPage = 6;

    // 1. Data Fetching from Database
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/packages`);
                setAllTours(res.data);
                setFilteredTours(res.data);
            } catch (err) {
                console.error("Error fetching tours:", err);
            }
        };
        fetchTours();
    }, []);

    // 2. Dynamic Filtering Logic
    useEffect(() => {
        let result = allTours.filter(tour => 
            tour.price <= priceRange && 
            tour.days <= durationRange // Days dynamic filtering
        );

        if (selectedDestinations.length > 0) {
            result = result.filter(tour => selectedDestinations.includes(tour.location));
        }

        setFilteredTours(result);
        setCurrentPage(1);
    }, [selectedDestinations, priceRange, durationRange, allTours]);

    const toggleFilter = (item) => {
        setSelectedDestinations(prev => 
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    // Unique locations for Sidebar (Dynamic)
    const uniqueLocations = [...new Set(allTours.map(t => t.location))];

    const indexOfLastTour = currentPage * toursPerPage;
    const currentTours = filteredTours.slice(indexOfLastTour - toursPerPage, indexOfLastTour);
    const totalPages = Math.ceil(filteredTours.length / toursPerPage);

    return (
        <main className="bg-white">
            {/* Banner Section - Remains Same */}
            <section className="bg-[#fdf7f0] py-16 lg:py-24">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="w-full lg:w-1/2">
                            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
                                Trip Search <br /> Result
                            </h1>
                        </div>
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                            <img src={TourImage} alt="Banner" className="rounded-3xl shadow-2xl h-[300px] object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 container mx-auto px-6 lg:px-20">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Dynamic Sidebar */}
                    <aside className="w-full lg:w-1/4 space-y-8">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-5">
                            <h3 className="text-xl font-bold mb-6">Criteria</h3>
                            
                            <div className="mb-8">
                                <p className="font-bold text-sm uppercase mb-4 text-slate-900">Destination</p>
                                {uniqueLocations.map(dest => (
                                    <label key={dest} className="flex items-center gap-3 mb-3 cursor-pointer group">
                                        <input 
                                            type="checkbox" 
                                            className="accent-yellow-500 w-4 h-4" 
                                            onChange={() => toggleFilter(dest)} 
                                        />
                                        <span className="text-sm text-gray-600 group-hover:text-yellow-600">{dest}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="mb-8 border-t pt-6">
                                <p className="font-bold text-sm uppercase mb-4">Price (Max: ${priceRange})</p>
                                <input type="range" className="w-full accent-yellow-400" min="0" max="5000" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
                            </div>

                            <div className="mb-8 border-t pt-6">
                                <p className="font-bold text-sm uppercase mb-4">Duration (0-10 Days)</p>
                                <input type="range" className="w-full accent-yellow-400" min="1" max="10" value={durationRange} onChange={(e) => setDurationRange(e.target.value)} />
                                <div className="flex justify-between text-xs font-bold mt-2">
                                    <span>1 Day</span>
                                    <span className="text-orange-500">{durationRange} Days</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Dynamic Tour Grid */}
                    <div className="w-full lg:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {currentTours.map((tour) => (
                                <div key={tour.id} className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl group border border-gray-50 transition-all duration-300">
                                    <div className="relative h-64 overflow-hidden">
                                        {/* Image Path fixed for local storage folder */}
                                        <img 
                                            src={`${BASE_URL}${tour.image}`} 
                                            alt={tour.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                                        />
                                    </div>
                                    <div className="p-6">
                                        <p className="text-xs text-orange-500 font-bold uppercase mb-2">{tour.location}</p>
                                        <Link to={`/package/${tour.id}`}>
                                            <h3 className="text-xl font-black text-slate-800 mb-4 group-hover:text-orange-500 cursor-pointer">
                                                {tour.title}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center justify-between border-y py-3 mb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            <span>📅 {tour.days} Days</span>
                                            <span>🌙 {tour.nights} Nights</span>
                                            <span>🌍 {tour.countries} Country</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase font-bold">Starting From</p>
                                                <p className="text-xl font-black text-slate-900">${tour.price}</p>
                                            </div>
                                            <Link to={`/package/${tour.id}`} className="bg-slate-900 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-orange-500 transition-all shadow-lg">
                                                View Tour
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination - Dynamic */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex justify-center gap-3">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button 
                                        key={index} 
                                        onClick={() => setCurrentPage(index + 1)} 
                                        className={`w-12 h-12 rounded-full font-bold ${currentPage === index + 1 ? 'bg-orange-500 text-white' : 'bg-white border text-gray-400'}`}
                                    >
                                        0{index + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Tours;