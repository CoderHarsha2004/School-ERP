const mongoose = require('mongoose');
const Fees = require('./models/Fees');

mongoose.connect('mongodb://localhost:27017/school-erp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    const fees = await Fees.find({}).populate('student');
    console.log('All fees:', fees.map(f => ({ id: f._id, status: f.status, student: f.student ? f.student.name : 'No student', class: f.student ? f.student.class : 'No class' })));
    const paidFees = await Fees.find({ status: 'paid' }).populate('student');
    console.log('Paid fees:', paidFees.map(f => ({ id: f._id, status: f.status, student: f.student ? f.student.name : 'No student', class: f.student ? f.student.class : 'No class' })));
    mongoose.connection.close();
  })
  .catch(err => console.error('Connection error:', err));
