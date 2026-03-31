import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminSidebar from './components/Admin/AdminSidebar';
import Chatbot from './components/Chatbot';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Tours from './pages/Tours';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import PackageDetails from './components/PackageDetails';
import Profile from './pages/Profile'; 
import BlogDetails from './pages/BlogDetails';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import ManagePackages from './pages/Admin/ManagePackages';
import ViewBookings from './pages/Admin/ViewBookings';
import Login from './pages/Admin/Login'; 
import ForgotPassword from './pages/Admin/ForgotPassword';
import UserList from './pages/Admin/UserList';
import ManageBlogs from './pages/Admin/ManageBlogs';
import AdminMessages from './pages/Admin/AdminMessages';
import MemberManagement from './pages/Admin/MemberManagement';

//  ptotected route for Admin Dashboard
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken'); 
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// Admin Layout with Sidebar
const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 bg-slate-50 min-h-screen">
        {children}
      </div>
    </div>
  );
};

// Layout Wrapper to conditionally render Navbar and Footer

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
 
      {!isAdminPath && <Navbar />}
      
      {children}
      
  
      {!isAdminPath && <Chatbot />} 

    
      {!isAdminPath && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/package/:id" element={<PackageDetails />} />

          {/* --- Admin Auth --- */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />

          {/* --- Admin Dashboard Routes (Protected) --- */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>
          } />
          <Route path="/admin/manage-packages" element={
            <ProtectedRoute><AdminLayout><ManagePackages /></AdminLayout></ProtectedRoute>
          } />
          <Route path="/admin/view-bookings" element={
            <ProtectedRoute><AdminLayout><ViewBookings /></AdminLayout></ProtectedRoute>
          } />
          <Route path="/admin/manage-blogs" element={
            <ProtectedRoute><AdminLayout><ManageBlogs /></AdminLayout></ProtectedRoute>
          } />
          <Route path="/admin/messages" element={
            <ProtectedRoute><AdminLayout><AdminMessages /></AdminLayout></ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute><AdminLayout><UserList /></AdminLayout></ProtectedRoute>
          } />
          <Route path="/admin/members" element={
            <ProtectedRoute><AdminLayout><MemberManagement /></AdminLayout></ProtectedRoute>
          } />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;