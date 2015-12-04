'use strict';

angular.module('computeMyGradeApp').controller('StudentDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Student', 'CourseSetting',
        function($scope, $stateParams, $uibModalInstance, entity, Student, CourseSetting) {

        $scope.student = entity;
        $scope.coursesettings = CourseSetting.query();
        $scope.load = function(id) {
            Student.get({id : id}, function(result) {
                $scope.student = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('computeMyGradeApp:studentUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.student.id != null) {
                Student.update($scope.student, onSaveSuccess, onSaveError);
            } else {
                Student.save($scope.student, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
