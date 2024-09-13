var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'navigation/navigation.html',
            controller: 'HomeController'
        })
});

app.controller('CommonController', function($scope) {
    $rootScope.displayDialog = function () {

    }
    $scope.bvePage = '/bve.html';
    $rootScope.setTimeout = function() {
        setTimeout(function(){
            self.close(bvePage);
        },2000);
    }

    
});

window.addEventListener('load', function() {
    fadeInElements();
});

function fadeInElements() {
    const body = document.querySelector('body');
    const wrapper = document.querySelector('.wrapper');
    const subWrapper = document.querySelector('.sub-wrapper');
    const header = document.querySelector('header');
    body.classList.add('fade-in');
    wrapper.classList.add('fade-in');
    subWrapper.classList.add('fade-in');
    header.classList.add('fade-in');
}
