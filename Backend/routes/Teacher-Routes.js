const express = require('express');
const router = express.Router();
const Teacher = require('../controllers/Teacher-Controller');
const { auth, allow } = require("../middleware/auth");


// Route to add a new admin
router.post("/add-student", auth, allow("Teacher"), Teacher.addStudent);
router.get("/students", auth, allow("Teacher"), Teacher.getStudents);
router.post("/addattendance", auth, allow("Teacher"), Teacher.markAttendance);
router.post("/bulk-attendance", auth, allow("Teacher"), Teacher.bulkMarkAttendance);

router.get("/attendance", auth, allow("Teacher"), Teacher.viewAttendance);
router.post("/marks", auth, allow("Teacher"), Teacher.addMarks);
router.put("/update-student/:id", auth, allow("Teacher"), Teacher.updateStudent);
router.delete("/delete-student/:id", auth, allow("Teacher"), Teacher.DeleteStudent);
router.get("/leaves", auth, allow("Teacher"), Teacher.getStudentLeaves);
router.put("/leaves/:id/status", auth, allow("Teacher"), Teacher.updateLeaveStatus);
router.get("/teacher-attendance-report", auth, allow("Teacher"), Teacher.getTeacherAttendanceReport);
router.get("/teacher-class-summary", auth, allow("Teacher"), Teacher.getTeacherClassSummary);
router.post("/bulk-marks", auth, allow("Teacher"), Teacher.bulkAddMarks);
module.exports = router;