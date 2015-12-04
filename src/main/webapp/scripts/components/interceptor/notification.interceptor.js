 'use strict';

angular.module('computeMyGradeApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-computeMyGradeApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-computeMyGradeApp-params')});
                }
                return response;
            }
        };
    });
