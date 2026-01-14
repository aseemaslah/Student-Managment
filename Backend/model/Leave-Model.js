const mongpoose = require('mongoose');

const LeaveSchema = new mongpoose.Schema({
    StudentID: { type: mongpoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    StartDate: { type: Date, required: true },
    EndDate: { type: Date, required: true },
    Reason: { type: String, required: true },
    Status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
});
module.exports = mongpoose.model('Leave', LeaveSchema);