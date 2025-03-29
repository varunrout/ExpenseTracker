// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Existing
router.post('/register', authController.register);
router.post('/login', authController.login);

// TEST method: show stored/hashed password
router.post('/forgot-password-show', authController.forgotPasswordShow);

// Real method: change password (in a real app, user must be logged in or have a reset token)
router.post('/change-password', /* authMiddleware, */ authController.changePassword);

module.exports = router;
