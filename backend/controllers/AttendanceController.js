// backend/controllers/AttendanceController.js
const AttendanceRecord = require('../models/AttendanceRecord');

exports.checkIn = async (req, res) => {
    const { latitude, longitude } = req.body; // Geolocation data

    // TODO: Implement geofencing validation
    // For simplicity, assuming validation passed

    try {
        const attendance = new AttendanceRecord({
            employee: req.user.id,
            date: new Date()
        });

        await attendance.save();
        res.json(attendance);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.checkOut = async (req, res) => {
    const { latitude, longitude } = req.body; // Geolocation data

    // TODO: Implement geofencing validation
    // For simplicity, assuming validation passed

    try {
        const attendance = await AttendanceRecord.findOne({ employee: req.user.id, date: new Date().toDateString() });
        if (!attendance) {
            return res.status(400).json({ message: 'Attendance record not found for today' });
        }

        attendance.checkOut = new Date();
        // Calculate overtime if necessary
        // Example: if worked more than 8 hours
        const workedHours = (attendance.checkOut - attendance.checkIn) / (1000 * 60 * 60);
        if (workedHours > 8) {
            attendance.overtimeHours = workedHours - 8;
        }

        await attendance.save();
        res.json(attendance);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAttendanceByEmployee = async (req, res) => {
    const { employeeId } = req.params;

    // Allow employees to access their own records
    if (req.user.role === 'Employee' && req.user.id !== employeeId) {
        return res.status(403).json({ message: 'Access Denied' });
    }

    try {
        const records = await AttendanceRecord.find({ employee: employeeId })
            .sort({ date: -1 });
        res.json(records);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
