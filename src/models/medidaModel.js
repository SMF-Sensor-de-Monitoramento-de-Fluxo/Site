var database = require("../database/config");

function ultimas() {
    var instrucaoSql = `
        select * from vw_horas_minutos; 
    `;

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function buscarFluxoPorCorredor(idMercado){
    var instrucaoSql = `
    SELECT 
            s.nome AS corredor,
            SUM(sl.leitura) AS totalClientes
        FROM SensorLeitura sl
        JOIN Sensor se ON se.idSensor = sl.fkSensor
        JOIN Setor  s ON s.idSetor = se.fkSetor
        WHERE se.fkMercado = ${idMercado}
        GROUP BY s.idSetor, s.nome
        ORDER BY totalClientes DESC;`

    console.log("Executando SQL (fluxo por corredor):\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function buscarDadosSensor(idSensorFunc){
    var instrucaoSql = `
    SELECT sum(leitura) as leitura, date_format(dataLeitura, '%H:00') as hora FROM SensorLeitura WHERE fkSensor = ${idSensorFunc} GROUP BY hora LIMIT 10;`

    console.log("Executando SQL (buscando dados do sensor individual):\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function buscarDadosSensoreTempoReal(idSensorFunc) {

    var instrucaoSql = `SELECT sum(leitura) as leitura, date_format(dataLeitura, '%H:00') as hora FROM SensorLeitura WHERE fkSensor = ${idSensorFunc} GROUP BY hora ORDER BY hora DESC LIMIT 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    ultimas,
    buscarFluxoPorCorredor,
    buscarDadosSensor,
    buscarDadosSensoreTempoReal
}
