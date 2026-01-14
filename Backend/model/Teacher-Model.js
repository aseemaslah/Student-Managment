const mongoose = require('mongoose');
const TeacherSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    EmployeeID: { type: String, required: true, unique: true },
    Subjects: [{ type: String }]
});
module.exports = mongoose.model('Teacher', TeacherSchema);