angular.module('myApp')
    .controller('ResumeController', function($scope, $location, $window) {
        
        $scope.activeTab = '';
        $scope.currentPage = {};

        $scope.setTab = function (url) {
            $location.path(url);
            $scope.activeTab = url;
            $scope.currentPage = $scope.pageRoutes.find(function(page) {
                return page.url === url;
            });
        };

        $scope.currentPage = $scope.pageRoutes.find(function(page) {
            return page.url === $scope.defaultPage;
        });
    });
