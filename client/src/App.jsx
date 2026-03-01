import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Router>
      {/* এখানে একবার থাকলে সব পেজেই দেখাবে */}
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* অ্যাডমিন প্যানেলের জন্য আলাদা লেআউট লাগলে সেটা পরে হ্যান্ডেল করা যাবে */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;