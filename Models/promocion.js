const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const promocionSchema = Schema({
    titulo: { type: String, required: true },
    banner: { type: String, required: true },
    descuento: { type: number, required: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },

});
module.exports = mongoose.model(promocionSchema);