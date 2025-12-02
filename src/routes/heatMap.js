var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/heatMapController");

router.get("/buscarIntervalo", function (req, res) {
    heatMapController.buscarIntervalo(req, res);
});


module.exports = router;