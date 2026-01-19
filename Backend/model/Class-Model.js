const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    Class: { type: String, required: true },
    Division: { type: String, required: true },
    AcademicYear: { type: String, required: true },
    assignedTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subjects: [{ type: String }]
}, {
    collection: 'classes'
});

ClassSchema.index({ Class: 1, Division: 1, AcademicYear: 1 }, { unique: true });

module.exports = mongoose.model('Class', ClassSchema);