const express = require('express');
const notifications = require('./notifications-route')

const router = express.Router()

router.use('/notifications', notifications)

module.exports = router