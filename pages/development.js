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
            { id: '6', name: 'html', title: 'Hypertext Markup Language'},
            { id: '7', name: 'css', title: 'Cascading Style Sheet'},
            { id: '8', name: 'nodejs', title: 'NodeJS'},
            { id: '9', name: 'angular', title: 'AngularJS'},
            { id: '10', name: 'php', title: 'PHP'},
        ];

        $scope.slickConfig = {
            enabled: true,
            autoplay: true,
            draggable: false,  
            autoplaySpeed: 3000,
            method: {},
            event: {
                beforeChange: function (event, slick, currentSlide, nextSlide) {
                },
                afterChange: function (event, slick, currentSlide, nextSlide) {
                }
            }
        };
    });
