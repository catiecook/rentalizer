angular.module('airdna', ['ngRoute','ngAnimate', 'ngMaterial', 'ngAria', 'ngMap'])

  .config(function($routeProvider, $locationProvider, $mdThemingProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/index.html',
        controller: 'MainController'
    })

    $locationProvider.html5Mode(true);

    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey', {
        'default': '200'
      })
      .accentPalette('orange', {
        'default': '200'
      })
      .warnPalette('orange', {
        'default': '300',
      })
      .backgroundPalette('indigo');
})
