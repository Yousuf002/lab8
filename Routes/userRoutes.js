const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const auth = require('../Middleware/auth');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected routes
router.get('/me', auth, userController.getUserProfile);
router.put('/me', auth, userController.updateUserProfile);

module.exports = router;
