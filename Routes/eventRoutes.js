const express = require('express');
const router = express.Router();
const eventController = require('../Controller/eventController');
const auth = require('../Middleware/auth');

// All routes are protected
router.use(auth);

router.post('/', eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/by-date', eventController.getEventsByDate);
router.get('/by-category/:categoryId', eventController.getEventsByCategory);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;