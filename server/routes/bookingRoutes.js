const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// সব বুকিং লিস্ট দেখা
router.get('/', bookingController.getAllBookings);

// বুকিং স্ট্যাটাস আপডেট করা (Confirmed/Pending)
router.put('/update-status/:id', bookingController.updateBookingStatus);

// বুকিং ডিলিট করা
router.delete('/delete/:id', bookingController.deleteBooking);

module.exports = router;