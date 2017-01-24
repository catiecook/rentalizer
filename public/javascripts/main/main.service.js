angular.module('airdna')
  .service('mainService', function($http) {
    let allInfo = [];
    let airbnbData = [];

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
          let comp = data.comps;

          return {
            adr: adr,
            avAdr: monthlyAverageAdr,
            occupancy: occupancy,
            avOcc: avOcc,
            details: details,
            revenue: revenue,
            yearRev: yearRev,
            comp: comp
          };

        }).catch((err) => {
          console.log("error", err);
        });
    };

    return {
      getInfo: getInfo
    };

  });
