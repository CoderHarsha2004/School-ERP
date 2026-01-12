const express = require('express');
const { Parser } = require('json2csv');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Fees = require('../models/Fees');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get student report by class
router.get('/students/:class', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const students = await Student.find({ class: req.params.class });
    const fields = ['name', 'email', 'rollNumber', 'class', 'section', 'dateOfBirth', 'address', 'parentName', 'parentPhone', 'enrollmentDate'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(students);
    res.header('Content-Type', 'text/csv');
    res.attachment(`students_class_${req.params.class}_report.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get faculty report
router.get('/faculty', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const faculty = await Faculty.find();
    if (faculty.length === 0) {
      return res.status(404).json({ message: 'No faculty found' });
    }
    const fields = ['name', 'email', 'employeeId', 'department', 'phone', 'hireDate'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(faculty);
    res.header('Content-Type', 'text/csv');
    res.attachment('faculty_report.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get fees report
router.get('/fees', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const fees = await Fees.find().populate('student');
    if (fees.length === 0) {
      return res.status(404).json({ message: 'No fees found' });
    }
    const fields = ['student.name', 'student.rollNumber', 'amount', 'description', 'dueDate', 'status', 'createdAt'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(fees);
    res.header('Content-Type', 'text/csv');
    res.attachment('fees_report.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get fees report by class
router.get('/fees/:class', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const fees = await Fees.find().populate({
      path: 'student',
      match: { class: req.params.class }
    });
    const filteredFees = fees.filter(fee => fee.student);
    if (filteredFees.length === 0) {
      return res.status(404).json({ message: 'No fees found for this class' });
    }
    const fields = ['student.name', 'student.rollNumber', 'amount', 'description', 'dueDate', 'status', 'createdAt'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(filteredFees);
    res.header('Content-Type', 'text/csv');
    res.attachment(`fees_class_${req.params.class}_report.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get pending fees report by class
router.get('/pending-fees/:class', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const fees = await Fees.find({ status: 'pending' }).populate({
      path: 'student',
      match: { class: req.params.class }
    });
    const filteredFees = fees.filter(fee => fee.student);
    if (filteredFees.length === 0) {
      return res.status(404).json({ message: 'No pending fees found for this class' });
    }
    const fields = ['student.name', 'student.rollNumber', 'amount', 'description', 'dueDate', 'status', 'createdAt'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(filteredFees);
    res.header('Content-Type', 'text/csv');
    res.attachment(`pending_fees_class_${req.params.class}_report.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get completed fees report by class
router.get('/completed-fees/:class', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const fees = await Fees.find({ status: 'completed' }).populate({
      path: 'student',
      match: { class: req.params.class }
    });
    const filteredFees = fees.filter(fee => fee.student);
    if (filteredFees.length === 0) {
      return res.status(404).json({ message: 'No completed fees found for this class' });
    }
    const fields = ['student.name', 'student.rollNumber', 'amount', 'description', 'dueDate', 'status', 'createdAt'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(filteredFees);
    res.header('Content-Type', 'text/csv');
    res.attachment(`completed_fees_class_${req.params.class}_report.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
