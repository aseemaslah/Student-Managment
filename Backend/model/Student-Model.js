const mongoose = require("mongoose");

const StudentProfile = new mongoose.Schema({
  userId:{ type:mongoose.Schema.Types.ObjectId, ref:"User" },
  rollNo:{ type:String, required:true },
  classId:{ type:mongoose.Schema.Types.ObjectId, ref:"Class" }
});

module.exports = mongoose.model("StudentProfile", StudentProfile);
