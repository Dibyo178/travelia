const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
// ডাটাবেস কানেকশন ইম্পোর্ট করুন (পাথ ঠিক আছে কি না নিশ্চিত হয়ে নিন)
const db = require('../config/db'); 

// ১. নতুন বুকিং তৈরি
router.post('/add', bookingController.createBooking); 

// ২. অ্যাডমিন প্যানেলের জন্য বাকি রাউট
router.get('/', bookingController.getAllBookings);
router.put('/update-status/:id', bookingController.updateBookingStatus);
router.delete('/delete/:id', bookingController.deleteBooking);


router.get('/user/:email', (req, res) => {
    const email = req.params.email.toLowerCase();
    
    // ১. b.user_email (বুকিং টেবিল অনুযায়ী)
    // ২. tour_packages (আপনার নতুন স্ক্রিনশটে দেখা টেবিল নাম)
    // ৩. p.image (আপনার টেবিল অনুযায়ী ইমেজের কলাম)
    const sql = `
        SELECT b.*, p.title as package_title, p.image as package_image
        FROM bookings b 
        JOIN tour_packages p ON b.package_id = p.id 
        WHERE LOWER(b.user_email) = ? 
        ORDER BY b.created_at DESC
    `;

    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).json({ error: "Database error", details: err });
        }
        res.status(200).json(results);
    });
});
module.exports = router;