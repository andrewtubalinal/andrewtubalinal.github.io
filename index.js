var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'navigation/navigation.html',
            controller: 'HomeController'
        })
});

app.controller('HomeController', function($scope) {
    var popupShown = false;

    $scope.showPopup = function() {
        $scope.isPopupVisible = true;
        popupShown = true;
    };

    $scope.hidePopup = function() {
        $scope.isPopupVisible = false;
    };

    $scope.addChatBubble = function() {
        if (!popupShown) {
            $scope.showPopup();
        }

        var chatBubble = document.createElement('div');
        chatBubble.classList.add('chat-bubble');
        chatBubble.textContent = "Hello!";
        
        var arcContainer = document.querySelector('.arc-gif');
        arcContainer.appendChild(chatBubble);
        
        setTimeout(function() {
            chatBubble.remove();
        }, 3000);
    };
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
