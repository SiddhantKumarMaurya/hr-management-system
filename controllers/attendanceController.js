const Attendance = require('../models/Attendance');

// Add Attendance Record
const markAttendance = async (req, res) => {
  const { employeeId, status, overtimeHours } = req.body;
  try {
    const attendance = new Attendance({
      employee: employeeId,
      status,
      overtimeHours,
    });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Attendance for an Employee
const getEmployeeAttendance = async (req, res) => {
  const { employeeId } = req.params;
  try {
    const attendance = await Attendance.find({ employee: employeeId });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { markAttendance, getEmployeeAttendance };
