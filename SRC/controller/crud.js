const db = require("../models/connection");

const validPatchFields = ["nombre", "telefono", "correo"];

async function getById(table, req, res) {
    try {
        const result = await db.query(
            `SELECT id, nombre, telefono, correo FROM ${table} WHERE id = $1`,
            [req.params.id]
        );

        if (!result.rows[0]) {
            return res.status(404).json({ error: "Registro no encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAll(table, res) {
    try {
        const result = await db.query(
            `SELECT id, nombre, telefono, correo FROM ${table} ORDER BY id`
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createOne(table, req, res) {
    try {
        const { nombre, telefono, correo } = req.body;

        if (!nombre || !telefono || !correo) {
            return res.status(400).json({
                error: "Debes enviar nombre, telefono y correo"
            });
        }

        const result = await db.query(
            `INSERT INTO ${table} (nombre, telefono, correo) VALUES ($1, $2, $3) RETURNING id, nombre, telefono, correo`,
            [nombre, telefono, correo]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateOne(table, req, res) {
    try {
        const { nombre, telefono, correo } = req.body;

        if (!nombre || !telefono || !correo) {
            return res.status(400).json({
                error: "Debes enviar todos los campos: nombre, telefono y correo"
            });
        }

        const result = await db.query(
            `UPDATE ${table} SET nombre = $1, telefono = $2, correo = $3 WHERE id = $4 RETURNING id, nombre, telefono, correo`,
            [nombre, telefono, correo, req.params.id]
        );

        if (!result.rows[0]) {
            return res.status(404).json({ error: "Registro no encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function patchOne(table, req, res) {
    try {
        const fields = Object.keys(req.body);

        if (fields.length !== 1 || !validPatchFields.includes(fields[0])) {
            return res.status(400).json({
                error: "Debes enviar solo una columna: nombre, telefono o correo"
            });
        }

        const column = fields[0];
        const value = req.body[column];

        const result = await db.query(
            `UPDATE ${table} SET ${column} = $1 WHERE id = $2 RETURNING id, nombre, telefono, correo`,
            [value, req.params.id]
        );

        if (!result.rows[0]) {
            return res.status(404).json({ error: "Registro no encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteOne(table, req, res) {
    try {
        const result = await db.query(
            `DELETE FROM ${table} WHERE id = $1 RETURNING id`,
            [req.params.id]
        );

        if (!result.rows[0]) {
            return res.status(404).json({ error: "Registro no encontrado" });
        }

        res.json({ mensaje: "Registro eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function getClienteById(req, res) {
    return getById("clientes", req, res);
}

function getClientes(req, res) {
    return getAll("clientes", res);
}

function createCliente(req, res) {
    return createOne("clientes", req, res);
}

function updateCliente(req, res) {
    return updateOne("clientes", req, res);
}

function patchCliente(req, res) {
    return patchOne("clientes", req, res);
}

function deleteCliente(req, res) {
    return deleteOne("clientes", req, res);
}

function getProveedorById(req, res) {
    return getById("proveedores", req, res);
}

function getProveedores(req, res) {
    return getAll("proveedores", res);
}

function createProveedor(req, res) {
    return createOne("proveedores", req, res);
}

function updateProveedor(req, res) {
    return updateOne("proveedores", req, res);
}

function patchProveedor(req, res) {
    return patchOne("proveedores", req, res);
}

function deleteProveedor(req, res) {
    return deleteOne("proveedores", req, res);
}

module.exports = {
    getClienteById,
    getClientes,
    createCliente,
    updateCliente,
    patchCliente,
    deleteCliente,
    getProveedorById,
    getProveedores,
    createProveedor,
    updateProveedor,
    patchProveedor,
    deleteProveedor
};
