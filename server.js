require('dotenv').config();
const app = require('./app');
const connectDB = require('./Config/db');
const { checkReminders } = require('./utils/notificationService');

connectDB();