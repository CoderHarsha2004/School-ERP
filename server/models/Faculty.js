const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  subjects: [{
    type: String,
  }],
  schedule: [{
    day: String,
    time: String,
    subject: String,
    class: String,
    section: String,
  }],
  qualifications: [{
    degree: String,
    institution: String,
    year: Number,
  }],
  hireDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Faculty', facultySchema);
