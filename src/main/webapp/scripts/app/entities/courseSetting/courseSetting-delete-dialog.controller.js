'use strict';

angular.module('computeMyGradeApp')
	.controller('CourseSettingDeleteController', function($scope, $uibModalInstance, entity, CourseSetting) {

        $scope.courseSetting = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            CourseSetting.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
