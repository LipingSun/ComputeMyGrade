'use strict';

angular.module('computeMyGradeApp')
    .controller('CourseSettingController', function ($scope, $state, CourseSetting) {

        $scope.courseSettings = [];
        $scope.loadAll = function() {
            CourseSetting.query(function(result) {
               $scope.courseSettings = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.courseSetting = {
                setting: null,
                id: null
            };
        };
    });
