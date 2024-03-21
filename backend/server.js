require('dotenv').config({ path: './config.env' }); // Cargar las variables de entorno desde config.env

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const espaciosRoutes = require('./espaciosRoutes');

const app = express();

// Configuración de CORS
const whitelist = [
    "http://localhost:8080",
    "http://localhost:3000",
    "https://satuaplicacion.com",
    "http://127.0.0.1:5500",
    "http://localhost:3001",
    "http://localhost:3001/seccion/Finanzas",
    "http://localhost:3000/api/espacios"
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("No tienes permiso para esta web"));
        }
    }
};

app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api', espaciosRoutes);

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conexión a MongoDB establecida correctamente');
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB:', err);
    });

// Manejo de errores CORS
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(403).json({ error: 'No tienes permiso para esta web' });
    }
});

// Puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
