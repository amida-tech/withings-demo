'use strict';

angular.module('withingsDemoApp')
  .controller('DashboardCtrl', function ($scope, $http, $window) {
    $scope.message = 'Hello';
    
    $scope.oauth = function () {
        $http.get('/oauth').success(function(res) {
           $window.location.href = res;
        });
    };
    
  });
