angular.module('airdna')

.controller('MainController', function($scope, mainService) {
    $scope.houseInfo = [];
    $scope.locationPts = [];
    $scope.monthlyRev = [];
    $scope.airBnb = [];
    $scope.chartOptions = {
        chart: {
            type: 'area'
        },
        title: {
          text: "Predicted Monthly Averages"
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series: [{
            name: "Your Rental",
            data: [
                1234, 1245, 2112, 1342, 1802, 1376, 2002, 1131, 1009, 1234, 1543, 3029
              ]
            },
            {
              name: "Nearby Average",
              data: [
                1002, 969, 2039, 1125, 1232, 987, 1211, 1241, 996, 1002, 1265, 1243
              ]
          }]
    };

    $scope.searched = false;
    $scope.hideForm = true;

    $scope.search = (beds, baths, accomidates, address, zipcode) => {
      mainService.getInfo(beds, baths, accomidates, address, zipcode).then((data) => {

        $scope.houseInfo = data;
        $scope.monthlyRev = mainService.revPot(data.revenue);
        $scope.airBnb = mainService.getAllabnb();
      });
      hideForm();
      showResults();
    };

    function hideForm() {
      $scope.hideForm = false;
    };

    function showResults() {
      $scope.searched = true;
    };

});
