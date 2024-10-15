const Employee = require('../models/Employee');

// Add New Employee
const addEmployee = async (req, res) => {
  const { name, email, jobRole, salary } = req.body;
  try {
    const employee = new Employee({ name, email, jobRole, salary });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addEmployee, getAllEmployees };
