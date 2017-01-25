angular.module('airdna')

  .directive('hello', function () {
    return {
        restrict: 'E',
        template: '<p>Hello from directive</p>'
    };
  })
  .directive('hcChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], scope.options);
        }
    };
  })

  
