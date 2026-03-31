const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

const db = require('../config/db'); 


router.post('/add', bookingController.createBooking); 

// ২. অ্যাডমিন প্যানেলের জন্য বাকি রাউট

router.get("/", (req, res) => {

  const sql = `
    SELECT 
      b.id, 
      b.user_name, 
      b.user_email, 
      b.package_id, 
      b.status, 
      b.created_at, 
      p.title AS package_title, 
      p.price AS package_price 
    FROM bookings b
    LEFT JOIN tour_packages p ON b.package_id = p.id
    ORDER BY b.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Failed to fetch bookings" });
    }
    res.json(results);
  });
});

router.put('/update-status/:id', bookingController.updateBookingStatus);
router.delete('/delete/:id', bookingController.deleteBooking);


router.get('/user/:email', (req, res) => {
    const email = req.params.email.toLowerCase();

const sql = `
  SELECT 
    b.*, 
    p.title AS package_title, 
    p.price AS package_price 
  FROM bookings b
  LEFT JOIN tour_packages p ON b.package_id = p.id
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