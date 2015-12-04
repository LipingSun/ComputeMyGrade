'use strict';

angular.module('computeMyGradeApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


