const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: true,
    },
    Age : {
        type: Number,
        required: true,
    },
    Class : {
        type: String,
        required: true,
    },
    Divition : {
        type: String,
        required: true,
    },
    RollNumber : {
        type: String,
        required: true,
    },
    Attendance : {
        type: Number,
        required: true,
    },
    marks : {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Student', StudentSchema);