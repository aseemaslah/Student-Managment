const mongoose = require("mongoose");

const ExamMark = new mongoose.Schema({
  studentId:{ type:mongoose.Schema.Types.ObjectId, ref:"User" },
  subject:{ type:String, required:true },
  examType:{ type:String, required:true },
  marks:{ type:Number, required:true },
  total:{ type:Number, required:true }
});

module.exports = mongoose.model("ExamMark", ExamMark);
