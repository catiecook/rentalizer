angular.module('airdna')
  .service('mainService', function($http) {
    let revPotential = [];
    let airBnbData = [];

    function getInfo(bed, bath, accomidates, address, zip){
      const payload = {
        address: address,
        zip: zip,
        bed: bed,
        bath: bath,
        accomidates: accomidates
      }

      return $http.post('/search', payload)
        .then((response) => {
          let data = response.data;
          let adr = data.adr_predicted["2016"];
          let monthlyAverageAdr = data.adr_predicted.ltm;
          let occupancy = data.occ_predicted["2016"];
          let avOcc = (data.occ_predicted.ltm) * 100;
          let details = data.property_details;
          let revenue = data.revenue_potential["2016"];
          let yearRev = data.revenue_potential.ltm;
          let locations = [];
          let addresses = [];


          for(var i=0; i<data.comps.length; i++) {
            locations.push({
              lat: data.comps[i].lat,
              lon: data.comps[i].lng
            });
          };

          revPotential = revPot(revenue);
          //allocated airbnb data into won object
          airBnbData = {
            data: data.comps
          };

          getLatLng(data.comps);

          return {
            adr: adr,
            avAdr: monthlyAverageAdr,
            occupancy: occupancy,
            avOcc: avOcc,
            details: details,
            revenue: revenue,
            yearRev: yearRev,
            locations: locations
          };

        }).catch((err) => {
          console.log("error", err);
        });
    };

    function revPot(data) {
      return ({
        1: data["1"],
        2: data["2"],
        3: data["3"],
        4: data["4"],
        5: data["5"],
        6: data["6"],
        7: data["7"],
        8: data["8"],
        9: data["9"],
        10: data["10"],
        11: data["11"],
        12: data["12"],
      });
    };

    function getLatLng(data){
      for(var i =0; i<data.length; i++) {
        let lat = data[i].lat;
        let lng = data[i].lng;
        reverseGeocode(lat, lng, i);
      };
    };

    function reverseGeocode(lat, lng, i) {
      var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng= " + lat+"," + lng + "&key=AIzaSyB3_vklrmidqHqKCkQWiouLCyQ_I_KTYtE";
      $http.get(url).then((data) => {
        let address = data.data.results[0].formatted_address;
        airBnbData.data[i].address = address;
      });
    };

    function getAllabnb() {
      return airBnbData;
    };


    return {
      getInfo: getInfo,
      revPot: revPot,
      getAllabnb: getAllabnb
    };

  });
