const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  permissions: {
    type: [String],
    default: ["view_all", "manage_students", "manage_teachers"]
  }
});

export default mongoose.model("Admin", adminSchema);
