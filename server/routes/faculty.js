const express = require('express');
const Faculty = require('../models/Faculty');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all faculty
router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const faculty = await Faculty.find().populate('user');
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get faculty by ID
router.get('/:id', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id).populate('user');
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create faculty
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const faculty = new Faculty({ ...req.body, user: req.user.id });
    await faculty.save();
    res.status(201).json(faculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update faculty
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    res.json(faculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete faculty
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    res.json({ message: 'Faculty deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
