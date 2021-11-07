const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnvioSchema = Schema({

    etapas: [{ type: Object, required: true }],
    venta: { type: Schema.ObjectId, ref: 'venta', required: true },

});

module.exports = mongoose.model('envio', EnvioSchema);