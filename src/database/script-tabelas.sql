CREATE DATABASE smf;
USE smf;

CREATE TABLE Mercado (
	idMercado INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    cnpj CHAR(14) NOT NULL,-- sem os pontos e traços
    codigo_verificacao char(5) unique
);

INSERT INTO Mercado (nome, cnpj, codigo_verificacao) VALUES
	('S Supermercados', '12345678000190', 'HU47S'),
	('Mercados São Paulo', '49285185000183', 'KS9V4'),
	('Supermercado Paulista', '49285185000183', 'XPB94');

CREATE TABLE Endereco (
	idEndereco INT AUTO_INCREMENT,
    fkMercado INT NOT NULL,
		CONSTRAINT fkMercadoEndereco -- Referenciando o fkMercado
			FOREIGN KEY (fkMercado)
				REFERENCES Mercado (idMercado),
		CONSTRAINT pkComposta
			PRIMARY KEY (idEndereco, fkMercado),
	cep CHAR(9) NOT NULL, -- sem o traço
    bairro VARCHAR(45) NOT NULL,
    logradouro VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(200)
);

INSERT INTO Endereco VALUES
	(DEFAULT, 1, '084285828', 'Jardim Brasil', 'Rua Brasilzinho', '123A', NULL),
	(DEFAULT, 2, '930293843', 'Vila Paulista', 'Avenida São Paulo', '5920', NULL),
	(DEFAULT, 3, '049284931', 'São Lucas', 'Rua Adriano Peixoto', '31', NULL);

CREATE TABLE Setor (
	idSetor INT AUTO_INCREMENT,
    fkMercado INT NOT NULL,
		CONSTRAINT fkMercadoSetor
			FOREIGN KEY (fkMercado)
				REFERENCES Mercado (idMercado),
		CONSTRAINT pkComposta
			PRIMARY KEY (idSetor, fkMercado),
	nome VARCHAR(45) NOT NULL
);

INSERT INTO Setor (fkMercado, nome) VALUES
	(1, 'Bebidas'),
	(1, 'Açougue'),
	(1,'Bebidas'),
    (1, 'limpeza'),
    (1, 'hortifruti'),
    (1, 'higiene pessoal'),
    (1, 'frios e laticinios'),
    (1, 'padaria'),
    (1, 'congelados');
    
    update Setor set nome = 'Mercearia' where idSetor = 3;
    
    select * from Setor; 

CREATE TABLE Sensor (
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
    fkSetor INT NOT NULL,
		CONSTRAINT fkSetorSensor
			FOREIGN KEY (fkSetor)
				REFERENCES Setor (idSetor),
	fkMercado INT NOT NULL,
		CONSTRAINT fkSetorMercado
			FOREIGN KEY (fkMercado)
				REFERENCES Mercado (idMercado),
	statusSensor VARCHAR(45),
		CONSTRAINT chkStatusSensor
			CHECK (statusSensor IN ('Ligado', 'Desligado'))
);

INSERT INTO Sensor (fkSetor, fkMercado, statusSensor) VALUES
	(1, 1, 'Ligado'),
	(2, 1, 'Ligado'),
	(3, 1, 'Ligado'),
    (4, 1,'ligado'),
    (5, 1,'ligado'),
    (6, 1,'ligado'),
    (7, 1,'ligado'),
    (8, 1, 'ligado'),
    (9, 1, 'ligado');
    
    select * from Setor;
    
    select * from Sensor;

CREATE TABLE SensorLeitura (
	idSensorLeitura INT AUTO_INCREMENT,
    fkSensor INT NOT NULL,
		CONSTRAINT fkSensorSensorLeitura
			FOREIGN KEY (fkSensor)
				REFERENCES Sensor (idSensor),
		CONSTRAINT pkComposta
			PRIMARY KEY (idSensorLeitura, fkSensor),
    leitura INT NOT NULL,
    dataLeitura DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeCompleto VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    FK_codigo_verificacao char(5),
    foreign key (FK_codigo_verificacao) references Mercado (codigo_verificacao),
    telefone char(11),
	senha VARCHAR(45) NOT NULL
);

INSERT INTO Usuario VALUES 
	(DEFAULT, 'Suporte SMF', 'suporte@smf.com', NULL, NULL, 'Suporte@123');
    
CREATE VIEW totalclientes_vw AS 
	SELECT 
    SUM(leitura) AS 'total de Clientes na Ultima Hora'
FROM SensorLeitura
WHERE dataLeitura >= DATE_SUB(NOW(), INTERVAL 1 HOUR);

CREATE VIEW maiorfluxo_vw AS
SELECT 
    s.idSensor AS Corredor,
    SUM(sl.leitura) AS Total
FROM SensorLeitura sl
JOIN Sensor s ON sl.fkSensor = s.idSensor
WHERE sl.dataLeitura >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
GROUP BY s.idSensor
ORDER BY total DESC
LIMIT 1;

CREATE VIEW menorfluxo_vw AS
SELECT 
    s.idSensor AS corredor,
    SUM(sl.leitura) AS total
FROM SensorLeitura sl
JOIN Sensor s ON sl.fkSensor = s.idSensor
WHERE sl.dataLeitura >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
GROUP BY s.idSensor
ORDER BY total ASC
LIMIT 1;

CREATE VIEW clienteporcorredor_vw AS
SELECT 
    s.idSensor AS corredor,
    SUM(sl.leitura) AS totalClientes
FROM SensorLeitura sl
JOIN Sensor s ON sl.fkSensor = s.idSensor
WHERE sl.dataLeitura >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
GROUP BY s.idSensor
ORDER BY s.idSensor;

CREATE VIEW clienteporhora_vw AS
SELECT 
    HOUR(sl.dataLeitura) AS hora,
    SUM(sl.leitura) AS totalClientes
FROM SensorLeitura sl
GROUP BY hora
ORDER BY hora;

CREATE VIEW clienteporhoranodia_vw AS
SELECT 
    HOUR(sl.dataLeitura) AS hora,
    SUM(sl.leitura) AS totalClientes
FROM SensorLeitura sl
WHERE DATE(sl.dataLeitura) = CURDATE()
GROUP BY hora
ORDER BY hora;
