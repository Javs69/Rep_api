const db = require("../models/connection");

async function get1(req, res){
    try {
        const result = await db.query("SELECT id, usuario, email FROM usuarios WHERE id = $1", [req.params.id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function get2(req, res){
    try {
        const result = await db.query("SELECT id, usuario, email FROM usuarios");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function post1(req, res){
    try {
        const { usuario, password, email } = req.body;
        const result = await db.query(
            "INSERT INTO usuarios (usuario, password, email) VALUES ($1, $2, $3) RETURNING id, usuario, email",
            [usuario, password, email]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function put(req, res){
    try {
        const { usuario, password, email } = req.body;
        const result = await db.query(
            "UPDATE usuarios SET usuario = $1, password = $2, email = $3 WHERE id = $4 RETURNING id, usuario, email",
            [usuario, password, email, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function patch(req, res){
    try {
        const { id } = req.params;
        if (req.body.password) {
            const result = await db.query(
                "UPDATE usuarios SET password = $1 WHERE id = $2 RETURNING id, usuario",
                [req.body.password, id]
            );
            res.json({ mensaje: "Contraseña actualizada", usuario: result.rows[0] });
        }
        else if (req.body.email) {
            const result = await db.query(
                "UPDATE usuarios SET email = $1 WHERE id = $2 RETURNING id, usuario, email",
                [req.body.email, id]
            );
            res.json({ mensaje: "Email actualizado", usuario: result.rows[0] });
        }
        else {
            res.status(400).json({ error: "Envía password o email para actualizar" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function delete1(req, res){
    try {
        await db.query("DELETE FROM usuarios WHERE id = $1", [req.params.id]);
        res.json({ mensaje: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    get1,
    get2,
    post1,
    put,
    patch,
    delete1
};