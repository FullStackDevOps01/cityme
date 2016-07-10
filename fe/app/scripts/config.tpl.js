angular
.module('feApp', [
    'ngTouch',
    'ngResource',
    'ngCookies',
    'ui.router',
    'oc.lazyLoad',
    'ngResource',
    'ngCookies',
    'ui.bootstrap',
    'pascalprecht.translate',
    'ngAnimate',
    'angular-loading-bar'
])
.constant('APP_CONFIG', /* @echo APP_CONFIG */)
.value('debug', true);
