angular.module('myApp')
    .component('navigationPage', {
        templateUrl: 'navigation/navigation.html',
        controller: 'NavigationController'
    })
    .controller('NavigationController', function($scope, $location) {
        $scope.pageRoutes = [
            { id: '1', name: 'Background', url: 'pages/background.html'},
            { id: '2', name: 'Information', url: 'pages/information.html' },
            { id: '3', name: 'Education', url: 'pages/education.html' },
            { id: '4', name: 'Personality', url: 'pages/personality.html' },
            { id: '5', name: 'Development', url: 'pages/development.html' },
            { id: '6', name: 'Production', url: 'pages/production.html' },
            { id: '7', name: 'Projects', url: 'pages/projects.html' },
            { id: '8', name: 'Patch', url: 'pages/patch.html' },
            { id: '9', name: 'Blog', url: 'pages/blog.html' },
            { id: '10', name: 'Credit/s', url: 'pages/credits.html' },
        ];

        $scope.defaultPage = 'pages/welcome.html';
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
