var medidaModel = require("../models/medidaModel");

function buscarIntervalo(req, res) { 

    console.log(`Buscando dados por sensor.`);

    heatMapModel.buscarIntervalo()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro na busca de dados.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarIntervalo
};