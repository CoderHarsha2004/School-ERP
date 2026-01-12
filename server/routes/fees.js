const express = require('express');
const Fees = require('../models/Fees');
const Student = require('../models/Student');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all fees
router.get('/', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const fees = await Fees.find().populate('student');
    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get fees by ID
router.get('/:id', auth, authorize('admin', 'faculty', 'student'), async (req, res) => {
  try {
    const fee = await Fees.findById(req.params.id).populate('student');
    if (!fee) return res.status(404).json({ message: 'Fee not found' });
    res.json(fee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create fee
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const { student, ...feeData } = req.body;
    const studentDoc = await Student.findOne({ rollNumber: student });
    if (!studentDoc) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const fee = new Fees({ ...feeData, student: studentDoc._id });
    await fee.save();
    await fee.populate('student');
    res.status(201).json(fee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update fee
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const { student, class: className, section, ...feeData } = req.body;
    let updateData = feeData;
    if (student) {
      const studentDoc = await Student.findOne({ rollNumber: student });
      if (!studentDoc) {
        return res.status(404).json({ message: 'Student not found' });
      }
      updateData.student = studentDoc._id;
    }
    if (className) updateData.class = className;
    if (section) updateData.section = section;
    const fee = await Fees.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!fee) return res.status(404).json({ message: 'Fee not found' });
    res.json(fee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete fee
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const fee = await Fees.findByIdAndDelete(req.params.id);
    if (!fee) return res.status(404).json({ message: 'Fee not found' });
    res.json({ message: 'Fee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get call logs for a fee
router.get('/:id/callLogs', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const fee = await Fees.findById(req.params.id);
    if (!fee) return res.status(404).json({ message: 'Fee not found' });
    res.json(fee.callLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a call log to a fee
router.post('/:id/callLogs', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const { notes, outcome } = req.body;
    const fee = await Fees.findById(req.params.id);
    if (!fee) return res.status(404).json({ message: 'Fee not found' });
    fee.callLogs.push({ notes, outcome });
    await fee.save();
    res.status(201).json(fee.callLogs[fee.callLogs.length - 1]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a call log
router.put('/:id/callLogs/:callId', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const { notes, outcome } = req.body;
    const fee = await Fees.findById(req.params.id);
    if (!fee) return res.status(404).json({ message: 'Fee not found' });
    const callLog = fee.callLogs.id(req.params.callId);
    if (!callLog) return res.status(404).json({ message: 'Call log not found' });
    callLog.notes = notes;
    callLog.outcome = outcome;
    await fee.save();
    res.json(callLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a call log
router.delete('/:id/callLogs/:callId', auth, authorize('admin', 'faculty'), async (req, res) => {
  try {
    const fee = await Fees.findById(req.params.id);
    if (!fee) return res.status(404).json({ message: 'Fee not found' });
    fee.callLogs.pull(req.params.callId);
    await fee.save();
    res.json({ message: 'Call log deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
