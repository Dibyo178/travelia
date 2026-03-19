const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// লগইন রাউট - এটি ছাড়া লগইন কাজ করবে না
router.post('/login', userController.loginUser); 

router.get('/', userController.getAllUsers);
router.post('/add', userController.uploadImage, userController.addUser);
router.put('/update/:id', userController.uploadImage, userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;