// backend/controllers/EmployeeController.js
const Employee = require('../models/Employee');
const Document = require('../models/Document');

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate('jobRole')
            .populate('department')
            .populate('documents');
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
            .populate('jobRole')
            .populate('department')
            .populate('documents');
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(500).send('Server Error');
    }
};

exports.createEmployee = async (req, res) => {
    const { firstName, lastName, email, phone, address, jobRole, department, salary, hireDate } = req.body;

    try {
        let employee = await Employee.findOne({ email });
        if (employee) {
            return res.status(400).json({ message: 'Employee already exists' });
        }

        employee = new Employee({
            firstName,
            lastName,
            email,
            phone,
            address,
            jobRole,
            department,
            salary,
            hireDate
        });

        await employee.save();
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateEmployee = async (req, res) => {
    const { firstName, lastName, email, phone, address, jobRole, department, salary, hireDate } = req.body;

    // Build employee object
    const employeeFields = {};
    if (firstName) employeeFields.firstName = firstName;
    if (lastName) employeeFields.lastName = lastName;
    if (email) employeeFields.email = email;
    if (phone) employeeFields.phone = phone;
    if (address) employeeFields.address = address;
    if (jobRole) employeeFields.jobRole = jobRole;
    if (department) employeeFields.department = department;
    if (salary) employeeFields.salary = salary;
    if (hireDate) employeeFields.hireDate = hireDate;

    try {
        let employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { $set: employeeFields },
            { new: true }
        );

        res.json(employee);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(500).send('Server Error');
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        let employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        await employee.remove();
        res.json({ message: 'Employee removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(500).send('Server Error');
    }
};

exports.uploadDocument = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const newDocument = new Document({
            employee: employee._id,
            documentType: req.body.documentType,
            filePath: req.file.path
        });

        await newDocument.save();

        employee.documents.push(newDocument);
        await employee.save();

        res.json(newDocument);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
