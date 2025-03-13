const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const eventRoutes = require('./Routes/eventRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const reminderRoutes = require('./Routes/reminderRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reminders', reminderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

module.exports = app;

