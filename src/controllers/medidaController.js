var medidaModel = require("../models/medidaModel");

function ultimas(req, res) {

    console.log(`Recuperando as ultimas leituras`);

    medidaModel.ultimas()
    .then(function (resultados) {
        if (resultados.length > 0) {
            res.status(200).json(resultados);
        } else {
            res.status(204).send("Nenhum resultados encontrado!")
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
        .then(function (resultados) {
            if (resultados.length > 0) {
                res.status(200).json(resultados);
            } else {
                res.status(204).send("Nenhum resultados encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar fluxo por corredor.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    ultimas,
    buscarFluxoPorCorredor
};