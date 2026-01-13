const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({

    Name : {
        type: String,
        required: true,
    },
    Subject : {
        type: String,
        required: true,
    },  
    Experience : {
        type: Number,
        required: true,
    },
    Email : {
        type: String,
        required: true,
    },
    Password : {
        type: String,
        required: true,
    },
    
});

module.exports = mongoose.model('Teacher', TeacherSchema);