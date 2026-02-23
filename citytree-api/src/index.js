const express = require("express");
const app = express();

app.use(express.json());

const usuariosRoutes = require("./routes/usuarios.routes");

app.use("/api/usuarios", usuariosRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

