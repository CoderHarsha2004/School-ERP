const mongoose = require('mongoose');

const feesSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  paymentDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'online', 'cheque'],
  },
  transactionId: {
    type: String,
  },
  reminders: [{
    sentDate: Date,
    message: String,
  }],
  callLogs: [{
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      required: true,
    },
    outcome: {
      type: String,
      enum: ['successful', 'no-answer', 'callback', 'unreachable', 'other'],
      required: true,
    },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Fees', feesSchema);
