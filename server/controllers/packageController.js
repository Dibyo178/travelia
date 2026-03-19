const db = require('../config/db');
const fs = require('fs'); // ফাইল সিস্টেম মডিউল যোগ করুন
const path = require('path'); // পাথ মডিউল যোগ করুন

// সব প্যাকেজ লিস্ট আনা (Design same)
exports.getAllPackages = (req, res) => {
    const sql = "SELECT * FROM tour_packages ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json(data);
    });
};

// নতুন প্যাকেজ যোগ করা (Design same)
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

// ৩. রিকমেন্ডেড স্ট্যাটাস টগল (Swipe Button) (Design same)
// ৩. রিকমেন্ডেড স্ট্যাটাস টগল (Backend)
exports.toggleRecommended = (req, res) => {
    const { id } = req.params;
    
    // ১. প্রথমে বর্তমান স্ট্যাটাস চেক করুন
    const selectQuery = "SELECT is_recommended FROM tour_packages WHERE id = ?";
    db.query(selectQuery, [id], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Server Error");
        }

        if (result.length > 0) {
            // ২. স্ট্যাটাস টগল করুন (১ থাকলে ০, ০ থাকলে ১)
            const currentStatus = result[0].is_recommended;
            const newStatus = currentStatus === 1 ? 0 : 1;

            // ৩. নতুন স্ট্যাটাস আপডেট করুন
            const updateQuery = "UPDATE tour_packages SET is_recommended = ? WHERE id = ?";
            db.query(updateQuery, [newStatus, id], (err, updateResult) => {
                if (err) {
                    console.error("Update Error:", err);
                    return res.status(500).send("Update Failed");
                }
                // সাকসেস রেসপন্স পাঠান
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
// ৪. প্যাকেজ আপডেট করা (Shorter Code with old image delete)
// আপনার ব্যাকএন্ডের updatePackage কন্ট্রোলারে এটি চেক করুন
// আপনার ব্যাকএন্ডের updatePackage কন্ট্রোলারে এটি চেক করুন
// আপনার কন্ট্রোলার ফাইলে নিচের মতো লজিক নিশ্চিত করুন
exports.updatePackage = (req, res) => {
    const { id } = req.params;
    const { title, location, price, days, nights, countries, is_recommended } = req.body;
    
    // ডাটাবেস tinyint(1) এর জন্য মান নিশ্চিত করা (০ অথবা ১)
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

// ৫. প্যাকেজ ডিলিট করা (ইমেজ সহ ডিলিট)
exports.deletePackage = (req, res) => {
    const { id } = req.params;
    
    // প্রথমে ইমেজের নামটা তুলে নিয়ে আসা
    db.query("SELECT image FROM tour_packages WHERE id = ?", [id], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (data.length > 0) {
            const imageName = data[0].image;
            // ফোল্ডার থেকে ফাইল ডিলিট
            if (imageName && imageName.startsWith('/Uploads')) {
                const filePath = path.join(__dirname, '..', imageName);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
        }

        // ডাটাবেস থেকে ডিলিট
        db.query("DELETE FROM tour_packages WHERE id = ?", [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: "Package and Image removed!" });
        });
    });
};