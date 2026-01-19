const express = require('express');
const router = express.Router();
const Student = require('../controllers/Student-Controller');
const { auth, allow } = require("../middleware/auth");

router.post('/submit-leave', auth, allow("Student"), Student.submitLeave);
router.get('/attendance', auth, allow("Student"), Student.getStudentAttendance);
router.get('/marks', auth, allow("Student"), Student.getStudentMarks);
router.get('/leaves', auth, allow("Student"), Student.getStudentLeaves);

module.exports = router;