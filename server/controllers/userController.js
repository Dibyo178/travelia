const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      
        const dir = 'Uploads/User'; 
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
     
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 } 
}).single('image');

exports.uploadImage = upload;

exports.getAllUsers = (req, res) => {
    const sql = "SELECT id, name, email, role, image FROM users ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(data);
    });
};


exports.addUser = (req, res) => {
    const { name, email, role, password } = req.body; 

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


exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ message: "User deleted successfully" });
    });
};


exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT id, name, email, role, image FROM users WHERE email = ? AND password = ?";
    
    db.query(sql, [email, password], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        
        if (result.length > 0) {
        
            return res.status(200).json({ user: result[0] }); 
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    }); 
};