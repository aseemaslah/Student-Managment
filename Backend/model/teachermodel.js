const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  employeeId: String,

  subjectsTaught: [String],
  classesAssigned: [String]
});

export default mongoose.model("Teacher", teacherSchema);
