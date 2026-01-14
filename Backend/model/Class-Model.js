const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    Class: { type: String, required: true, unique: true },
    Division: { type: String, required: true },
    AcademicYear: { type: String, required: true }
});

module.exports = mongoose.model('Class', ClassSchema);