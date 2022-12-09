const { ObjectId } = require('bson');
const express = require('express');
const NotificationModel = require('../models/Notifications')

const router = express.Router()

router.get('/', function (req, res, next) {
    NotificationModel.find({}).exec(function (error, notifications) {
      if (error) {
        console.log('Internal Error: ', error);
        res.sendStatus(500);
      }
      res.json(notifications);
    });
  });
  router.get('/unread', function (req, res, next) {
    NotificationModel.find({ read: false }).exec(function (error, notifications) {
      if (error) {
        console.log('Internal Error: ', error);
        res.sendStatus(500);
      }
      res.json(notifications);
    });
  });
  router.get('/count', function (req, res, next) {
    NotificationModel.find({ read: false }).exec(function (error, notifications) {
      if (error) {
        console.log('Internal Error: ', error);
        res.sendStatus(500);
      }
      res.json({ count: notifications.length });
    });
  });
  router.put('/read/all', function (req, res, next) {
    NotificationModel.updateMany({ read: false }, { $set: { read: true } }).exec(
      function (error, updateResult) {
        if (error) {
          console.log('Internal Error: ', error);
          res.sendStatus(500);
        }
        res.json({ count: updateResult.modifiedCount });
      }
    );
  });
  router.get('/:_id', function (req, res, next) {
    NotificationModel.findOne({ _id: ObjectId(req.params._id) }).exec(function (error, notification) {
      if (error) {
        console.log('Internal Error: ', error);
        res.sendStatus(500);
      }
      res.json(notification);
    });
  });
  router.put('/:_id', function (req, res, next) {
    NotificationModel.findOneAndUpdate({ _id: ObjectId(req.params._id) }, { $set: { read: true }}).exec(function (error, notification) {
      if (error) {
        console.log('Internal Error: ', error);
        res.sendStatus(500);
      }
      res.json(notification);
    });
  });

  module.exports = router