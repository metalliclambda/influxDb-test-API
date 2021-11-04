// as details of the project was not specified, status codes are not considered completely.
// API call configurations are simple


//*****************
// to read Last Temp : end point is :
// GET http://localhost:8080/getdata/cpu-number
// Example : http://localhost:8080/getdata/1

// to set a Temp of a cpu : end point is :
// POST  http://localhost:8080/postdata
/* and it should include JSON data in the body (cpu number and temprature) : 
{
    "cpuNumber" : "1",
    "temp" : 55
}
*/


// You can make the API call with any app like postman
// in this app influxDB v2 is used.


const express = require("express");
const mongoose = require("mongoose");
const axios = require('axios');
const avgCal = require('./util/avgCal');

const MONGODB_URI = "mongodb://localhost:27017/avg-temp-db";

// routes for express
const itemRoutes = require("./routes/item");

const app = express();

app.use(express.json());

app.use(itemRoutes);

// start the server with DBs
axios.get('http://localhost:8086/ping')
  .then(response => {
    console.log('OK');
    return mongoose.connect(MONGODB_URI);
  })
  .then(()=>{
    console.log('DBs Connected !');
    app.listen(8080, (req, res) => {
      console.log("Server Started ! on Port 8080");
    });
  })
  .catch(error => {
    // console.log(error);
    console.log("DB Connection Error");
  });
  

