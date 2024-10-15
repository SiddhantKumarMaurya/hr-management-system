// backend/routes/employees.js
const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRoles = require('../middleware/authorizeRoles');

// Get all employees
router.get('/', authenticateToken, authorizeRoles('Admin', 'HR'), EmployeeController.getAllEmployees);

// Get employee by ID
router.get('/:id', authenticateToken, authorizeRoles('Admin', 'HR', 'Employee'), EmployeeController.getEmployeeById);

// Create new employee
router.post('/', authenticateToken, authorizeRoles('Admin', 'HR'), EmployeeController.createEmployee);

// Update employee
router.put('/:id', authenticateToken, authorizeRoles('Admin', 'HR'), EmployeeController.updateEmployee);

// Delete employee
router.delete('/:id', authenticateToken, authorizeRoles('Admin', 'HR'), EmployeeController.deleteEmployee);

// Upload documents
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/:id/documents', authenticateToken, authorizeRoles('Admin', 'HR'), upload.single('document'), EmployeeController.uploadDocument);

module.exports = router;
