angular.module('airdna')

.controller('RentalizerController', function($scope) {
    $scope.master = [];
    $scope.master.searched = false;
    $scope.master.newSearch = false;

    $scope.search = (bed, bath, address) => {
      var houseInfo = {
        address: address,
        bed: bed,
        bath: bath,
      };

      $scope.master.searched = true;
      $scope.master.push(houseInfo);
      console.log(houseInfo);
      console.log($scope.master.searched);

    }

    $scope.newSearch = () => {
      $scope.master.newSearch = true;
      $scope.master = {};
    }
});
