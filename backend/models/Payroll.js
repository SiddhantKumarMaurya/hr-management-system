// models/Payroll.js
const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    grossSalary: {
        type: Number,
        required: true
    },
    overtimePay: {
        type: Number,
        default: 0
    },
    taxDeduction: {
        type: Number,
        required: true
    },
    netSalary: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Payroll', payrollSchema);
