const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: './Uploads/Blog/', 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


router.get('/', blogController.getBlogs);


router.get('/:id', blogController.getBlogById); 


router.post('/add', upload.single('image'), blogController.addBlog);

module.exports = router;