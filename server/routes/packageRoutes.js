const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/db');

// ১. স্টোরেজ কনফিগারেশন (Error handling সহ)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // আপনার প্রজেক্ট স্ট্রাকচার অনুযায়ী 'public/uploads/Tours' ব্যবহার করা নিরাপদ
        const dir = 'public/uploads/Tours'; 
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // ফাইলের নাম ইউনিক করার জন্য Timestamp + Original Name ব্যবহার করা হয়েছে
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // ৫ মেগাবাইট লিমিট
});

// --- Routes ---

// সব প্যাকেজ দেখা
router.get('/', packageController.getAllPackages);

// নতুন প্যাকেজ যোগ করা
router.post('/add', upload.single('image'), packageController.addPackage);

// ২. Toggle Recommended (Logic optimized)
// কনসোলের ৫00 এরর ফিক্স করার জন্য এখানে 'db' ইমপোর্ট নিশ্চিত করা হয়েছে
router.put('/toggle-recommended/:id', (req, res) => {
    const { id } = req.params;
    
    // SQL: ১ থাকলে ০ হবে, ০ থাকলে ১ হবে
    const sql = "UPDATE tour_packages SET is_recommended = CASE WHEN is_recommended = 1 THEN 0 ELSE 1 END WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Toggle Error:", err);
            return res.status(500).json({ error: "Database update failed" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Package not found" });
        }
        res.json({ message: "Recommended status updated successfully" });
    });
});

// প্যাকেজ আপডেট
router.put('/update/:id', upload.single('image'), packageController.updatePackage);

// প্যাকেজ ডিলিট
router.delete('/delete/:id', packageController.deletePackage);

module.exports = router;