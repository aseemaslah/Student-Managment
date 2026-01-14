const express = require('express');
const router = express.Router();
const Student = require('../controllers/Student-Controller');
const { auth, allow } = require("../middleware/auth");


// Route to add a new admin
router.get("/attendance", auth, allow("Student"), Student.myAttendance);
router.get("/marks", auth, allow("Student"), Student.myMarks);
router.post("/leave", auth, allow("Student"), Student.requestLeave);


module.exports = router;