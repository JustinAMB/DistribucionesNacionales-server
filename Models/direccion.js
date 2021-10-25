const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const direccionSchema = Schema({
    destinatario: { type: String, required: true },
    cedula: { type: String, required: true },
    zip: { type: String, required: true },
    direccion: { type: String, required: true },
    pais: { type: String, required: true },
    provincia: { type: String, required: true },
    canton: { type: String, required: true },
    distrito: { type: String, required: true },
    telefono: { type: String, required: true }
});
module.exports = mongoose.model('direccion', direccionSchema);