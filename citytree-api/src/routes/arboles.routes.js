const express = require('express');
const router = express.Router();    
const arbolesController = require('../controllers/arboles.controller');

router.post("/", arbolesController.crearArbol);
router.get("/", arbolesController.obtenerArboles);
router.get("/:id", arbolesController.obtenerArbolPorId);
router.put("/:id", arbolesController.actualizarArbol);
router.delete("/:id", arbolesController.eliminarArbol);    

module.exports = router;