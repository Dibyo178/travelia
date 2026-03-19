const express = require('express');
const router = express.Router();
const db = require('../config/db');

// অ্যাডমিন প্যানেলে কন্টাক্ট মেসেজগুলো দেখার জন্য
router.get('/messages', (req, res) => {
    db.query("SELECT * FROM contacts ORDER BY id DESC", (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(result);
    });
});

module.exports = router;