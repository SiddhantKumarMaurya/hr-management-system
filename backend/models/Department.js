// models/Department.js
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: String
});

module.exports = mongoose.model('Department', departmentSchema);
