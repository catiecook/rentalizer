angular.module('airdna')

.controller('MainController', function($scope, mainService) {
    $scope.houseInfo = []; //collect house info

    $scope.searched = false;
    $scope.hideForm = true;


// These will be deleted
    $scope.address = "4111 Raritan Street";
    $scope.zipcode = 80211;
    $scope.beds = 2;
    $scope.baths = 1;
    $scope.accomidates = 4;

    $scope.search = (beds, baths, accomidates, address, zipcode) => {

      console.log("inSearch");

      mainService.getInfo(beds, baths, accomidates, address, zipcode).then((data) => {
        $scope.houseInfo = data
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
