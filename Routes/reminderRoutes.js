const express = require('express');
const router = express.Router();
const reminderController = require('../Controller/reminderController');
const auth = require('../Middleware/auth');

// All routes are protected
router.use(auth);

router.post('/', reminderController.createReminder);
router.get('/', reminderController.getReminders);
router.get('/pending', reminderController.getPendingReminders);
router.get('/:id', reminderController.getReminderById);
router.put('/:id', reminderController.updateReminder);
router.delete('/:id', reminderController.deleteReminder);
router.put('/:id/dismiss', reminderController.dismissReminder);

module.exports = router;