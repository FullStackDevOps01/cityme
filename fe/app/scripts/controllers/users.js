'use strict';
angular.module('feApp')
.controller('ListUserCtrl', function($scope, $stateParams, Users, APP_CONFIG) {
    var page = $stateParams.page ? +$stateParams.page : 1,
        limit = $stateParams.limit ? +$stateParams.limit : 10;

    $scope.limit = limit;
    Users.list(page, limit).then(function(data){
        $scope.users = data;
    });
});
