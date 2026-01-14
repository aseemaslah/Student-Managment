const express = require('express');
const router = express.Router();
const Teacher = require('../controllers/Teacher-Controller');
const { auth, allow } = require("../middleware/auth");


// Route to add a new admin
router.post("/add-student", auth, allow("Teacher"), Teacher.addStudent);
router.post("/attendance", auth, allow("Teacher"), Teacher.markAttendance);
router.post("/marks", auth, allow("Teacher"), Teacher.addMarks);


module.exports = router;