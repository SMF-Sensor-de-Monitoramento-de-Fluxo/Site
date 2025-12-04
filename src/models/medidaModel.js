var database = require("../database/config");

function ultimas() {
    var instrucaoSql = `
        SELECT DATE_FORMAT(dataLeitura, '%H') AS hora, FLOOR(MINUTE(dataLeitura)/10)*10 AS dezena_minuto, 
	    SUM(leitura) as leitura FROM SensorLeitura where date_format(dataLeitura, '%H') = (select date_format(dataLeitura,'%H')
        from SensorLeitura order by dataLeitura desc limit 1 offset 1) GROUP BY hora, dezena_minuto ORDER BY hora, dezena_minuto desc; 
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
