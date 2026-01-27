const User = require("../model/User-Model");
const StudentProfile = require("../model/Student-Model");
const Leave = require("../model/Leave-Model");
const Attendance = require("../model/Attendance-Model");
const ExamMark = require("../model/Exam-Marks-Model");

const submitLeave = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Student not authenticated' });
    }

    // Get student profile
    const studentProfile = await StudentProfile.findOne({ userId });
    if (!studentProfile) {
      return res.status(404).json({ error: 'Student profile not found' });
    }

    const { startDate, endDate, reason } = req.body;
    
    const leave = await Leave.create({
      studentId: studentProfile._id,
      startDate,
      endDate,
      reason
    });

    res.json({ message: "Leave request submitted successfully", data: leave });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentAttendance = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Student not authenticated' });
    }

    // Get student profile
    const studentProfile = await StudentProfile.findOne({ userId });
    if (!studentProfile) {
      return res.status(404).json({ error: 'Student profile not found' });
    }

    const attendance = await Attendance.find({ studentId: studentProfile._id })
      .populate('teacherId', 'username')
      .sort({ date: -1 });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentMarks = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Student not authenticated' });
    }

    // Find marks directly using userId since ExamMark.studentId references User model
    const marks = await ExamMark.find({ studentId: userId })
      .sort({ examType: 1, subject: 1 });

    res.json(marks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentLeaves = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Student not authenticated' });
    }

    // Get student profile
    const studentProfile = await StudentProfile.findOne({ userId });
    if (!studentProfile) {
      return res.status(404).json({ error: 'Student profile not found' });
    }

    const leaves = await Leave.find({ studentId: studentProfile._id })
      .sort({ submittedAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Student not authenticated" });
    }

    // Get student profile and populate class information
    const studentProfile = await StudentProfile.findOne({ userId }).populate('classId');
    if (!studentProfile) {
      return res.status(404).json({ error: "Student profile not found" });
    }

    const studentId = studentProfile._id;
    const classId = studentProfile.classId?._id;

    // Get number of classmates
    const classmates = await StudentProfile.countDocuments({ classId: classId, _id: { $ne: studentId } });

    // Get attendance stats
    const myTotalDays = await Attendance.countDocuments({ studentId });
    const myPresentDays = await Attendance.countDocuments({ studentId, status: 'Present' });
    const myAttendancePercentage = myTotalDays > 0 ? (myPresentDays / myTotalDays) * 100 : 0;

    res.json({
      myClass: studentProfile.classId,
      classmates,
      myTotalDays,
      myPresentDays,
      myAttendancePercentage: myAttendancePercentage.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { submitLeave, getStudentAttendance, getStudentMarks, getStudentLeaves, getDashboardStats };