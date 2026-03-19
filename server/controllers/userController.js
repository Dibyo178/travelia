const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ইমেজ সেভ করার কনফিগারেশন
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // আপনার প্রজেক্ট স্ট্রাকচার অনুযায়ী পাথটি চেক করা হচ্ছে
        // রুট লেভেলে 'Uploads/User' ফোল্ডার ব্যবহার করা সবচেয়ে নিরাপদ
        const dir = 'Uploads/User'; 
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // ফাইলের নাম ইউনিক করার জন্য Timestamp ব্যবহার
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 } // ২ মেগাবাইট লিমিট
}).single('image');

exports.uploadImage = upload;

// ১. সব ইউজার গেট করা
exports.getAllUsers = (req, res) => {
    const sql = "SELECT id, name, email, role, image FROM users ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(data);
    });
};

// ২. নতুন ইউজার অ্যাড
exports.addUser = (req, res) => {
    const { name, email, role, password } = req.body; 
    
    // ডাটাবেসে ইমেজ পাথ সেভ করার সময় 'public' বাদ দিন
    // যাতে ফ্রন্টএন্ড সহজে এক্সেস করতে পারে
    const image = req.file ? `/Uploads/User/${req.file.filename}` : null; 
    
    const sql = "INSERT INTO users (name, email, role, password, image) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [name, email, role, password, image], (err, result) => {
        if (err) {
            console.error("Insert Error:", err);
            return res.status(500).json({ error: "Failed to register user" });
        }
        return res.status(201).json({ message: "User registered successfully" });
    });
};

// ৩. ইউজার আপডেট
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    
    let sql = "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?";
    let params = [name, email, role, id];

    if (req.file) {
        const imagePath = `/Uploads/User/${req.file.filename}`;
        sql = "UPDATE users SET name = ?, email = ?, role = ?, image = ? WHERE id = ?";
        params = [name, email, role, imagePath, id];
    }
    
    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json({ message: "User updated successfully" });
    });
};

// ৪. ইউজার ডিলিট
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ message: "User deleted successfully" });
    });
};

// ৫. লগইন ফাংশন (যেটি আপনার 404 এরর ফিক্স করবে)
exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT id, name, email, role, image FROM users WHERE email = ? AND password = ?";
    
    db.query(sql, [email, password], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        
        if (result.length > 0) {
            // ডাটাটিকে একটি 'user' অবজেক্টের ভেতরে পাঠান যাতে ফ্রন্টএন্ডের সাথে মিলে যায়
            return res.status(200).json({ user: result[0] }); 
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    }); 
};