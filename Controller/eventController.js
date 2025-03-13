const Event = require('../Model/Event');

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, time, categoryId } = req.body;
    
    const event = new Event({
      name,
      description,
      date,
      time,
      userId: req.user.id,
      categoryId
    });
    
    await event.save();
    
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all events for the logged-in user
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id })
                             .populate('categoryId', 'name')
                             .sort({ date: 1 });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a specific event
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ 
      _id: req.params.id,
      userId: req.user.id
    }).populate('categoryId', 'name');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const { name, description, date, time, categoryId } = req.body;
    
    const event = await Event.findOne({ 
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    if (name) event.name = name;
    if (description) event.description = description;
    if (date) event.date = date;
    if (time) event.time = time;
    if (categoryId) event.categoryId = categoryId;
    
    await event.save();
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ 
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    await event.remove();
    
    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get events sorted by date
exports.getEventsByDate = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id })
                             .sort({ date: 1, time: 1 });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get events for a specific category
exports.getEventsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    const events = await Event.find({ 
      userId: req.user.id,
      categoryId
    }).sort({ date: 1 });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

