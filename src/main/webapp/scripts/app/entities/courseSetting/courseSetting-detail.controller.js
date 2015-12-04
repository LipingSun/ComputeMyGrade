'use strict';

angular.module('computeMyGradeApp')
    .controller('CourseSettingDetailController', function ($scope, $rootScope, $stateParams, entity, CourseSetting, Student, Course) {
        $scope.courseSetting = entity;
        $scope.load = function (id) {
            CourseSetting.get({id: id}, function(result) {
                $scope.courseSetting = result;
            });
        };
        var unsubscribe = $rootScope.$on('computeMyGradeApp:courseSettingUpdate', function(event, result) {
            $scope.courseSetting = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
