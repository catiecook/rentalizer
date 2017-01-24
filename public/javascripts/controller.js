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

    $scope.search = (bed, bath, accomidates, address, zip) => {
      let addressInfo = {
        address: address,
        zip: zip,
        bed: bed,
        bath: bath,
        accomidates: accomidates
      };

      $scope.master.push(addressInfo);

      const payload = {
        address: address,
        zip: zip,
        bed: bed,
        bath: bath,
        accomidates: accomidates
      }
      $.post('/search', payload)
        .done((data) => {
          console.log(data);
          let adr = data.adr_predicted["2016"];
          let monthlyAverageAdr = data.adr_predicted.ltm;
          let occupancy = data.occ_predicted["2016"];
          let avOcc = (data.occ_predicted.ltm) * 100;
          let details = data.property_details;
          let revenue = data.revenue_potential["2016"];
          let yearRev = data.revenue_potential.ltm;

          $scope.master.rentalizerPredictions.push({
            adr: adr,
            avAdr: monthlyAverageAdr,
            occupancy: occupancy,
            avOcc: avOcc,
            details: details,
            revenue: revenue,
            yearRev: yearRev
          });

          console.log($scope.master.rentalizerPredictions[0]);

          hideForm();
          showResults();
          $scope.$apply();

        }).fail((err) => {
          console.log("error", err);
        });
    };

    function hideForm() {
      $scope.master.hideForm = false;
    };

    function showResults() {
      $scope.master.searched = true;
    };

    function newSearch() {
      console.log("Here");
      $scope.master.rentalizerPredictions = [];
      $scope.master.hideForm = true;
      $scope.master.searched = false;
      $scope.$apply();
    }

});
