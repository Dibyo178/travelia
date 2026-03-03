import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Tours from './pages/Tours';
import Contact from './pages/Contact';
import Blog from './pages/Blog';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import ManagePackages from './pages/Admin/ManagePackages';
import ViewBookings from './pages/Admin/ViewBookings';
import Login from './pages/Admin/Login'; // একটি Login পেজ তৈরি করে নিন
import ForgotPassword from './pages/Admin/ForgotPassword';
import UserList from './pages/Admin/UserList';

// একটি সাব-কম্পোনেন্ট যা চেক করবে আমরা অ্যাডমিন প্যানেলে আছি কি না
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  // যদি পাথ '/admin' দিয়ে শুরু হয়, তবে সাধারণ Navbar এবং Footer দেখাবে না
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPath && <Navbar />}
      {children}
      {!isAdminPath && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/manage-packages" element={<ManagePackages />} />
          <Route path="/admin/view-bookings" element={<ViewBookings />} />
          <Route path="/admin/users" element={<UserList />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;