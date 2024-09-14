angular.module('myApp')
    .component('developmentPage', {
        templateUrl: 'pages/development.html',
        controller: 'DevelopmentController'
    })
    .controller('DevelopmentController', function($scope) {
        $scope.languages = [
            { id: '1', name: 'html', title: 'Hypertext Markup Language'},
            { id: '2', name: 'css', title: 'Cascading Style Sheet'},
            { id: '3', name: 'nodejs', title: 'NodeJS'},
            { id: '4', name: 'angular', title: 'AngularJS'},
            { id: '5', name: 'php', title: 'PHP'},
        ];
    });
