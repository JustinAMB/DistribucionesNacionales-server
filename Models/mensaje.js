const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mensajeSchema = Schema({
    cliente: { type: String, required: true },
    mensaje: { type: String, required: true },
    asunto: { type: String, required: true },
    estado: { type: number, required: true }


});
module.exports = mongoose.model(mensajeSchema);