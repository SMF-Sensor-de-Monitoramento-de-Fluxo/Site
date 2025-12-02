var database = require("../database/config");

function buscarFluxoPorCorredor(idSensor){
    var instrucaoSql = `
    select fkSensor idSensor, count(leitura) movimento from sensorLeitura where date(dataLeitura) between '${dtInicio}' and '${dtFim}' and time(dataLeitura) between '${hrInicio}' and ''${hrFim}`

    console.log("Executando SQL (fluxo por corredor):\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarFluxoPorCorredor
}