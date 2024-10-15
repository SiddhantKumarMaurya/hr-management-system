const express = require('express');
const { markAttendance, getEmployeeAttendance } = require('../controllers/attendanceController');
const router = express.Router();

router.post('/', markAttendance);  // Mark attendance
router.get('/:employeeId', getEmployeeAttendance);  // Get attendance by employee ID

module.exports = router;
