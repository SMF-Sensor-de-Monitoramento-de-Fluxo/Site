var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas", function (req, res) {
    medidaController.ultimas(req, res);
});
router.get("/corredores/:idMercado", function (req, res) {
    medidaController.buscarFluxoPorCorredor(req, res);
});

module.exports = router;