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
	(3,'Bebidas');

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
	(3, 2, 'Ligado');

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

INSERT INTO SensorLeitura (fkSensor, leitura, dataLeitura) VALUES
	(1, 23, '2025-10-27 08:30:00'),
	(1, 25, '2025-10-27 09:00:00'),
	(1, 27, '2025-10-27 09:30:00'),

	(2, 18, '2025-10-27 08:45:00'),
	(2, 20, '2025-10-27 09:15:00'),
	(2, 19, '2025-10-27 09:45:00'),

	(3, 30, '2025-10-27 08:00:00'),
	(3, 31, '2025-10-27 08:30:00'),
	(3, 29, '2025-10-27 09:00:00');

CREATE TABLE Usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeCompleto VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    FK_codigo_verificacao char(5),
    foreign key (FK_codigo_verificacao) references Mercado (codigo_verificacao),
    telefone char(11),
	senha VARCHAR(45) NOT NULL
);


INSERT INTO Usuario (nomeCompleto, email, FK_codigo_verificacao, telefone, senha) VALUES
	('Lucas Almeida da Silva','Lucas@mercado.com','HU47S','11942378945', 'LuAS123'),
	('Vagner Souza','vagner@mercado.com','KS9V4','11934578943', 'szVag1'),
	('Roberto Assis','roberto@mercado.com','XPB94','11917894567', 'roAssis06');
    
select * from Usuario;

SELECT codigo_verificacao FROM Mercado WHERE codigo_verificacao = 'HU47S';
    
    INSERT INTO SensorLeitura (fkSensor, leitura, dataLeitura) VALUES
    (1, 21, '2025-11-30 18:40:00'),
    (1, 24, '2025-11-30 18:50:00'),
    (1, 26, '2025-11-30 18:55:00'),

    (2, 17, '2025-11-30 18:50:00'),
    (2, 19, '2025-11-30 18:58:00'),
    (2, 18, '2025-11-30 18:59:00'),

    (3, 28, '2025-11-30 19:20:00'),
    (3, 30, '2025-11-30 19:25:00'),
    (3, 32, '2025-11-30 19:30:00');