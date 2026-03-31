const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST request for /api/contacts
router.post('/', (req, res) => {
    const { from_location, to_location, journey_date, guests, budget } = req.body;


    const sql = "INSERT INTO contacts (from_location, to_location, journey_date, guests, budget) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [from_location, to_location, journey_date, guests, budget], (err, result) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ status: "Success", message: "Data saved!" });
    });
});

router.get('/', (req, res) => {
    const sql = "SELECT * FROM contacts ORDER BY id DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ error: "error fetch data get" });
        }
        res.status(200).json(results);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM contacts WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: "Deleted" });
    });
});

module.exports = router;