
const express = require('express');
const router = express.Router();
const Admin = require('../controllers/Admin-Controller');
const { auth, allow } = require("../middleware/auth");


router.post("/create-admin", auth, allow("Admin"), Admin.createAdmin);
router.post("/create-teacher", auth, allow("Admin"), Admin.createTeacher);
router.post("/create-class", auth, allow("Admin"), Admin.createClass);
router.post("/assign-teacher", auth, allow("Admin"), Admin.assignTeacher);
// router.post("/mark-attendance",auth, allow("Admin"), Admin.markAttendance);
router.post("/add-exam-marks", auth, allow("Admin"), Admin.addExamMarks);
router.get("/teachers", Admin.getTeachers);
router.get("/classes", Admin.getClasses);
router.get("/students", Admin.getStudents);
router.get("/teacher-classes", auth, Admin.getTeacherClasses);
// router.get("/teacher-students", auth, Admin.getTeacherStudents);
// router.get("/teacher-attendance-report", auth, Admin.getTeacherAttendanceReport);
router.get("/teacher-class-summary", auth, Admin.getTeacherClassSummary);
router.get("/dashboard-stats", Admin.getDashboardStats);
router.get("/teacher-dashboard-stats", auth, Admin.getTeacherDashboardStats);
// router.get("/student-dashboard-stats", auth, Admin.getStudentDashboardStats);
// router.get("/exam-report", Admin.getExamReport);
router.get("/admins", auth, allow("Admin"), Admin.getAdmins);
router.put("/update-admin/:id", auth, allow("Admin"), Admin.updateAdmin);
router.delete("/delete-admin/:id", auth, allow("Admin"), Admin.deleteAdmin);
router.put("/update-teacher/:id", auth, allow("Admin"), Admin.updateTeacher);
router.delete("/delete-teacher/:id", auth, allow("Admin"), Admin.DeleteTeacher);



module.exports = router;