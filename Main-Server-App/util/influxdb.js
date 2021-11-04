
const { InfluxDB, Point, HttpError } = require('@influxdata/influxdb-client')

// You can generate a Token from the "Tokens Tab" in the UI
// you should use your own token
// you should use your own org
// you should use your own bucket

// You can generate a Token from the "Tokens Tab" in the UI
const token = 'You should use your own token';
const org = 'You should use your own org';
const bucket = 'You should use your own bucket';



const client = new InfluxDB({ url: 'http://localhost:8086', token: token });

module.exports.client = client;
module.exports.org = org;
module.exports.bucket = bucket;
module.exports.Point = Point;