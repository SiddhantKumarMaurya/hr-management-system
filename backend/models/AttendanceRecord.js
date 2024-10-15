// models/AttendanceRecord.js
const mongoose = require('mongoose');

const attendanceRecordSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    checkIn: {
        type: Date,
        default: Date.now
    },
    checkOut: {
        type: Date
    },
    overtimeHours: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('AttendanceRecord', attendanceRecordSchema);
