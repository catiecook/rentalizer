angular.module('airdna', ['ngRoute', 'ngAnimate', 'ngMaterial'])

  .config(function($routeProvider, $locationProvider, $mdThemingProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/index.html',
        controller: 'RentalizerController'
    })

    $locationProvider.html5Mode(true);

    $mdThemingProvider.theme('default')
      .dark()
      .primaryPalette('blue', {
        'default': '200'
      })
      .accentPalette('orange', {
        'default': '200'
      })
      .warnPalette('orange', {
        'default': '300',
      })
})
