const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "citytree",
    password: "PostgreMily88",
    port: 5432
});

pool.connect().then(() => console.log("Conexión a la base de datos exitosa")).catch(err => console.error("Error al conectar a la base de datos", err));

module.exports = pool;