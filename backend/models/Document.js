// models/Document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    documentType: {
        type: String,
        enum: ['Resume', 'Certification', 'Other'],
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
