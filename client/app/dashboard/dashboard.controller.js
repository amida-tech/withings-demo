'use strict';

angular.module('withingsDemoApp')
  .controller('DashboardCtrl', function ($scope, $http, $window) {
    $scope.message = 'Hello';
    
    $scope.oauth = function () {
        $http.get('/oauth').success(function(res) {
           $window.location.href = res;
        });
    };
    
    $http.get('/api/steps').success(function(res) {
        $scope.stepsRes = res;
    });
    
    $http.get('/api/weight').success(function(res) {
        $scope.weightRes = res;
    });
    
  });
