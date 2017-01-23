angular.module('airdna')

.controller('RentalizerController', function($scope, $http) {
    $scope.master = [];
    $scope.master.rentalizerPredictions = [];

    $scope.address = "4111 Raritan Street";
    $scope.zipcode = 80211;
    $scope.beds = 2;
    $scope.baths = 1;
    $scope.accomidates = 4;
    $scope.master.searched = false;
    $scope.master.hideForm = true;
    $scope.master.newSearch = false;


    $scope.search = (bed, bath, accomidates, address, zip) => {
      let addressInfo = {
        address: address,
        zip: zip,
        bed: bed,
        bath: bath,
        accomidates: accomidates
      };

      $scope.master.push(addressInfo);

      $scope.master.searched = true;
      $scope.master.hideForm = false;

      const payload = {
        address: address,
        zip: zip,
        bed: bed,
        bath: bath,
        accomidates: accomidates
      }

      $.post('/search', payload)
        .done((data) => {
          console.log(data.adr_predicted["2016"]);
          // let predictions = {
          //   adr: {
          //     1: data.adr_predicted.2016.1
          //   }
          // }
        }).fail((err) => {
          console.log("error", err);
        });
    };
});
