const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: String,
  class: String,
  division: String,
  rollNo: String,

  attendance: [
    {
      date: Date,
      status: {
        type: String,
        enum: ["present", "absent"]
      }
    }
  ],

  marks: [
    {
      subject: String,
      score: Number,
      total: Number
    }
  ]
});

export default mongoose.model("Student", studentSchema);