const User = require("../model/User-Model");
const StudentProfile = require("../model/Student-Model");
const Attendance = require("../model/Attendance-Model");
const ExamMark = require("../model/Exam-Marks-Model");
const Class = require("../model/Class-Model");
const Leave = require("../model/Leave-Model");
const bcrypt = require("bcryptjs");

const addStudent = async (req, res) => {
  try {
    console.log('=== CREATE STUDENT REQUEST ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    const { username, password, rollNo, classId } = req.body;

    if (!username || !password || !rollNo || !classId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: `Username '${username}' already exists. Please choose a different username.` });
    }

    // Check if roll number already exists in the same class
    const existingStudent = await StudentProfile.findOne({ rollNo, classId });
    if (existingStudent) {
      return res.status(400).json({ error: `Roll number '${rollNo}' already exists in this class.` });
    }

    // Create user account
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username.toUpperCase().trim(),
      password: hash,
      role: "Student"
    });
    console.log('User created:', user._id);

    // Create student profile
    const studentProfile = await StudentProfile.create({
      userId: user._id,
      rollNo,
      classId
    });
    console.log('Student profile created:', studentProfile);

    res.json({ message: "Student created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      if (error.message.includes('username')) {
        return res.status(400).json({ error: 'Username already exists. Please choose a different username.' });
      }
      return res.status(400).json({ error: 'Duplicate entry found.' });
    }

    res.status(500).json({ error: error.message });
  }
};

const getStudents = async (req, res) => {
  const assignedClass = await Class.findOne({ assignedTeacher: req.user.id });
  if (!assignedClass) return res.status(404).json({ error: "No class assigned to teacher" });

  const students = await StudentProfile.find({ classId: assignedClass._id })
    .populate('userId', 'username')
    .populate('classId', 'Class Division AcademicYear');
  res.json(students);
};

const markAttendance = async (req, res) => {
  try {
    console.log('=== MARK ATTENDANCE REQUEST ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('JWT User:', req.user);

    const { studentId, date, status } = req.body;
    const teacherId = req.user?.id; // Get teacher ID from JWT

    if (!studentId || !teacherId || !date || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if attendance already marked for this student on this date
    const existingAttendance = await Attendance.findOne({ studentId, date });
    if (existingAttendance) {
      // Update existing attendance
      existingAttendance.status = status;
      existingAttendance.teacherId = teacherId;
      await existingAttendance.save();
      console.log('Attendance updated:', existingAttendance);
      return res.json({ message: "Attendance updated successfully" });
    }

    const attendanceRecord = await Attendance.create({ studentId, teacherId, date, status });
    // console.log('Attendance marked successfully:', attendanceRecord);
    res.json({ message: "Attendance marked successfully" });
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
};

const viewAttendance = async (req, res) => {
  const attendance = await Attendance.find({ teacherId: req.user.id })
    .populate({
      path: 'studentId',
      populate: { path: 'userId', select: 'username' }
    })
    .sort({ date: -1 });
  res.json(attendance);
};

const addMarks = async (req, res) => {
  try {
    const { studentId, subject, examType, marks, total } = req.body;

    // Validate required fields
    if (!studentId || !subject || !examType || marks === undefined || !total) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create exam mark record
    await ExamMark.create({
      studentId,
      subject,
      examType,
      marks: Number(marks),
      total: Number(total)
    });

    res.json({ message: "Marks saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const DeleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const studentProfile = await StudentProfile
      .findByIdAndDelete(id);
    if (!studentProfile) {
      return res.status(404).json({ error: 'Student profile not found' });
    }
    await User.findByIdAndDelete(studentProfile.userId);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params; // This is the StudentProfile ID
    const { username, password, rollNo, classId } = req.body;

    // Find the student profile
    const studentProfile = await StudentProfile.findById(id);
    if (!studentProfile) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update User credentials if provided
    const userUpdateData = {};
    if (username) {
      // Check if username is already taken by another user
      const existingUser = await User.findOne({
        username: username.toLowerCase().trim(),
        _id: { $ne: studentProfile.userId } // Exclude current user
      });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      userUpdateData.username = username.toLowerCase().trim();
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userUpdateData.password = hashedPassword;
    }

    // Update user if there are changes
    if (Object.keys(userUpdateData).length > 0) {
      await User.findByIdAndUpdate(studentProfile.userId, userUpdateData);
    }

    // Update student profile if rollNo or classId provided
    const profileUpdateData = {};
    if (rollNo) profileUpdateData.rollNo = rollNo;
    if (classId) profileUpdateData.classId = classId;

    if (Object.keys(profileUpdateData).length > 0) {
      // Check if new roll number conflicts in the class
      if (rollNo) {
        const existingStudent = await StudentProfile.findOne({
          rollNo,
          classId: classId || studentProfile.classId,
          _id: { $ne: id }
        });
        if (existingStudent) {
          return res.status(400).json({ error: 'Roll number already exists in this class' });
        }
      }
      await StudentProfile.findByIdAndUpdate(id, profileUpdateData);
    }

    res.json({ message: 'Student updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentLeaves = async (req, res) => {
  try {
    const teacherId = req.user.id;
    // Find classes assigned to this teacher
    const teacherClasses = await Class.find({ assignedTeacher: teacherId });

    if (teacherClasses.length === 0) {
      return res.status(404).json({ error: "No class assigned to teacher" });
    }

    const classIds = teacherClasses.map(cls => cls._id);

    // Find students in these classes
    const studentsInClasses = await StudentProfile.find({ classId: { $in: classIds } });
    const studentProfileIds = studentsInClasses.map(s => s._id);

    const leaves = await Leave.find({ studentId: { $in: studentProfileIds } })
      .populate({
        path: 'studentId',
        populate: [
          { path: 'userId', select: 'username' },
          { path: 'classId', select: 'Class Division' }
        ]
      })
      .sort({ submittedAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
    if (!leave) {
      return res.status(404).json({ error: "Leave request not found" });
    }

    res.json({ message: `Leave ${status.toLowerCase()} successfully`, data: leave });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addStudent,
  getStudents,
  markAttendance,
  viewAttendance,
  addMarks,
  DeleteStudent,
  updateStudent,
  getStudentLeaves,
  updateLeaveStatus
};