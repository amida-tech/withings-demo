'use strict';

angular.module('withingsDemoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngRoute'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .when('/?userID', '/dashboard?userID')
      .otherwise('/dashboard');

    $locationProvider.html5Mode(true);
  });