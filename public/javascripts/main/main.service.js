angular.module('airdna')
  .service('mainService', function($http) {
    let revPotential = [];
    let airBnbData = [];
    var addresses = [];

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
          let comp = [];
          let locations = [];
          let addresses = [];

          comp.push(data.comps);

          for(var i=0; i<data.comps.length; i++) {
            locations.push({
              lat: data.comps[i].lat,
              lon: data.comps[i].lng
            });
          };

          revPotential = revPot(revenue);
          airBnbData.push(comp);

          getLatLng(airBnbData, comp[0]);
          console.log("comp", comp[0]);

          return {
            adr: adr,
            avAdr: monthlyAverageAdr,
            occupancy: occupancy,
            avOcc: avOcc,
            details: details,
            revenue: revenue,
            yearRev: yearRev,
            comp: comp,
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

    function getLatLng(data, comp){
      console.log("LAT LONG");
      for(var i =0; i<data[0].length; i++) {
        let lat = data[0][i].lat;
        let lng = data[0][i].lng;
        reverseGeocode(lat, lng, comp[i], i);
      }
    };

    function reverseGeocode(lat, lng, comp, i) {
      console.log("in geocode");
      var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng= " + lat+"," + lng + "&key=AIzaSyB3_vklrmidqHqKCkQWiouLCyQ_I_KTYtE";
      $http.get(url).then((data) => {
        // var data = data.data.results
        console.log(data);
        // comp.push({
        //   address: data[i].formatted_address
        // })
      })
    }

    return {
      getInfo: getInfo,
      revPot: revPot
    };

  });
