// backend/routes/leaves.js
const express = require('express');
const router = express.Router();
const LeaveController = require('../controllers/LeaveController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRoles = require('../middleware/authorizeRoles');

// Get all leaves
router.get('/', authenticateToken, authorizeRoles('Admin', 'HR'), LeaveController.getAllLeaves);

// Get leave by ID
router.get('/:id', authenticateToken, authorizeRoles('Admin', 'HR', 'Employee'), LeaveController.getLeaveById);

// Create new leave request
router.post('/', authenticateToken, authorizeRoles('Employee'), LeaveController.createLeaveRequest);

// Update leave status (Approve/Reject)
router.put('/:id', authenticateToken, authorizeRoles('Admin', 'HR'), LeaveController.updateLeaveStatus);

// Delete leave request
router.delete('/:id', authenticateToken, authorizeRoles('Admin', 'HR'), LeaveController.deleteLeaveRequest);

module.exports = router;
