/*const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "super_clave_secreta"; // luego la movemos a .env

exports.login = async (req, res) => {
    try {
    const { correo_electronico, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM usuarios WHERE correo_electronico = $1",
        [correo_electronico]
    );

    if (result.rows.length === 0)
        return res.status(400).json({ message: "Usuario no encontrado" });

    const usuario = result.rows[0];

    if (usuario.estado !== 'ACTIVO')
        return res.status(403).json({ message: "Usuario inactivo" });

    const passwordValida = await bcrypt.compare(
        password,
        usuario.password_hash
    );

    if (!passwordValida)
        return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
        {
        id_usuario: usuario.id_usuario,
        rol: usuario.rol
        },
        SECRET_KEY,
        { expiresIn: "8h" }
    );

    res.json({ token });

    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

*/