var medidaModel = require("../models/medidaModel");

function buscarUltimasLeituras(req, res) {

    const limite_linhas = 7;

    var idSensor = req.params.idSensor;

    console.log(`Recuperando as ultimas ${limite_linhas} leituras`);

    medidaModel.buscarUltimasLeituras(idSensor, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarFluxoPorCorredor(req, res) {
    var idMercado = req.params.idMercado; 

    console.log(`Buscando fluxo por corredor do mercado ${idMercado}`);

    medidaModel.buscarFluxoPorCorredor(idMercado)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar fluxo por corredor.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarUltimasLeituras,
    buscarFluxoPorCorredor
};