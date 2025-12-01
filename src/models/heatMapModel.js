var database = require("../database/config");

function buscarFluxoPorCorredor(idSensor){
    var instrucaoSql = `
    SELECT 
            s.nome AS corredor,
            SUM(sl.leitura) AS totalClientes
        FROM SensorLeitura sl
        JOIN Sensor se ON se.idSensor = sl.fkSensor
        JOIN Setor  s ON s.idSetor = se.fkSetor
        WHERE se.fkMercado = ${idSensor}
        GROUP BY s.idSetor, s.nome
        ORDER BY totalClientes DESC;`

    console.log("Executando SQL (fluxo por corredor):\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarFluxoPorCorredor
}