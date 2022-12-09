const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
  },
});
const NotificationModel = mongoose.model('Notification', NotificationSchema);

module.exports = NotificationModel 