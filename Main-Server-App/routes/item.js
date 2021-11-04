const express = require("express");
const itemController = require("../controllers/item");

const router = express.Router();

router.post("/postdata" , itemController.postData );

router.get('/getdata/:cpuNumber' , itemController.getLastData);

router.get('/getavg/:cpuNumber' , itemController.getLastAvg);

module.exports = router;
