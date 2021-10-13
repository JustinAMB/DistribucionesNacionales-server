const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cuponSchema = Schema({
    codigo: { type: String, required: true },
    tipo: { type: String, required: true },
    valor: { type: number, required: true },
    cantidad: { type: number, required: true }


});
module.exports = mongoose.model(cuponSchema);