import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

// আপনার ট্যুর ডাটা (সার্চে দেখানোর জন্য)
const allTours = [
  { id: 1, title: "Lithaniya – Santa Cruza", location: "Italy" },
  { id: 2, title: "Velouria – Monte Sienna", location: "Bhutan" },
  { id: 3, title: "Elvarra – Costa Lumia", location: "Morroco" },
  { id: 4, title: "Seraphina – Porto Luno", location: "Venice" },
  { id: 5, title: "Calethia – Isla Verona", location: "Maldives" },
  { id: 6, title: "Verona – Isla Calethia", location: "London" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const closeMenu = () => setIsOpen(false);

  // সার্চ লজিক: টাইপ করার সাথে সাথে লিস্ট আপডেট হবে
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = allTours.filter(tour =>
        tour.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  // ইনপুটের বাইরে ক্লিক করলে লিস্ট বন্ধ হবে
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/tours?search=${searchTerm}`);
      setSearchTerm("");
      setShowSearch(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Tours', path: '/tours' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white sticky top-0 z-[100] shadow-sm">
      <div className="flex items-center justify-between px-6 lg:px-12 py-5 max-w-7xl mx-auto relative">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-slate-900 tracking-tighter" onClick={closeMenu}>
          TRAVLIA<span className="text-orange-500">.</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 font-bold text-slate-700 uppercase text-[12px] tracking-widest">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink 
                to={link.path} 
                className={({ isActive }) => 
                  `transition-colors duration-300 ${isActive ? 'text-orange-500 border-b-2 border-orange-500 pb-1' : 'hover:text-orange-500'}`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-4" ref={searchRef}>
          <div className="relative flex items-center">
            {showSearch && (
              <div className="absolute right-12 flex flex-col items-end">
                <form onSubmit={handleSearchSubmit} className="animate-in fade-in slide-in-from-right-4">
                  <input 
                    type="text"
                    placeholder="Search tours..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-orange-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-orange-500 w-40 lg:w-60 shadow-sm bg-white"
                    autoFocus
                  />
                </form>

                {/* --- সার্চ রেজাল্ট লিস্ট (Dropdown) --- */}
                {/* --- সার্চ রেজাল্ট লিস্ট (Scrollable Dropdown) --- */}
{searchResults.length > 0 && (
  <div className="absolute top-12 w-60 lg:w-72 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[110] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
    
    {/* কন্টেইনার যেটাতে স্ক্রল হবে */}
    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
      {searchResults.map((tour) => (
        <div
          key={tour.id}
          onClick={() => {
            navigate(`/tours`); 
            setShowSearch(false);
            setSearchTerm("");
          }}
          className="px-4 py-4 hover:bg-orange-50 cursor-pointer border-b border-gray-50 last:border-none transition-all flex flex-col gap-1"
        >
          <p className="text-[11px] font-bold text-slate-800 leading-tight">
            {tour.title}
          </p>
          <p className="text-[9px] text-orange-500 uppercase font-black tracking-tighter">
            {tour.location}
          </p>
        </div>
      ))}
    </div>

    {/* যদি আরও রেজাল্ট থাকে তার একটি ইন্ডিকেটর (Optional) */}
    <div className="bg-gray-50 px-4 py-2 text-[9px] text-center text-gray-400 font-bold uppercase tracking-widest border-t border-gray-100">
      End of results
    </div>
  </div>
)}
              </div>
            )}
            
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className={`p-3 rounded-full transition duration-300 ${showSearch ? 'bg-orange-500 text-white' : 'bg-gray-100 text-slate-700 hover:bg-orange-100'}`}
            >
              <FaSearch />
            </button>
          </div>
          
          <button 
            onClick={() => navigate('/tours')}
            className="hidden md:block bg-black text-white px-7 py-3 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-orange-600 transition duration-300 shadow-lg"
          >
            Explore Trip
          </button>

          <button onClick={() => setIsOpen(!isOpen)} className="bg-amber-400 p-3 rounded-lg text-white lg:hidden text-xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (আগের মতোই) */}
      <div className={`lg:hidden bg-white absolute w-full left-0 shadow-2xl transition-all duration-300 ease-in-out border-t ${isOpen ? 'top-[100%] opacity-100' : 'top-[-500px] opacity-0 pointer-events-none'}`}>
        <ul className="flex flex-col p-6 gap-2 font-bold uppercase text-sm">
          {navLinks.map((link) => (
            <li key={link.name} className="border-b border-gray-50 last:border-none">
              <NavLink to={link.path} onClick={closeMenu} className={({ isActive }) => `block py-4 ${isActive ? 'text-orange-500 pl-4 border-l-4 border-orange-500 bg-orange-50' : ''}`}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;