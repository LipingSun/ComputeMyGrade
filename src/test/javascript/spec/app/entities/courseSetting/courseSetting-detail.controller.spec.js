'use strict';

describe('CourseSetting Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockCourseSetting, MockStudent, MockCourse;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockCourseSetting = jasmine.createSpy('MockCourseSetting');
        MockStudent = jasmine.createSpy('MockStudent');
        MockCourse = jasmine.createSpy('MockCourse');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'CourseSetting': MockCourseSetting,
            'Student': MockStudent,
            'Course': MockCourse
        };
        createController = function() {
            $injector.get('$controller')("CourseSettingDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'computeMyGradeApp:courseSettingUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
