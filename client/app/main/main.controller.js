'use strict';

angular.module('withingsDemoApp')
  .controller('MainCtrl', function ($scope, $http, $window) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    
    $scope.oauth = function () {
        $http.get('/oauth').success(function(res) {
           $window.location.href = res;
        });
    };

  });
