
const express = require('express');
const router = express.Router();
const Admin = require('../controllers/Admin-Controller');
const { auth, allow } = require("../middleware/auth");

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Admin routes working' });
});

router.post("/create-admin",  Admin.createAdmin);
router.post("/create-teacher", Admin.createTeacher);
router.post("/create-student", Admin.createStudent);
router.post("/create-class", Admin.createClass);
router.post("/assign-teacher", Admin.assignTeacher);
router.post("/mark-attendance", auth, Admin.markAttendance);
router.post("/add-exam-marks", Admin.addExamMarks);
router.get("/teachers", Admin.getTeachers);
router.get("/classes", Admin.getClasses);
router.get("/students", Admin.getStudents);
router.get("/teacher-classes", auth, Admin.getTeacherClasses);
router.get("/teacher-students", auth, Admin.getTeacherStudents);
router.get("/teacher-attendance-report", auth, Admin.getTeacherAttendanceReport);
router.get("/teacher-class-summary", auth, Admin.getTeacherClassSummary);
router.get("/dashboard-stats", Admin.getDashboardStats);
router.get("/teacher-dashboard-stats", auth, Admin.getTeacherDashboardStats);
router.get("/student-dashboard-stats", auth, Admin.getStudentDashboardStats);
router.get("/exam-report", Admin.getExamReport);

module.exports = router;