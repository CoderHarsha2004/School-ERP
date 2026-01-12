const express = require('express');
const Class = require('../models/Class');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all classes
router.get('/', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const classes = await Class.find().populate('teacher');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get class by ID
router.get('/:id', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const classObj = await Class.findById(req.params.id).populate('teacher');
    if (!classObj) return res.status(404).json({ message: 'Class not found' });
    res.json(classObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create class
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const classObj = new Class(req.body);
    await classObj.save();
    res.status(201).json(classObj);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update class
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const classObj = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!classObj) return res.status(404).json({ message: 'Class not found' });
    res.json(classObj);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete class
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const classObj = await Class.findByIdAndDelete(req.params.id);
    if (!classObj) return res.status(404).json({ message: 'Class not found' });
    res.json({ message: 'Class deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
