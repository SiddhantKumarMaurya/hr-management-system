const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  jobRole: { type: String, required: true },
  salary: { type: Number, required: true },
  performanceHistory: { type: [String], default: [] },
});

module.exports = mongoose.model('Employee', employeeSchema);
