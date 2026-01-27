const mongoose = require("mongoose");

const Attendance = new mongoose.Schema({
  studentId:{ type:mongoose.Schema.Types.ObjectId, ref:"StudentProfile" },
  studentName:{ type:String, required:true },
  teacherId:{ type:mongoose.Schema.Types.ObjectId, ref:"User" },
  date:{ type:Date, required:true },
  status:{ type:String, enum:["Present","Absent"], required:true }
});

module.exports = mongoose.model("Attendance", Attendance);
