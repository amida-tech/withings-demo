/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var config = require('./config/environment');

var Withings = require('withings-lib')

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  // OAuth flow
  app.get('/oauth', function (req, res) {
      // Create an API client and start authentication via OAuth
      var options = {
          consumerKey: config.CONSUMER_KEY,
          consumerSecret: config.CONSUMER_SECRET
      };
      var client = new Withings(options);

      client.getRequestToken(function (err, token, tokenSecret) {
          if (err) {
              throw new Error(err);
          }

          req.session.oauth = {
              requestToken: token,
              requestTokenSecret: tokenSecret
          };

          res.redirect(client.authorizeUrl(token, tokenSecret));
      });
  });

  // On return from the authorization
  app.get('/oauth_callback', function (req, res) {
      var verifier = req.query.oauth_verifier
      var oauthSettings = req.session.oauth
      var options = {
          consumerKey: config.CONSUMER_KEY,
          consumerSecret: config.CONSUMER_SECRET
      };
      var client = new Withings(options);

      // Request an access token
      client.getAccessToken(oauthSettings.requestToken, oauthSettings.requestTokenSecret, verifier,
          function (err, token, secret) {
              if (err) {
                  throw new Error(err);
              }

              oauthSettings.accessToken = token;
              oauthSettings.accessTokenSecret = secret;

              res.redirect('/activity');
          }
          );
  });

  // Display the activity measures log for a user
  app.get('/activity', function (req, res) {
      var options = {
          consumerKey: config.CONSUMER_KEY,
          consumerSecret: config.CONSUMER_SECRET,
          accessToken: req.session.oauth.accessToken,
          accessTokenSecret: req.session.oauth.accessTokenSecret
      };
      var client = new Withings(options);

      client.get('measure', 'getactivity', { userid: 'amida' }, function (err, data) {
          if (err) {
              // Throw error
              return;
          }

          res.send('Activity log: ' + data.body);
      });
  });
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
