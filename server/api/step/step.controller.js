'use strict';

var Withings = require('withings-lib');
var config = require('../../config/environment');
var moment = require('moment');
var _ = require('lodash');

// Get list of steps
exports.index = function(req, res) {
  if (!req.session.oauth) {
      res.send("Please authorize first");
      return;
  }
  var options = {
      consumerKey: config.CONSUMER_KEY,
      consumerSecret: config.CONSUMER_SECRET,
      callbackUrl: config.CALLBACK_URL,
      accessToken: req.session.oauth.accessToken,
      accessTokenSecret: req.session.oauth.accessTokenSecret,
      userID: req.query.userID
  };
  var client = new Withings(options);
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  var params = {
      startdateymd: firstDay,
      enddateymd: lastDay
  };

  client.get('measure', 'getactivity', params, function (err, data) {
      if (err) {
          throw new Error(err);
      }
      res.send(data);
      return;
  });
};

exports.today = function(req, res) {
  if (!req.session.oauth) {
      res.send("Please authorize first");
      return;
  }
  var options = {
      consumerKey: config.CONSUMER_KEY,
      consumerSecret: config.CONSUMER_SECRET,
      callbackUrl: config.CALLBACK_URL,
      accessToken: req.session.oauth.accessToken,
      accessTokenSecret: req.session.oauth.accessTokenSecret,
      userID: req.query.userID
  };
  var client = new Withings(options);

  client.getDailySteps(new Date(), function (err, data) {
      if (err) {
          throw new Error(err);
      }
      res.send(data);
      return;
  });
};