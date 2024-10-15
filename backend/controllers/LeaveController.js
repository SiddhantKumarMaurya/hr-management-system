// backend/controllers/LeaveController.js
const Leave = require('../models/Leave');
const Employee = require('../models/Employee');

exports.getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find()
            .populate('employee', 'firstName lastName email');
        res.json(leaves);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getLeaveById = async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id)
            .populate('employee', 'firstName lastName email');
        if (!leave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }
        res.json(leave);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Leave request not found' });
        }
        res.status(500).send('Server Error');
    }
};

exports.createLeaveRequest = async (req, res) => {
    const { leaveType, startDate, endDate } = req.body;
    try {
        const employee = req.user.id;

        // Create new leave request
        const newLeave = new Leave({
            employee,
            leaveType,
            startDate,
            endDate
        });

        const leave = await newLeave.save();
        res.json(leave);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateLeaveStatus = async (req, res) => {
    const { status } = req.body;

    try {
        let leave = await Leave.findById(req.params.id);
        if (!leave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        // Update leave status
        leave.status = status;
        await leave.save();
        res.json(leave);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Leave request not found' });
        }
        res.status(500).send('Server Error');
    }
};

exports.deleteLeaveRequest = async (req, res) => {
    try {
        let leave = await Leave.findById(req.params.id);
        if (!leave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        await leave.remove();
        res.json({ message: 'Leave request deleted' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Leave request not found' });
        }
        res.status(500).send('Server Error');
    }
};
