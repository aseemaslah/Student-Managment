
const express = require('express');
const router = express.Router();
const Admin = require('../controllers/Admin-Controller');
const { auth, allow } = require("../middleware/auth");



router.post("/create-admin",  Admin.createAdmin);
router.post("/create-teacher",  Admin.createTeacher);
router.post("/create-class", auth, allow("Admin"), Admin.createClass);

module.exports = router;