'use strict';

angular.module('computeMyGradeApp')
    .controller('CourseController', function ($scope, $state, Course) {

        $scope.courses = [];
        $scope.loadAll = function() {
            Course.query(function(result) {
               $scope.courses = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.course = {
                name: null,
                description: null,
                id: null
            };
        };
    });
