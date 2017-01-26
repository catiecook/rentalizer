var express = require('express');
var router = express.Router();
var request = require('request');
require('dotenv').config();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/search', (req, res, next) => {

  request("https://api.airdna.co/v1/rentalizer/estimate?access_token=NjU4Nw|68139ce880ed48539872b000046d7949&address=" + req.body.address + "&zipcode=" + req.body.zip + "&bedrooms="+ req.body.bed + "&bathrooms=" + req.body.bath + "&accomidates=" + req.body.accomidates,
    (error, response, body) => {
      if(error) {
        console.log("Error! Request failed at " + error);
      } else if (!error && response.statusCode === 200) {
          try {
            let stats = JSON.parse(response.body);
            res.json(stats);
          } catch(e) {
            console.log(e);
          }
      }
    });
});

exports.partials = function(req,res) {
  res.render('partials/' + req.params.name);
};

module.exports = router;
