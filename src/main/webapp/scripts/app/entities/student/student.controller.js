'use strict';

angular.module('computeMyGradeApp')
    .controller('StudentController', function ($scope, $state, Student) {

        $scope.students = [];
        $scope.loadAll = function() {
            Student.query(function(result) {
               $scope.students = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.student = {
                sid: null,
                lastName: null,
                firstName: null,
                email: null,
                phone: null,
                id: null
            };
        };
    });
