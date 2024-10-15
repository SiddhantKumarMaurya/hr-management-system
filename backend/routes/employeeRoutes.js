const express = require('express');
const { addEmployee, getAllEmployees } = require('../controllers/employeeController');
const router = express.Router();

router.post('/', addEmployee);  // Add employee
router.get('/', getAllEmployees);  // Get all employees

module.exports = router;
