const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

// Definir el esquema para el documento Espacio
const EspacioSchema = new mongoose.Schema({


    _id:{type: ObjectId}, 
    NumReser:Number,
    formattedDate: Date,
    Espacio: String,
    Concat: String,
    seccion: String,
    reserVapor: String,
    fechaReser:{type: Date, default:Date.now},
    reservado: Boolean
});


const Espacio = mongoose.model('Espacio', EspacioSchema);

module.exports = Espacio;
