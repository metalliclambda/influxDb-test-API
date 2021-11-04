const { client, org, bucket , Point } = require("../util/influxdb");
const Temp = require('../models/temp');

module.exports.postData = (req, res, next) => {

    console.log('POST');

    console.log(req.body);

    const writeApi = client.getWriteApi(org, bucket, "s");

    writeApi.useDefaultTags({ NodeNumber: req.body.cpuNumber });
    const point = new Point("CpuTemperature").floatField(
        "value", req.body.temp        
    );

    writeApi.writePoint(point);
    writeApi
        .close()
        .then(() => {
        console.log("Finished");
        res.status(201).json({
            message : "Data Stored Successfully"
        });
        // res.send("OKK");
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json({
            message : "Server Error"
        });
        // res.send("ERRRR");
        });
};

module.exports.getLastData = (req, res, next) => {

    const cpuNodeToRead = req.params.cpuNumber;
  
    console.log("*** QUERY ROWS To Read ***");
    const queryApi = client.getQueryApi(org);
    const fluxQuery = `from(bucket:"${bucket}") 
    |> range(start: -1d)
    |> filter(fn: (r) => r._measurement == "CpuTemperature")
    |> filter(fn: (r) => r.NodeNumber == "${cpuNodeToRead}")
    |> last()`;

    queryApi
        .collectRows(fluxQuery /*, you can specify a row mapper as a second arg */)
        .then((data) => {
        if (data.length) {
            console.log(data[0]._value);
            console.log("\nCollect ROWS SUCCESS");
            let f = String(data[0]._value);
            res.status(200).json({value : f});            
        } else {
            res.status(500).json({Error : "No data"})
        }
        })
        .catch((error) => {
        console.error(error);
        console.log("\nCollect ROWS ERROR");
        });
};

module.exports.getLastAvg = (req, res, next) => {
    const cpuNodeToRead = req.params.cpuNumber;


    Temp.find()
        .limit(1).sort({$natural:-1})
        .then(results => {
            res.status(200).json({
                cpuNumber : results[0].nodeNumber ,
                lastAvgValue : results[0].avgTemp
            });
        })
        .catch((err)=>{
            res.status(500).json({Error : "No data"})
        });
    
};
