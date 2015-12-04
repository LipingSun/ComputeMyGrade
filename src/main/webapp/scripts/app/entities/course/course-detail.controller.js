'use strict';

angular.module('computeMyGradeApp')
    .controller('CourseDetailController', function ($scope, $rootScope, $stateParams, entity, Course, CourseSetting) {
        $scope.course = entity;
        $scope.load = function (id) {
            Course.get({id: id}, function(result) {
                $scope.course = result;
            });
        };
        var unsubscribe = $rootScope.$on('computeMyGradeApp:courseUpdate', function(event, result) {
            $scope.course = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
