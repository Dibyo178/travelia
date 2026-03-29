const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// ১. মেম্বার লিস্ট পড়ার API (এটি আপনার ফ্রন্টএন্ডে ডাটা দেখাবে)
router.get('/members-list', (req, res) => {
    // app_members টেবিল থেকে সব ডাটা আনা হচ্ছে
    const sql = "SELECT * FROM app_members ORDER BY joined_at DESC";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ error: "Failed to fetch members" });
        }
        res.status(200).json(results);
    });
});

// ২. মেম্বার সিঙ্ক করার API (Firebase থেকে আসা ডাটা)
router.post('/sync-member', (req, res) => {
    const { uid, name, email, provider } = req.body;

    const sql = `
        INSERT INTO app_members (firebase_uid, full_name, email_address, auth_provider) 
        VALUES (?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
        full_name = VALUES(full_name), 
        auth_provider = VALUES(auth_provider)
    `;

    db.query(sql, [uid, name, email, provider], (err, result) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ error: "Sync failed" });
        }
        res.status(200).json({ success: true, message: "Member synced!" });
    });
});

module.exports = router;