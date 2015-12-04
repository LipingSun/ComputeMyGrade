'use strict';

angular.module('computeMyGradeApp').controller('CourseDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Course', 'CourseSetting',
        function($scope, $stateParams, $uibModalInstance, entity, Course, CourseSetting) {

        $scope.course = entity;
        $scope.coursesettings = CourseSetting.query();
        $scope.load = function(id) {
            Course.get({id : id}, function(result) {
                $scope.course = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('computeMyGradeApp:courseUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.course.id != null) {
                Course.update($scope.course, onSaveSuccess, onSaveError);
            } else {
                Course.save($scope.course, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
