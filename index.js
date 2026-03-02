const express = require("express");
const cors = require("cors");
require("dotenv").config();

const crudRoutes = require("./SRC/routes/crud");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensaje: "API funcionando",
        endpoints: [
            "/api/clientes",
            "/api/clientes/:id",
            "/api/proveedores",
            "/api/proveedores/:id"
        ]
    });
});

app.use("/api", crudRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
