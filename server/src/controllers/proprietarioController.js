import { pool } from "../config/database.js";
export const listarProprietarios = async (req, res) => {
    try {
        const resultado = await pool.query(`
SELECT id, nome, email, telefone
FROM proprietarios
ORDER BY nome
`);
        return res.json(resultado.rows);
    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao listar proprietários."
        });
    }
};
export const criarProprietario = async (req, res) => {
    try {
        const { nome, email, telefone, cpf } = req.body;
        const resultado = await pool.query(
            `INSERT INTO proprietarios
(nome, email, telefone, cpf)
VALUES ($1, $2, $3, $4)
RETURNING id, nome, email, telefone`,
            [nome, email, telefone, cpf]
        );
        return res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        return res.status(400).json({
            mensagem: "Não foi possível cadastrar proprietário."
        });
    }
};