// backend/routes/payroll.js
const express = require('express');
const router = express.Router();
const PayrollController = require('../controllers/PayrollController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRoles = require('../middleware/authorizeRoles');

// Get all payroll records (Admin/HR only)
router.get('/', authenticateToken, authorizeRoles('Admin', 'HR'), PayrollController.getAllPayrolls);

// Get payroll record for a specific employee
router.get('/:employeeId', authenticateToken, authorizeRoles('Admin', 'HR', 'Employee'), PayrollController.getPayrollByEmployeeId);

// Generate payroll for an employee (Admin/HR)
router.post('/:employeeId', authenticateToken, authorizeRoles('Admin', 'HR'), PayrollController.generatePayroll);

// Delete a payroll record (Admin/HR only)
router.delete('/:id', authenticateToken, authorizeRoles('Admin', 'HR'), PayrollController.deletePayroll);

module.exports = router;
