import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Tours from './pages/Tours';
import Contact from './pages/Contact';
import Blog from './pages/Blog';

function App() {
  return (
    <Router>
      {/* এখানে একবার থাকলে সব পেজেই দেখাবে */}
      <Navbar /> 
      
     <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/tours" element={<Tours />} />
  <Route path="/blog" element={<Blog />} />
  <Route path="/contact" element={<Contact />} />
</Routes>

      <Footer />
    </Router>
  );
}

export default App;