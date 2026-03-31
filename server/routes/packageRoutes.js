const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/db');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
   
        const dir = 'public/uploads/Tours'; 
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});

// --- Routes ---


router.get('/', packageController.getAllPackages);


router.post('/add', upload.single('image'), packageController.addPackage);

// Toggle Recommended (Logic optimized)

router.put('/toggle-recommended/:id', (req, res) => {
    const { id } = req.params;
    
 
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


router.put('/update/:id', upload.single('image'), packageController.updatePackage);

router.delete('/delete/:id', packageController.deletePackage);
// packageRoutes.js (Backend)
router.get('/:id', packageController.getPackageById);
module.exports = router;