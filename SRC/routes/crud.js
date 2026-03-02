const express = require("express");
const router = express.Router();

// CORREGIDO: Ruta de importación correcta
const funciones = require('../controller/crud');

// CORREGIDO: Rutas con parámetros donde corresponden
router.get("/usuarios/:id", funciones.get1);      // GET por ID
router.get("/usuarios", funciones.get2);          // GET todos
router.post("/usuarios", funciones.post1);        // POST crear
router.put("/usuarios/:id", funciones.put);       // PUT actualizar
router.patch("/usuarios/:id", funciones.patch);   // PATCH actualizar
router.delete("/usuarios/:id", funciones.delete1); // DELETE

module.exports = router;