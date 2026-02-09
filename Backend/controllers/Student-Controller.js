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

    const attendance = await Attendance.find({
      studentId: { $in: [studentProfile._id, userId] }
    })
      .populate('teacherId', 'username')
      .sort({ date: -1 })


    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentMarks = async (req, res) => {
  try {
    // get student user id from auth middleware
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        error: 'Student not authenticated'
      });
    }
    const studentProfile = await StudentProfile.findOne({ userId });
    if (!studentProfile) {
      return res.status(404).json({ error: 'Student profile not found' });
    }

    const examData = await ExamMark.find({
      studentId: { $in: [studentProfile._id, userId] }
    })
      .populate('studentId', 'username')
      .sort({ subject: 1, examType: 1, marks: -1 });
    console.log(examData);



    // return empty array if no marks found (safe for frontend)
    return res.status(200).json(examData);

  } catch (error) {
    console.error('Error fetching student marks:', error);
    return res.status(500).json({
      error: 'Failed to fetch marks'
    });
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
    const myTotalDays = await Attendance.countDocuments({
      studentId: { $in: [studentId, userId] }
    });
    const myPresentDays = await Attendance.countDocuments({
      studentId: { $in: [studentId, userId] },
      status: 'Present'
    });
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