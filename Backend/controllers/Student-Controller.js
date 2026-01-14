const Attendance = require("../model/Attendance-Model");
const ExamMark = require("../model/Exam-Marks-Model");
const Leave = require("../model/Leave-Model");

const myAttendance = async(req,res)=>{
  res.json(await Attendance.find({ studentId:req.user.id }));
};

const myMarks = async(req,res)=>{
  res.json(await ExamMark.find({ studentId:req.user.id }));
};

const requestLeave = async(req,res)=>{
  await Leave.create({ ...req.body, studentId:req.user.id });
  res.json("Leave sent");
};

module.exports = { myAttendance, myMarks, requestLeave };
