const User = require("../model/User-Model");
const StudentProfile = require("../model/Student-Model");
const Attendance = require("../model/Attendance-Model");
const ExamMark = require("../model/Exam-Marks-Model");
const bcrypt = require("bcryptjs");

const addStudent = async(req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10);
  const user = await User.create({ username:req.body.username, password:hash, role:"Student" });

  await StudentProfile.create({ userId:user._id, rollNo:req.body.rollNo, classId:req.body.classId });
  res.json("Student added");
};

const markAttendance = async(req,res)=>{
  await Attendance.create({ ...req.body, teacherId:req.user.id });
  res.json("Attendance saved");
};

const addMarks = async(req,res)=>{
  await ExamMark.create(req.body);
  res.json("Marks saved");
};

module.exports = { addStudent, markAttendance, addMarks };
