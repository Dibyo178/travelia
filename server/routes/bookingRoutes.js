const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// ১. নতুন বুকিং তৈরি (এটিই ফ্রন্টএন্ড থেকে কল হচ্ছে)
router.post('/add', bookingController.createBooking); 

// ২. অ্যাডমিন প্যানেলের জন্য বাকি রাউট
router.get('/', bookingController.getAllBookings);
router.put('/update-status/:id', bookingController.updateBookingStatus);
router.delete('/delete/:id', bookingController.deleteBooking);

module.exports = router;