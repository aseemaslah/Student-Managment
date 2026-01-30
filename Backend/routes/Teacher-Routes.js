const express = require('express');
const router = express.Router();
const Teacher = require('../controllers/Teacher-Controller');
const { auth, allow } = require("../middleware/auth");


// Route to add a new admin
router.post("/add-student", auth, allow("Teacher"), Teacher.addStudent);
router.get("/students", auth, allow("Teacher"), Teacher.getStudents);
router.post("/attendance", auth, allow("Teacher"), Teacher.markAttendance);
router.get("/attendance", auth, allow("Teacher"), Teacher.viewAttendance);
router.post("/marks", auth, allow("Teacher"), Teacher.addMarks);
router.put("/update-student/:id", auth, allow("Teacher"), Teacher.updateStudent);
router.delete("/delete-student/:id", auth, allow("Teacher"), Teacher.DeleteStudent);


module.exports = router;