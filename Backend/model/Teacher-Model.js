const mongoose = require('mongoose');
const TeacherSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    EmployeeID: { type: String, required: true, unique: true },
    Subjects: [{ type: String }],
    AssignedClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', default: null }
});
module.exports = mongoose.model('Teacher', TeacherSchema);