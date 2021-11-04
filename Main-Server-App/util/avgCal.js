const { client, org, bucket , Point } = require("./influxdb");
const Temp = require('../models/temp');

const avgCalculator = (cpuNumber) => {
    const cpuNodeToRead = cpuNumber;

    console.log("*** QUERY For Avrage ***");
    const queryApi = client.getQueryApi(org);
    const fluxQuery = `from(bucket:"${bucket}") 
    |> range(start: -2h)
    |> filter(fn: (r) => r._measurement == "CpuTemperature")
    |> filter(fn: (r) => r.NodeNumber == "${cpuNodeToRead}")`;

    queryApi
        .collectRows(fluxQuery /*, you can specify a row mapper as a second arg */)
        .then((data) => {
            if(data.length){
                let sum = 0;
                data.forEach(x => sum += x._value);
                let avg = sum/data.length;
                const temp = new Temp({
                    avgTemp : avg,
                    nodeNumber : cpuNumber
                });
                temp.save();
                console.log("\nCollect ROWS SUCCESS AVG Saved");        
            } else {
            }
        })
        .catch((error) => {
            console.error(error);
            console.log("\nCollect ROWS ERROR");
        });
}


// Set the average temp every 5 min in mongoDB
setInterval(() => {
    avgCalculator(1);
}, 5*60*1000);

