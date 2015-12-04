'use strict';

angular.module('computeMyGradeApp')
    .factory('CourseSetting', function ($resource, DateUtils) {
        return $resource('api/courseSettings/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
