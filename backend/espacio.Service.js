
const Espacio = require('./espacios.Schema');
const mongoose = require('mongoose');


async function actualizarEspacioPorId(id, nuevosDatos) {
    try {
        console.log('ID recibido:', id);


        const ObjectId = mongoose.Types.ObjectId;
        const objectId = new ObjectId(id);


        const espacioExistente = await Espacio.findById(objectId);


        if (!espacioExistente) {
            throw new Error('El espacio no fue encontrado');
        }


        Object.assign(espacioExistente, nuevosDatos);


        const espacioActualizado = await espacioExistente.save();

        return espacioActualizado;
    } catch (error) {
        console.error("Error al actualizar el espacio:", error);
        throw error;
    }
}



async function obtenerTodosLosEspacios() {
    try {


        // Calcular la fecha límite superior (3 meses hacia adelante)
        const fechaLimiteSuperior = new Date();
        fechaLimiteSuperior.setMonth(fechaLimiteSuperior.getMonth() + 3);


        // Calcular la fecha límite inferior (3 meses hacia atrás)
        const fechaLimiteInferior = new Date();
        fechaLimiteInferior.setMonth(fechaLimiteInferior.getMonth() - 3);


        // Consultar los espacios dentro del rango de fechas
        const espacios = await Espacio.find({
            formattedDate: {
                $gte: fechaLimiteInferior,
                $lte: fechaLimiteSuperior
            }
        });


        return espacios;
    } catch (error) {
        console.error("Error al obtener los espacios:", error);
        throw error;
    }
}


module.exports = {
    actualizarEspacioPorId,
    obtenerTodosLosEspacios
};
