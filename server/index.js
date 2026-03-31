const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); 


const userRoutes = require('./routes/userRoutes'); 
const memberRoutes = require('./routes/memberRoutes'); 
const bookingRoutes = require('./routes/bookingRoutes');
const packageRoutes = require('./routes/packageRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middleware

app.use(cors({
    origin: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Static Folder (Images access)
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

// API Routes
app.use('/api/users', userRoutes);     
app.use('/api/members', memberRoutes);  // app_members(Firebase Sync)
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