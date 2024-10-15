// models/Role.js
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String
});

module.exports = mongoose.model('Role', roleSchema);
