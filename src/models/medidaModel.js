var database = require("../database/config");

function buscarUltimasLeituras(idSensor, limite_linhas) {
    var instrucaoSql = `
        SELECT 
            leitura,
            dataLeitura,
            DATE_FORMAT(dataLeitura, '%H:%i') AS momento_grafico
        FROM SensorLeitura
        WHERE fkSensor = ${idSensor}
        ORDER BY dataLeitura DESC
        LIMIT ${limite_linhas}; 
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

module.exports = {
    buscarUltimasLeituras,
    buscarFluxoPorCorredor
}
