'use strict';

angular.module('withingsDemoApp')
  .controller('DashboardCtrl', function ($scope, $http, $window, $routeParams) {
    $scope.message = 'Hello';
    
    $scope.userid = $routeParams.userID;
    
    $scope.oauth = function () {
        $http.get('/oauth').success(function(res) {
           $window.location.href = res;
        });
    };
    
    activate();
    
    function activate() {

        $http.get('/api/steps?userID=' + userid).success(function (res) {
            $scope.stepsRes = res;
        });

        $http.get('/api/weight?userID=' + userid).success(function (res) {
            $scope.weightRes = res;
        });

        $http.get('/api/steps/today?userID=' + userid).success(function (res) {
            $scope.dailyStepsRes = res;
        });

        $http.get('/api/calories/today?userID=' + userid).success(function (res) {
            $scope.dailyCalsRes = res;
        });
    
    }
    
  });
