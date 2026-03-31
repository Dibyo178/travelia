const db = require('../config/db');
const fs = require('fs'); 
const path = require('path');

exports.getAllPackages = (req, res) => {
    const sql = "SELECT * FROM tour_packages ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json(data);
    });
};


exports.addPackage = (req, res) => {
    const { title, location, price, days, nights, countries, is_recommended } = req.body;
    const imagePath = req.file ? `/Uploads/Tours/${req.file.filename}` : null;

    const sql = `INSERT INTO tour_packages 
    (title, location, price, days, nights, countries, image, is_recommended) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [title, location, price, days, nights, countries, imagePath, is_recommended === 'true' ? 1 : 0];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        return res.status(201).json({ message: "Package published!", id: result.insertId });
    });
};


exports.toggleRecommended = (req, res) => {
    const { id } = req.params;
    
    const selectQuery = "SELECT is_recommended FROM tour_packages WHERE id = ?";
    db.query(selectQuery, [id], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Server Error");
        }

        if (result.length > 0) {
           
            const currentStatus = result[0].is_recommended;
            const newStatus = currentStatus === 1 ? 0 : 1;
            
            const updateQuery = "UPDATE tour_packages SET is_recommended = ? WHERE id = ?";
            db.query(updateQuery, [newStatus, id], (err, updateResult) => {
                if (err) {
                    console.error("Update Error:", err);
                    return res.status(500).send("Update Failed");
                }
            
                res.status(200).json({ 
                    message: "Success", 
                    is_recommended: newStatus 
                });
            });
        } else {
            res.status(404).send("Package not found");
        }
    });
};

exports.updatePackage = (req, res) => {
    const { id } = req.params;
    const { title, location, price, days, nights, countries, is_recommended } = req.body;

    const recommendedValue = (is_recommended == 1 || is_recommended === true) ? 1 : 0;

    const sql = "UPDATE tour_packages SET title=?, location=?, price=?, days=?, nights=?, countries=?, is_recommended=? WHERE id=?";
    
    db.query(sql, [title, location, price, days, nights, countries, recommendedValue, id], (err, result) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ error: "Database update failed" });
        }
        res.status(200).json({ message: "Updated successfully", status: recommendedValue });
    });
};


// packageController.js
exports.getPackageById = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM tour_packages WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "Not found" });
        res.status(200).json(result[0]);
    });
};

exports.deletePackage = (req, res) => {
    const { id } = req.params;
    

    db.query("SELECT image FROM tour_packages WHERE id = ?", [id], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (data.length > 0) {
            const imageName = data[0].image;
          
            if (imageName && imageName.startsWith('/Uploads')) {
                const filePath = path.join(__dirname, '..', imageName);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
        }


        db.query("DELETE FROM tour_packages WHERE id = ?", [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: "Package and Image removed!" });
        });
    });
};