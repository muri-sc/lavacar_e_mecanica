import { pool } from "../config/database.js";
export const criarOrdemServico = async (req, res) => {
    try {
        const {
            descricao,
            tipoServico,
            valor,
            veiculoId
        } = req.body;
        const resultado = await pool.query(
            `INSERT INTO ordens_servico
(descricao, "tipoServico", valor, "veiculoId")
VALUES ($1, $2, $3, $4)
RETURNING *`,
            [descricao, tipoServico, valor, veiculoId]
        );
        return res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        return res.status(400).json({
            mensagem: "Não foi possível criar ordem de serviço."
        });
    }
};
export const listarOrdensServico = async (req, res) => {
    try {
        const resultado = await pool.query(`
SELECT
os.id,
os."dataEntrada",
os.descricao,
os."tipoServico",
os.valor,
os.status,
v.placa,
v.modelo,
v.marca,
p.nome AS "proprietarioNome"
FROM ordens_servico os
INNER JOIN veiculos v
ON v.id = os."veiculoId"
INNER JOIN proprietarios p
ON p.id = v."proprietarioId"
ORDER BY os."dataEntrada" DESC
`);
        return res.json(resultado.rows);
    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao listar ordens de serviço."
        });
    }
};
export const atualizarStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const resultado = await pool.query(
            `UPDATE ordens_servico
SET status = $1, "updatedAt" = NOW()
WHERE id = $2
RETURNING *`,
            [status, id]
        );
        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem: "Ordem de serviço não encontrada."
            });
        }
        return res.json(resultado.rows[0]);
    } catch (erro) {
        return res.status(400).json({
            mensagem: "Não foi possível atualizar o status."
        });
    }
};
