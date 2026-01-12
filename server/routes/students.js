const express = require('express');
const Student = require('../models/Student');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all students
router.get('/', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const students = await Student.find().populate('user');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get student by ID
router.get('/:id', auth, authorize('admin', 'faculty', 'student'), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('user');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create student
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const student = new Student({ ...req.body, user: req.user.id });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// Update student
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete student
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add attendance
router.post('/:id/attendance', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const { date, status } = req.body;
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    student.attendance.push({ date, status });
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add grade
router.post('/:id/grades', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const { subject, grade, semester } = req.body;
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    student.grades.push({ subject, grade, semester });
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
