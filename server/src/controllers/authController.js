import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const senhaValida = usuario &&
    await bcrypt.compare(senha, usuario.senha);
if (!senhaValida) {
    return res.status(401).json({
        mensagem: "Credenciais inválidas."
    });
}
const token = jwt.sign(
    {
        id: usuario.id,
        perfil: usuario.perfil
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "30m"
    }
);
return res.json({
    token,
    usuario: {
        id: usuario.id,
        nome: usuario.nome,
        perfil: usuario.perfil
    }
});