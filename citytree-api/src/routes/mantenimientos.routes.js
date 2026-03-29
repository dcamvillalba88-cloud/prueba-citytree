const express = require('express');
const router = express.Router();    

const {
    crearMantenimiento,
    obtenerMantenimientos,
    obtenerMantenimientoPorId,
    asignarMantenimiento,
    finalizarMantenimiento
} = require('../controllers/mantenimientos.controller');

router.post("/", crearMantenimiento);
router.get("/", obtenerMantenimientos);
router.get("/:id", obtenerMantenimientoPorId);
router.put("/asignar/:id", asignarMantenimiento);
router.put("/finalizar/:id", finalizarMantenimiento);

module.exports = router;