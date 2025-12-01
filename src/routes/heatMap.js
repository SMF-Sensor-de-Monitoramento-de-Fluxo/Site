var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/heatMapController");

router.get("/ultimas/:idSensor", function (req, res) {
    medidaController.buscarUltimasLeituras(req, res);
});


module.exports = router;