var database = require("../database/config");

function buscarIntervalo(dataFinal, dataInicial, horaFinalIntervalo, horaInicioIntervalo){
    var instrucaoSql = `
    select fkSensor idSensor, count(leitura) movimento from SensorLeitura where date(dataLeitura) between '${dataInicial}' and '${dataFinal}' and time(dataLeitura) between '${horaInicioIntervalo}' and '${horaFinalIntervalo}' group by idSensor;`

    console.log("Executando SQL (fluxo por corredor):\n" + instrucaoSql);

    
    return database.executar(instrucaoSql); 
    
}

module.exports = {
    buscarIntervalo
}