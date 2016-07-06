'use strict';

/**
 * @ngdoc overview
 * @name feApp
 * @description
 * # feApp
 *
 * Main module of the application.
 */
angular
  .module('feApp')
  .config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
  }])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$ocLazyLoadProvider',
    '$httpProvider',
    function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider, $httpProvider) {

        $ocLazyLoadProvider.config({
            debug: true,
            events: true,
        });

        $urlRouterProvider.otherwise('/home/dashboard');

        $stateProvider
        .state('login',{
            templateUrl: 'views/pages/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'vm',
            url: '/login',
            resolve: {
                loadMyDirectives:function($ocLazyLoad){
                    return $ocLazyLoad.load(
                        {
                            name:'feApp',
                            files:[
                                'scripts/controllers/login.js',
                                'scripts/services/users.js'
                            ]
                        });
                }
            }
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/main.html',
            resolve: {
                loadMyDirectives:function($ocLazyLoad){
                    return $ocLazyLoad.load(
                        {
                            name:'feApp',
                            files:[
                                'scripts/directives/header/header.js',
                                'scripts/directives/sidebar/sidebar.js',
                                'scripts/services/users.js'
                            ]
                        });
                }
            }
        })
        .state('home.dashboard', {
            url: '/dashboard',
            controller: 'MainCtrl',
            templateUrl: 'views/dashboard/home.html',
            resolve: {
                loadMyDirectives: function($ocLazyLoad){
                    return $ocLazyLoad.load(
                        {
                            name:'feApp',
                            files:[
                                'scripts/controllers/main.js'
                            ]
                        });
                }
            }
        })
        .state('home.users', {
            url: '/users/list/{page}/{limit}',
            controller: 'ListUserCtrl',
            templateUrl: 'views/users/list.html',
            resolve: {
                loadMyDirectives: function($ocLazyLoad){
                    return $ocLazyLoad.load(
                        {
                            name:'siteSeedApp',
                            files:[
                                'scripts/controllers/users.js'
                            ]
                        });
                }
            }
        });

        $httpProvider.interceptors.push('httpRequestInterceptor');;
    }
])
  .factory('httpRequestInterceptor', function ($rootScope, $cookies, $location) {
    var ret = {
        request: function (config) {
            var user_info = $cookies.get('userInfo') || '{}';
            $rootScope.user_info = JSON.parse(user_info);
            config.headers.Authorization = 'Bearer ' + $rootScope.user_info.token;
            return config;
        }
    };
    return ret;
});

