const express = require("express");
const router = express.Router();

const funciones = require("../controller/crud");

router.get("/clientes/:id", funciones.getClienteById);
router.get("/clientes", funciones.getClientes);
router.post("/clientes", funciones.createCliente);
router.put("/clientes/:id", funciones.updateCliente);
router.patch("/clientes/:id", funciones.patchCliente);
router.delete("/clientes/:id", funciones.deleteCliente);

router.get("/proveedores/:id", funciones.getProveedorById);
router.get("/proveedores", funciones.getProveedores);
router.post("/proveedores", funciones.createProveedor);
router.put("/proveedores/:id", funciones.updateProveedor);
router.patch("/proveedores/:id", funciones.patchProveedor);
router.delete("/proveedores/:id", funciones.deleteProveedor);

module.exports = router;
