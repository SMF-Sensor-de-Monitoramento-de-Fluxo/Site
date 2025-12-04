var heatMapModel = require("../models/medidaModel");



function buscarDados(req, res) {

    var dataFinal = req.params.dtFinal;
    var dataInicial = req.params.dtInicial;
    var horaFinalIntervalo = req.params.hrFinalIntervalo;
    var horaInicioIntervalo = req.params.hrInicioIntervalo;
    console.log("------------------------------------")
    console.log(dataFinal)
    console.log("------------------------------------")

    heatMapModel.buscarIntervalo(dataFinal, dataInicial, horaFinalIntervalo, horaInicioIntervalo)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarDados
}