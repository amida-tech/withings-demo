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
          wbsUrl: 'https://wbsapi.withings.net/v2/'
      };
      var client = new Withings(options);
      var params = { 
          userid: req.session.oauth.userid,
          startdateymd: '2015-06-01',
          enddateymd: '2015-06-30'
      };

      client.get('measure', 'getactivity', params, function (err, data) {
          if (err) {
              throw new Error(err);
          }
          res.send(data);
          return;
      });
};