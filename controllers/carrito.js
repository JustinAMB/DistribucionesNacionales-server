const Carrito = require('../models/carrito');

const agregar_carrito_cliente = async(req, res) => {
    try {
        if (req.user) {
            let data = req.body;

            let carrito_cliente = await Carrito.find({ cliente: data.cliente, producto: data.producto });

            if (carrito_cliente.length == 0) {
                let reg = await Carrito.create(data);
                res.status(200).send({ ok: true, data: reg });
            } else if (carrito_cliente.length >= 1) {
                res.status(200).send({ ok: false, message: 'Producto ya existe en el carrito' });
            }



        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } catch (error) {
        res.status(500).send({ ok: false, message: 'Error inesperado' });
    }
}

const obtener_carrito_cliente = async(req, res) => {
    try {
        if (req.user) {
            let id = req.params['id'];

            let carrito_cliente = await Carrito.find({ cliente: id }).populate('producto');
            res.status(200).send({ ok: true, data: carrito_cliente });
        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } catch (error) {
        res.status(500).send({ ok: false, message: 'Error inesperado' });
    }
}

const eliminar_carrito_cliente = async(req, res) => {
    try {
        if (req.user) {
            let id = req.params['id'];

            let reg = await Carrito.findByIdAndRemove({ _id: id });
            res.status(200).send({ ok: true, data: reg });
        } else {
            res.status(403).send({ ok: false, message: 'NoAccess' });
        }
    } catch (error) {
        res.status(501).send({ ok: false, message: 'Error inesperado' });
    }
}

module.exports = {
    agregar_carrito_cliente,
    obtener_carrito_cliente,
    eliminar_carrito_cliente
}