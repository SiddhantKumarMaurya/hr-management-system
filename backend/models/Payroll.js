// backend/models/Payroll.js
const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    deductions: {
        type: Number,
        required: true
    },
    bonuses: {
        type: Number,
        default: 0
    },
    totalSalary: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Payroll', PayrollSchema);
