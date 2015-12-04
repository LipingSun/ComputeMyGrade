'use strict';

angular.module('computeMyGradeApp').controller('CourseSettingDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'CourseSetting', 'Student', 'Course',
        function($scope, $stateParams, $uibModalInstance, entity, CourseSetting, Student, Course) {

        $scope.courseSetting = entity;
        $scope.students = Student.query();
        $scope.courses = Course.query();
        $scope.load = function(id) {
            CourseSetting.get({id : id}, function(result) {
                $scope.courseSetting = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('computeMyGradeApp:courseSettingUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.courseSetting.id != null) {
                CourseSetting.update($scope.courseSetting, onSaveSuccess, onSaveError);
            } else {
                CourseSetting.save($scope.courseSetting, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
