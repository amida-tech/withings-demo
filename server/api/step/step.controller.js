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
          wbsUrl: 'https://wbsapi.withings.net/'
      };
      var client = new Withings(options);
      var params = { 
          userid: req.session.oauth.userid,
          startdate: moment('2015-06-01', 'YYYY-MM-DD').unix(),
          enddate:  moment('2015-06-25', 'YYYY-MM-DD').unix(),
      };

      client.get('measure', 'getmeas', params, function (err, data) {
          if (err) {
              throw new Error(err);
          }
          res.send(data);
          return;
      });
};