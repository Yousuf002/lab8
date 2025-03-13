const Reminder = require('../Model/Reminder');
const Event = require('../Model/Event');

// Create a reminder for an event
exports.createReminder = async (req, res) => {
  try {
    const { eventId, reminderTime } = req.body;
    
    // Check if the event exists and belongs to the user
    const event = await Event.findOne({ 
      _id: eventId,
      userId: req.user.id
    });
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    const reminder = new Reminder({
      eventId,
      userId: req.user.id,
      reminderTime,
      status: 'pending'
    });
    
    await reminder.save();
    
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all reminders for the logged-in user
exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user.id })
                                  .populate('eventId', 'name date time');
    
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a specific reminder
exports.getReminderById = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({ 
      _id: req.params.id,
      userId: req.user.id
    }).populate('eventId', 'name date time');
    
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    
    res.json(reminder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a reminder
exports.updateReminder = async (req, res) => {
  try {
    const { reminderTime, status } = req.body;
    
    const reminder = await Reminder.findOne({ 
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    
    if (reminderTime) reminder.reminderTime = reminderTime;
    if (status) reminder.status = status;
    
    await reminder.save();
    
    res.json(reminder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a reminder
exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({ 
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    
    await reminder.remove();
    
    res.json({ message: 'Reminder removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all pending reminders
exports.getPendingReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ 
      userId: req.user.id,
      status: 'pending'
    }).populate('eventId', 'name date time');
    
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Dismiss a reminder
exports.dismissReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({ 
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    
    reminder.status = 'dismissed';
    await reminder.save();
    
    res.json(reminder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};