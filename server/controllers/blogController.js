const db = require('../config/db');


exports.getBlogs = (req, res) => {
    db.query("SELECT * FROM blogs ORDER BY created_at DESC", (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(result);
    });
};

exports.addBlog = (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null; 

    const sql = "INSERT INTO blogs (title, content, image) VALUES (?, ?, ?)";
    db.query(sql, [title, content, image], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Blog added successfully" });
    });
};

// blogController.js
exports.getBlogById = (req, res) => {
    const { id } = req.params;
    // Database query check id into column and return data if exist otherwise return not found message
    const sql = "SELECT * FROM blogs WHERE id = ?"; 
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json(err);
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(result[0]);
    });
};