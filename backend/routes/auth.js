// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Register a new user
router.post('/register', AuthController.register);

// Login
router.post('/login', AuthController.login);

module.exports = router;
