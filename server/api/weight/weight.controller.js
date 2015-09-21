'use strict';

var Withings = require('withings-lib');
var config = require('../../config/environment');
var moment = require('moment');
var _ = require('lodash');

// Get list of weights
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
      var params = { 
          startdate: moment('2015-06-01', 'YYYY-MM-DD').unix(),
          enddate:  moment('2015-06-30', 'YYYY-MM-DD').unix(),
          meastype: 1
      };

      client.get('measure', 'getmeas', params, function (err, data) {
          if (err) {
              throw new Error(err);
          }
          res.send(data);
          return;
      });
};