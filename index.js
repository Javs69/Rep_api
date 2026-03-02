const express = require('express');
const app = express();

const db = require('./SRC/models/connection'); 
const cors = require('cors');
app.use(cors());    
app.use(express.json());


app.get("/", (req, res) => {
    res.send("API funcionando. Usa /api/usuarios");
});

app.get("/api/usuarios", async (req, res) => {
    const result = await db.query("SELECT * FROM usuarios");
    res.json(result.rows);
});

app.get("/api/usuarios/:id", async (req, res) => {
    const result = await db.query("SELECT * FROM usuarios WHERE id = $1", [req.params.id]);
    res.json(result.rows[0]);
});


app.post("/api/usuarios", async (req, res) => {
    const { usuario, password, email } = req.body;
    const result = await db.query(
        "INSERT INTO usuarios (usuario, password, email) VALUES ($1, $2, $3) RETURNING *",
        [usuario, password, email]
    );
    res.json(result.rows[0]);
});


app.put("/api/usuarios/:id", async (req, res) => {
    const { usuario, password, email } = req.body;
    const result = await db.query(
        "UPDATE usuarios SET usuario = $1, password = $2, email = $3 WHERE id = $4 RETURNING *",
        [usuario, password, email, req.params.id]
    );
    res.json(result.rows[0]);
});


app.patch("/api/usuarios/:id", async (req, res) => {
    const { email } = req.body;
    const result = await db.query(
        "UPDATE usuarios SET email = $1 WHERE id = $2 RETURNING *",
        [email, req.params.id]
    );
    res.json(result.rows[0]);
});

app.delete("/api/usuarios/:id", async (req, res) => {
    await db.query("DELETE FROM usuarios WHERE id = $1", [req.params.id]);
    res.send("Usuario eliminado");
});


app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});