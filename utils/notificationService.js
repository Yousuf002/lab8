const Reminder = require('../Model/Reminder');
const Event = require('../Model/Event');

// Function to check for reminders that need to be sent
const checkReminders = async () => {
  try {
    const now = new Date();
    // Find reminders that are due and still pending
    const reminders = await Reminder.find({
      reminderTime: { $lte: now },
      status: 'pending'
    }).populate({
      path: 'eventId',
      select: 'name date time userId',
      populate: {
        path: 'userId',
        select: 'email username'
      }
    });
    
    // Send notifications for each due reminder
    for (const reminder of reminders) {
      await sendNotification(reminder);
      
      // Update reminder status to sent
      reminder.status = 'sent';
      await reminder.save();
    }
  } catch (error) {
    console.error('Error checking reminders:', error);
  }
};

// Function to send a notification for a specific reminder
const sendNotification = async (reminder) => {
  try {
    const { eventId } = reminder;
    const { name, date, time, userId } = eventId;
    const { email, username } = userId;
    
    const formattedDate = new Date(date).toLocaleDateString();
    
    // In a real app, this would send an actual notification
    console.log(`
      To: ${email}
      Subject: Reminder: ${name}
      
      Hello ${username},
      
      This is a reminder for your event "${name}" scheduled for ${formattedDate} at ${time}.
      
      Thank you for using our Event Manager!
    `);
    
    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
};

module.exports = {
  checkReminders,
  sendNotification
};