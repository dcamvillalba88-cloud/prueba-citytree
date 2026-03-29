const express = require("express");
const app = express();

app.use(express.json());

const usuariosRoutes = require("./src/routes/usuarios.routes");
app.use("/api/usuarios", usuariosRoutes);

const arbolesRoutes = require("./src/routes/arboles.routes");
app.use("/api/arboles", arbolesRoutes);

const mantenimientosRoutes = require("./src/routes/mantenimientos.routes");
app.use("/api/mantenimientos", mantenimientosRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

