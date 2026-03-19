const db = require('../config/db');

// সব ব্লগ পাওয়ার জন্য
exports.getBlogs = (req, res) => {
    db.query("SELECT * FROM blogs ORDER BY created_at DESC", (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(result);
    });
};

// নতুন ব্লগ অ্যাড করার জন্য (Admin Panel থেকে)
exports.addBlog = (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null; // ফাইলের নাম স্টোর হবে

    const sql = "INSERT INTO blogs (title, content, image) VALUES (?, ?, ?)";
    db.query(sql, [title, content, image], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Blog added successfully" });
    });
};