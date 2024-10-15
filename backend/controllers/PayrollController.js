// backend/controllers/PayrollController.js
const Payroll = require('../models/Payroll');
const Employee = require('../models/Employee');

exports.getAllPayrolls = async (req, res) => {
    try {
        const payrolls = await Payroll.find().populate('employee', 'firstName lastName email');
        res.json(payrolls);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getPayrollByEmployeeId = async (req, res) => {
    try {
        const payroll = await Payroll.findOne({ employee: req.params.employeeId }).populate('employee', 'firstName lastName email');
        if (!payroll) {
            return res.status(404).json({ message: 'Payroll record not found' });
        }
        res.json(payroll);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Payroll record not found' });
        }
        res.status(500).send('Server Error');
    }
};

exports.generatePayroll = async (req, res) => {
    const { salary, deductions, bonuses } = req.body;
    try {
        const employee = await Employee.findById(req.params.employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const totalSalary = salary - deductions + bonuses;

        const newPayroll = new Payroll({
            employee: employee._id,
            salary,
            deductions,
            bonuses,
            totalSalary
        });

        const payroll = await newPayroll.save();
        res.json(payroll);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deletePayroll = async (req, res) => {
    try {
        const payroll = await Payroll.findById(req.params.id);
        if (!payroll) {
            return res.status(404).json({ message: 'Payroll record not found' });
        }

        await payroll.remove();
        res.json({ message: 'Payroll record deleted' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Payroll record not found' });
        }
        res.status(500).send('Server Error');
    }
};
