angular.module('airdna')

.controller('MainController', function($scope, mainService) {
    $scope.houseInfo = [];
    $scope.locationPts = [];
    $scope.monthlyRev = [];
    $scope.chartOptions = {
        title: {
          text: "Predicted Monthly Averages"
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series: [{
            data: [
              2312, 1245, 2112, 1342, 2100, 1876, 2135, 1131, 1009, 1234, 1543, 2001
            ]
        }]
    };

    $scope.searched = false;
    $scope.hideForm = true;

// These will be deleted
    $scope.address = "4111 Raritan Street";
    $scope.zipcode = 80211;
    $scope.beds = 2;
    $scope.baths = 1;
    $scope.accomidates = 4;

    $scope.search = (beds, baths, accomidates, address, zipcode) => {
      mainService.getInfo(beds, baths, accomidates, address, zipcode).then((data) => {
        $scope.houseInfo = data;
        $scope.monthlyRev = mainService.revPot(data.revenue);
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
