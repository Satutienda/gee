const express = require('express');
const router = express.Router();
const espaciosService = require('./espacio.Service');


router.get('/espacios', async (req, resp) => {
    try {
        const espacios = await espaciosService.obtenerTodosLosEspacios();
        resp.json(espacios);
    } catch (error) {
        resp.status(500).json({ message: 'Error al obtener los espacios.' });
    }
});


router.put('/espacios/:id', async (req, res) => {
    const id = req.params.id;
    const nuevosDatos = req.body;

    try {
        const espacioActualizado = await espaciosService.actualizarEspacioPorId(id, nuevosDatos);
        console.log('Espacio actualizado:', espacioActualizado);
        res.json(espacioActualizado);
    } catch (error) {
        console.error('Error al actualizar el espacio:', error);
        res.status(500).json({ message: 'Error al actualizar el espacio.' });
    }
});


module.exports = router;
