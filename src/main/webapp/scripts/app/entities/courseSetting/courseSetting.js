'use strict';

angular.module('computeMyGradeApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('courseSetting', {
                parent: 'entity',
                url: '/courseSettings',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'CourseSettings'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/courseSetting/courseSettings.html',
                        controller: 'CourseSettingController'
                    }
                },
                resolve: {
                }
            })
            .state('courseSetting.detail', {
                parent: 'entity',
                url: '/courseSetting/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'CourseSetting'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/courseSetting/courseSetting-detail.html',
                        controller: 'CourseSettingDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'CourseSetting', function($stateParams, CourseSetting) {
                        return CourseSetting.get({id : $stateParams.id});
                    }]
                }
            })
            .state('courseSetting.new', {
                parent: 'courseSetting',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/courseSetting/courseSetting-dialog.html',
                        controller: 'CourseSettingDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    setting: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('courseSetting', null, { reload: true });
                    }, function() {
                        $state.go('courseSetting');
                    })
                }]
            })
            .state('courseSetting.edit', {
                parent: 'courseSetting',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/courseSetting/courseSetting-dialog.html',
                        controller: 'CourseSettingDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['CourseSetting', function(CourseSetting) {
                                return CourseSetting.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('courseSetting', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('courseSetting.delete', {
                parent: 'courseSetting',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/courseSetting/courseSetting-delete-dialog.html',
                        controller: 'CourseSettingDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['CourseSetting', function(CourseSetting) {
                                return CourseSetting.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('courseSetting', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
