const pool = require('../db');

                                            // POST /api/arboles
exports.crearArbol = async (req, res) => {
    try {
    const {
        codigo_arbol,
        especie,
        emplazamiento,
        circunferencia,
        altura,
        estado,
        latitud,
        longitud,
        comentarios,
        ingeniero_id
        } = req.body;

        if (
            !codigo_arbol === undefined || 
            !especie === undefined || 
            !emplazamiento === undefined || 
            !circunferencia === undefined || 
            !altura === undefined || 
            !estado === undefined || 
            !latitud === undefined || 
            !longitud === undefined || 
            !ingeniero_id === undefined) {
        return res.status(400).json({ error: "todos los campos obligatorios" });
        }

    const result = await pool.query(
        `INSERT INTO arboles
            (codigo_arbol, especie, emplazamiento, circunferencia, altura, estado, latitud, longitud, comentarios, ingeniero_id)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING *`,
            [codigo_arbol, especie, emplazamiento, circunferencia, altura, estado, latitud, longitud, comentarios, ingeniero_id]
    );

    res.status(201).json(result.rows[0]);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

                                            // GET /api/arboles

exports.obtenerArboles = async (req, res) => {
    try {
    const result = await pool.query("SELECT * FROM arboles");
    res.status(200).json(result.rows);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }   
};

                                            // GET /api/arboles/:id

exports.obtenerArbolPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM arboles WHERE id_arbol = $1", [id]);                                            
    if (result.rows.length === 0) {
        return res.status(404).json({ error: "Árbol no encontrado" });
    }
    res.status(200).json(result.rows[0]);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

                                            // PUT /api/arboles/:id

exports.actualizarArbol = async (req, res) => {         
    try {
    const { id } = req.params;
    const { codigo_arbol, 
            especie, 
            emplazamiento, 
            circunferencia, 
            altura, 
            estado, 
            latitud, 
            longitud, 
            comentarios, 
            ingeniero_id } = req.body;

if (!codigo_arbol || !especie || !emplazamiento || !circunferencia || !altura || !estado || !latitud || !longitud || !ingeniero_id) {
    return res.status(400).json({ error: "todos los campos obligatorios" });
};

const result = await pool.query(
    `UPDATE arboles SET 
        codigo_arbol = $1,  
        especie = $2,
        emplazamiento = $3,
        circunferencia = $4,
        altura = $5,
        estado = $6,
        latitud = $7,
        longitud = $8,
        comentarios = $9,
        ingeniero_id = $10
        WHERE id_arbol = $11
        RETURNING *`,
        [codigo_arbol, especie, emplazamiento, circunferencia, altura, estado, latitud, longitud, comentarios, ingeniero_id, id]
);

if (result.rows.length === 0) {
    return res.status(404).json({ error: "Árbol no encontrado" });
}

res.status(200).json(result.rows[0]);
} catch (error) {
    res.status(500).json({ error: error.message });
}
};

