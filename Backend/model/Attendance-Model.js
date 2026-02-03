const mongoose = require("mongoose");

const Attendance = new mongoose.Schema({
  studentId:{ type:mongoose.Schema.Types.ObjectId, ref:"StudentProfile" },
  teacherId:{ type:mongoose.Schema.Types.ObjectId, ref:"User" },
  date:{ type:Date, required:true },
  status:{ type:String, enum:["Present","Absent"], required:true }
});

module.exports = mongoose.model("Attendance", Attendance);
