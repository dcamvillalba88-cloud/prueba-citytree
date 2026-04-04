const pool = require("../db");
exports.crearMantenimiento =  async (req, res) => {
    try {
        const {
            codigo_mantenimientos,
            id_arbol,
            solicitado_por,
            tipo_mantenimiento,
            descripcion_solicitud
        } = req.body;

        if (
            codigo_mantenimientos === undefined ||
        id_arbol === undefined ||
        solicitado_por === undefined ||
        tipo_mantenimiento === undefined ||
        descripcion_solicitud === undefined
        ){
        return res.status(400).json({ error: "todos los campos obligatorios" });
        }

        const result = await pool.query(
            `INSERT INTO mantenimientos
                (codigo_mantenimientos, id_arbol, solicitado_por, tipo_mantenimiento, descripcion_solicitud)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [codigo_mantenimientos, id_arbol, solicitado_por, tipo_mantenimiento, descripcion_solicitud]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el mantenimiento" });
    }
};

                                            /* GET /api/mantenimientos */

exports.obtenerMantenimientos = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM mantenimientos");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los mantenimientos" });
    }
};

                                            /* GET /api/mantenimientos/:id */

exports.obtenerMantenimientoPorId = async (req, res) => {       
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM mantenimientos WHERE id_mantenimiento = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Mantenimiento no encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el mantenimiento" });
    }
};  

                                            /* PUT /api/mantenimientos/asignar/:id */

exports.asignarMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const {asignado_a } = req.body;

        if (asignado_a === undefined) {
            return res.status(400).json({ error: "El campo 'asignado_a' es obligatorio" });
        }

        /* validacion de rol */
         const usuarioResult = await pool.query("SELECT * FROM usuarios WHERE id_usuario = $1 AND rol = 'mantenimiento'", [asignado_a]);
        if (usuarioResult.rows.length === 0) {
            return res.status(400).json({ error: "El usuario asignado no tiene el rol de mantenimiento" });
        }   

        const result = await pool.query(
            `UPDATE mantenimientos
            SET asignado_a = $1, estado = 'asignado',
            fecha_asignacion = CURRENT_TIMESTAMP
            WHERE id_mantenimiento = $2
            RETURNING *`,
            [asignado_a, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({ error: "Error al asignar el mantenimiento" });
    };
}
                                            /* PUT /api/mantenimientos/finalizar/:id */

exports.finalizarMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const { observaciones_finales, foto_url } = req.body;
        
        const result = await pool.query(
            `UPDATE mantenimientos
            SET estado = 'finalizado',
            fecha_finalizacion = CURRENT_TIMESTAMP,
            observaciones_finales = $1,
            foto_url = $2
            WHERE id_mantenimiento = $3
            RETURNING *`,
            [observaciones_finales, foto_url, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error al finalizar el mantenimiento" });
    }
};
