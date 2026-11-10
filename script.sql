CREATE TABLE usuario (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	senha VARCHAR(255) NOT NULL,
	perfil VARCHAR(255) NOT NULL CHECK(perfil IN('admin', 'atendente', 'tecnico')) 
);
CREATE TABLE proprietario (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	telefone VARCHAR(13) UNIQUE NOT NULL,
	cpf VARCHAR(11) UNIQUE NOT NULL
);
CREATE TABLE veiculo (
	id SERIAL PRIMARY KEY,
	marca VARCHAR(255) NOT NULL,
	modelo VARCHAR(255) NOT NULL,
	placa VARCHAR(7) UNIQUE NOT NULL,
	ano INT NOT NULL,
	cor VARCHAR(255) NOT NULL,
	proprietario_id INT NOT NULL REFERENCES proprietario(id)
);
CREATE TABLE ordem_servico (
	id SERIAL PRIMARY KEY,
	data_entrada TIMESTAMP NOT NULL,
	descricao VARCHAR(510) NOT NULL,
	tipo_servico VARCHAR(255) NOT NULL CHECK(tipo_servico IN('manutencao', 'estetica', 'funilaria')),
	valor NUMERIC(10,2),
	status VARCHAR(255) NOT NULL CHECK(status IN('aguardando', 'andamento', 'completo')),
	veiculo_id INT NOT NULL REFERENCES veiculo(id)
)