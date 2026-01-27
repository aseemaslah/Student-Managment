const User = require("../model/User-Model");
const StudentProfile = require("../model/Student-Model");
const Attendance = require("../model/Attendance-Model");
const ExamMark = require("../model/Exam-Marks-Model");
const Class = require("../model/Class-Model");
const bcrypt = require("bcryptjs");

const addStudent = async(req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10);
  const user = await User.create({ username:req.body.username, password:hash, role:"Student" });

  await StudentProfile.create({ userId:user._id, rollNo:req.body.rollNo, classId:req.body.classId });
  res.json("Student added");
};

const getStudents = async(req,res)=>{
  const assignedClass = await Class.findOne({ assignedTeacher: req.user.id });
  if (!assignedClass) return res.status(404).json({ error: "No class assigned to teacher" });
  
  const students = await StudentProfile.find({ classId: assignedClass._id }).populate('userId', 'username');
  res.json(students);
};

const markAttendance = async(req,res)=>{
  const { studentName, date, status } = req.body;
  const user = await User.findOne({ username: studentName });
  if (!user) return res.status(404).json({ error: "Student not found" });
  
  const student = await StudentProfile.findOne({ userId: user._id });
  if (!student) return res.status(404).json({ error: "Student profile not found" });
  
  await Attendance.create({ studentId: student._id, studentName: user.username, teacherId: req.user.id, date, status });
  res.json("Attendance saved");
};

const viewAttendance = async(req,res)=>{
  const attendance = await Attendance.find({ teacherId: req.user.id })
    .populate({
      path: 'studentId',
      populate: { path: 'userId', select: 'username' }
    })
    .sort({ date: -1 });
  res.json(attendance);
};

const addMarks = async(req,res)=>{
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

module.exports = { addStudent, getStudents, markAttendance, viewAttendance, addMarks };
