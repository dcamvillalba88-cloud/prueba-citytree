const pool = require("../db");
const bcrypt = require("bcrypt");

exports.crearUsuario = async (req, res) => {
    try {
        const { numero_identificacion, nombres, apellidos, direccion, telefono, correo_electronico, rol, password } = req.body;

        // Validar rol
        if (!['administrador','ingeniero','mantenimiento'].includes(rol)) {
            return res.status(400).json({ error: "Rol inválido" });
        }

        // Generar hash de contraseña
        const password_hash = await bcrypt.hash(password, 10);

        // Insertar en la DB
        const result = await pool.query(
            `INSERT INTO usuarios 
            (numero_identificacion, nombres, apellidos, direccion, telefono, correo_electronico, rol, password_hash, estado)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'ACTIVO')
            RETURNING id_usuario`,
            [numero_identificacion, nombres, apellidos, direccion, telefono, correo_electronico, rol, password_hash]
        );

        res.status(201).json({ mensaje: "Usuario creado correctamente", id_usuario: result.rows[0].id_usuario });

    } catch (error) {
        console.error(error);  // Aquí ves el error real en la consola
        res.status(500).json({ error: "Error al crear el usuario" });
    }
};
                                                             // GET → Obtener todos los usuarios activos
exports.obtenerUsuarios = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM usuarios WHERE estado='ACTIVO'");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};

                                                             // PUT → Actualizar usuario existente
exports.actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { numero_identificacion, nombres, apellidos, direccion, telefono, correo_electronico, rol, password } = req.body;

        // Verificar si existe
        const usuarioExistente = await pool.query(
            "SELECT * FROM usuarios WHERE id_usuario = $1",
            [id]
        );

        if (!usuarioExistente.rows.length) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        //verifica si correo ya existe
        const correoexistente = await pool.query(
            "SELECT * FROM usuarios WHERE correo_electronico = $1 AND id_usuario != $2",
            [correo_electronico, id]
        );
        if (correoexistente.rows.length > 0) {
            return res.status(400).json({ error: "Correo ya esta registrado en otro usuario" });
        }

        //verifica si numero de identificacion ya existe
        const numeroIdentificacionExistente = await pool.query(
            "SELECT * FROM usuarios WHERE numero_identificacion = $1 AND id_usuario != $2", [numero_identificacion, id]
        );
        if (numeroIdentificacionExistente.rows.length > 0) {
            return res.status(400).json({ error: "Número de identificación ya está registrado en otro usuario" });
        }

        // Validar rol
        if (rol && !['administrador','ingeniero','mantenimiento'].includes(rol)) {
            return res.status(400).json({ error: "Rol inválido" });
        }

        let password_hash = usuarioExistente.rows[0].password_hash;

        // Si envían nueva contraseña
        if (password) {
            password_hash = await bcrypt.hash(password, 10);
        }

        await pool.query(
            `UPDATE usuarios
            SET nombres=$1,
            apellidos=$2,
            direccion=$3,
            telefono=$4,
            correo_electronico=$5,
            rol=$6,
            password_hash=$7
            WHERE id_usuario=$8`,
            [nombres, apellidos, direccion, telefono, correo_electronico, rol, password_hash, id]
        );

        res.json({ mensaje: "Usuario actualizado correctamente" });

    } catch (error) {
        if (error.code === "23505") {
            return res.status(400).json({
                error: "Correo o número de identificación ya existe"
            });
        }

        console.error(error);
        res.status(500).json({ error: "Error al actualizar usuario" });
    }
};

                                                              // DELETE → Soft delete (marcar como INACTIVO)
                                                            
exports.eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si existe
        const usuarioExistente = await pool.query(
            "SELECT * FROM usuarios WHERE id_usuario = $1",
            [id]
        );

        if (usuarioExistente.rows.length === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        // Soft delete: marcar como INACTIVO
        const result = await pool.query(
            "UPDATE usuarios SET estado='INACTIVO' WHERE id_usuario=$1 RETURNING *",
            [id]
        );

        res.json({ mensaje: "Usuario desactivado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};