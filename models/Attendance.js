const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Present', 'Absent', 'On Leave'], required: true },
  overtimeHours: { type: Number, default: 0 },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
