const db = require('../config/db');

exports.getAllBookings = (req, res) => {
    const sql = "SELECT * FROM bookings";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

exports.updateBookingStatus = (req, res) => { /* logic here */ };
exports.deleteBooking = (req, res) => { /* logic here */ };