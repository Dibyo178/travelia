const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const multer = require('multer');
const path = require('path');

// ইমেজ স্টোরেজ কনফিগারেশন
const storage = multer.diskStorage({
    destination: './Uploads/Blog/', 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// ১. সব ব্লগ পাওয়ার জন্য
router.get('/', blogController.getBlogs);

// ২. নির্দিষ্ট একটি ব্লগ (ID দিয়ে) পাওয়ার জন্য (এটি অ্যাড করতে হবে)
router.get('/:id', blogController.getBlogById); 

// ৩. নতুন ব্লগ অ্যাড করার জন্য
router.post('/add', upload.single('image'), blogController.addBlog);

module.exports = router;