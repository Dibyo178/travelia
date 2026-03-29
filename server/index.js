const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); 

// রাউটস ইম্পোর্ট
const userRoutes = require('./routes/userRoutes'); // আগের ইউজার রাউট
const memberRoutes = require('./routes/memberRoutes'); // নতুন মেম্বার রাউট
const bookingRoutes = require('./routes/bookingRoutes');
const packageRoutes = require('./routes/packageRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Static Folder (Images access)
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

// API Routes
app.use('/api/users', userRoutes);      // সাধারণ ইউজার বা এডমিনদের জন্য
app.use('/api/members', memberRoutes);  // app_members টেবিলের জন্য (Firebase Sync)
app.use('/api/bookings', bookingRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contacts', contactRoutes);

app.get('/', (req, res) => {
    res.send("Travlia Server is Running with Multi-Route Support...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});