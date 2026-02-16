const mongoose = require('mongoose');
const TeacherSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    // subjects: [{ type: String }],
    // assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', default: null }
});
module.exports = mongoose.model('Teacher', TeacherSchema);