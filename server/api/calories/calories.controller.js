'use strict';

var Withings = require('withings-lib');
var config = require('../../config/environment');
var moment = require('moment');
var _ = require('lodash');

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
          userID: req.query.userid
      };
      var client = new Withings(options);

      client.getDailyCalories(new Date(), function (err, data) {
          console.log(data);
          if (err) {
              throw new Error(err);
          }
          res.send(data);
          return;
      });
};