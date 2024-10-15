// backend/routes/attendance.js
const express = require('express');
const router = express.Router();
const AttendanceController = require('../controllers/AttendanceController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRoles = require('../middleware/authorizeRoles');

// Check-in
router.post('/check-in', authenticateToken, authorizeRoles('Employee', 'Admin', 'HR'), AttendanceController.checkIn);

// Check-out
router.post('/check-out', authenticateToken, authorizeRoles('Employee', 'Admin', 'HR'), AttendanceController.checkOut);

// Get attendance records for an employee
router.get('/:employeeId', authenticateToken, authorizeRoles('Admin', 'HR', 'Employee'), AttendanceController.getAttendanceByEmployee);

module.exports = router;
