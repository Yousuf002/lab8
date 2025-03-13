const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reminderTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'dismissed'],
    default: 'pending'
  }
}, { timestamps: true });

const Reminder = mongoose.model('Reminder', reminderSchema);
module.exports = Reminder;