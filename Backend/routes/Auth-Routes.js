const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth-Controller');

// Route to add a new admin
router.post("/login", AuthController.login);

module.exports = router;