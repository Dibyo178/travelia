const db = require('../config/db');

// (User Side - Enhanced with Guests & Amount)
exports.createBooking = (req, res) => {

    const { package_id, user_name, user_email, guests, amount } = req.body;
    
    const pid = parseInt(package_id);
    const guestCount = parseInt(guests) || 1;
    const totalAmount = parseFloat(amount) || 0;

    // SQL update: guests and amount columndata insert
    const sql = `INSERT INTO bookings 
                 (package_id, user_name, user_email, guests, amount, status) 
                 VALUES (?, ?, ?, ?, ?, 'Pending')`;
    
    db.query(sql, [pid, user_name, user_email, guestCount, totalAmount], (err, result) => {
        if (err) {
            console.error("SQL Error Detail:", err);
            if (err.errno === 1452) {
                return res.status(400).json({ error: "Invalid Package ID." });
            }
         
            return res.status(500).json({ error: "Database error. Make sure 'guests' and 'amount' columns exist." });
        }
        res.status(201).json({ message: "Booking Successful!", bookingId: result.insertId });
    });
};

// booking list show (Admin Side)
exports.getAllBookings = (req, res) => {
    // LEFT JOIN package details anar jonno
    const sql = `
        SELECT bookings.*, tour_packages.title as package_title 
        FROM bookings 
        LEFT JOIN tour_packages ON bookings.package_id = tour_packages.id 
        ORDER BY bookings.id DESC`;

    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(data);
    });
};

//   booking status update function (Admin Side)
exports.updateBookingStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body; 

    const sql = "UPDATE bookings SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (err, result) => {
        if (err) return res.status(500).json({ error: "Update failed" });
        res.status(200).json({ message: "Status updated successfully!" });
    });
};

// booking delete function (Admin Side) --- IGNORE ---
exports.deleteBooking = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM bookings WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Booking deleted!" });
    });
};