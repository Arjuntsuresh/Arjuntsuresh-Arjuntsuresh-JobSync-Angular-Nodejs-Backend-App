const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    citizenship: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String, // Store as a string in ISO format (e.g., 'YYYY-MM-DD')
        required: true
    },
    address: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    coverLetter: {
        type: String, // Store as a string path or content
        required: true
    },
    resume: {
        type: String, // Store as a string path to the uploaded file
        required: true
    }
});

module.exports = mongoose.model('Application', applicationSchema);
