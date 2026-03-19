const express = require('express');
const cors = require('cors');
const path = require('path'); // পাথ মডিউল ইম্পোর্ট করুন
require('dotenv').config(); 

// রাউটস ইম্পোর্ট
const userRoutes = require('./routes/userRoutes'); 
const bookingRoutes = require('./routes/bookingRoutes');
const packageRoutes = require('./routes/packageRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ১. Static Folder ডিক্লেয়ার করা (যাতে ফ্রন্টএন্ড থেকে ইমেজ এক্সেস করা যায়)
// এটি 'Uploads' ফোল্ডারকে পাবলিকলি এভেইলঅ্যাবল করবে
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

// ২. API Routes
app.use('/api/users', userRoutes); 
app.use('/api/bookings', bookingRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contacts', contactRoutes);

app.get('/', (req, res) => {
    res.send("Travlia Server is Running...");
});

// পোর্ট সেটআপ
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});