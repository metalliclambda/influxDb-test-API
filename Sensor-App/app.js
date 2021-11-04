const axios = require("axios");

// this can be any app to send GET and POST request
// you can get data with browser
//  http://localhost:8080/getdata/1
//  http://localhost:8080/getavg/1


axios.post('http://localhost:8080/postdata', {
    cpuNumber: '1',
    temp: 85
  })
  .then(function (response) {
    console.log(response.status);
  })
  .catch(function (error) {
    console.log(error);
  });




