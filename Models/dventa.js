const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DventaSchema = Schema({
    producto: { type: Schema.ObjectId, ref: 'producto', required: true },
    venta: { type: Schema.ObjectId, ref: 'venta', require: true },
    subtotal: { type: Number, require: true },
    variedad: { type: String, require: false },
    cantidad: { type: Number, require: true },
    cliente: { type: Schema.ObjectId, ref: 'cliente', required: true },
    createdAt: { type: Date, default: Date.now, require: true }
});

module.exports = mongoose.model('dventa', DventaSchema);