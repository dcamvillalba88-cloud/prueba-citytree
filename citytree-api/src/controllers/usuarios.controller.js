exports.obtenerUsuarios = (req, res) => {
    const usuariosController = [
        {
        id: 1,
        nombre: "Ana",
        apellido: "Gomez",
        correo: "ana@mail.com",
        rol: "ADMIN",
        estado: "ACTIVO"
    }
];
    res.json(usuariosController);   
};

// Este controlador devuelve una lista de usuarios en formato JSON. GET

exports.obtenerUsuarios = (req, res) => {
    const activos = [usuariosController.filter(usuario => usuario.estado === "ACTIVO")];
    res.json(activos);
}

// post para crear un nuevo usuario
exports.crearUsuario = (req, res) => {
    const nuevoUsuario = { id: usuario.legth + 1, ...req.body, estado: "ACTIVO" };
    usuariosController.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
};

// PUT para actualizar un usuario existente
exports.actualizarUsuario = (req, res) => {
    const {id} = req.params;
    const usuario = usuariosController.find(usuario => usuario.id === id);

    if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    Object.assign(usuario, req.body);
    res.json(usuario);
};

// Soft delete para eliminar un usuario (cambiar estado a INACTIVO)
exports.eliminarUsuario = (req, res) => {
    const {id} = req.params;
    const usuario = usuariosController.find(usuario => usuario.id === id);

    if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    usuario.estado = "INACTIVO";
    res.json({ mensaje: "Usuario desactivado correctamente" });
};
