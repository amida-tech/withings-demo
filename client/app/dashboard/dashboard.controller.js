'use strict';

angular.module('withingsDemoApp')
  .controller('DashboardCtrl', function ($scope, $http, $window, $location) {
    $scope.message = 'Hello';
    
    $scope.userid = $location.search().userID;
    
    $scope.oauth = function () {
        $http.get('/oauth').success(function(res) {
           $window.location.href = res;
        });
    };
    
    function activate() {

        $http.get('/api/steps?userID=' + $scope.userid).success(function (res) {
            $scope.stepsRes = res;
        });

        $http.get('/api/weight?userID=' + $scope.userid).success(function (res) {
            $scope.weightRes = res;
        });

        $http.get('/api/steps/today?userID=' + $scope.userid).success(function (res) {
            $scope.dailyStepsRes = res;
        });

        $http.get('/api/calories/today?userID=' + $scope.userid).success(function (res) {
            $scope.dailyCalsRes = res;
        });
    
    }
    
    activate();
    
  });
