'use strict';

angular.module('computeMyGradeApp')
    .controller('StudentDetailController', function ($scope, $rootScope, $stateParams, entity, Student, CourseSetting) {
        $scope.student = entity;
        $scope.load = function (id) {
            Student.get({id: id}, function(result) {
                $scope.student = result;
            });
        };
        var unsubscribe = $rootScope.$on('computeMyGradeApp:studentUpdate', function(event, result) {
            $scope.student = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
