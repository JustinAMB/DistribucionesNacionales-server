const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cuponSchema = Schema({
    codigo: { type: String, required: true },
    tipo: { type: String, required: true },
    valor: { type: Number, required: true },
    cantidad: { type: Number, required: true }


});
module.exports = mongoose.model('cupon', cuponSchema);