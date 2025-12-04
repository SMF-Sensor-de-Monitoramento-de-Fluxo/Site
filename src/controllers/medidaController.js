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

function buscarDadosSensor(req, res) {
    var idSensorFunc = req.params.idSensorFunc; 

    console.log(`Buscando os dados do sensor ${idSensorFunc}`);

    medidaModel.buscarDadosSensor(idSensorFunc)
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

function buscarDadosSensorTempoReal(){
    
   var idSensorFunc = req.params.idSensorFunc; 

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarDadosSensorTempoReal(idSensorFunc).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados em tempo real.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    ultimas,
    buscarFluxoPorCorredor,
    buscarDadosSensor,
    buscarDadosSensorTempoReal
};