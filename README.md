# InfluxDB for Sensor Data
in this app, other devices can send data via POST request(REST API), to the server and the server will save the data to the InfluxDB.
and the user can get the last data with GET request.
http://localhost:8080/getdata/1
Every 5 min , app, calculate an average sensor data and save it in MongoDB

user can get the last average Data with GET request at the endpoint :
http://localhost:8080/getavg/1


MVC architecture and routing is used.

Main focus in this project is on the beckend.


### Technologies :
* Node.js
* MongoDB
* Express js
* mongoose
* influxdb
* axios


### Requirements :
To run the project you need to have installed NodeJs, MongoDB. influxDB v 2

### Run the app
after establishing MongoDB and InfluxDB v2 database

Open terminal in the project folder


// to install packages : in each server folder

$npm install

// to run the app :

$npm start

app works on port 8080

http://localhost:8080

// To stop the server :
just press Ctrl+C in Terminal

