const Venta = require('../models/venta');
const Dventa = require('../models/dventa');
const Producto = require('../models/producto');
const enviaCorreo = require('../helpers/enviarCorreo');
const Envio = require('../models/envio');

const fs = require('fs');
const handlebars = require('handlebars');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const path = require('path');



const registro_compra_cliente = async(req, res) => {

    if (req.user) {
        console.log(req.body);

        const data = req.body;
        const detalles = data.detalles;
        console.log(data);
        const venta_last = await Venta.find().sort({ createdAt: -1 });
        let serie;
        let correlativo;
        let n_venta;

        if (venta_last.length == 0) {
            serie = '001';
            correlativo = '000001';

            n_venta = serie + '-' + correlativo;
        } else {
            // >= 1 registro en venta
            var last_nventa = venta_last[0].nventa;
            var arr_nventa = last_nventa.split('-');

            if (arr_nventa[1] != '999999') {
                var new_correlativo = zfill(parseInt(arr_nventa[1]) + 1, 6);
                n_venta = arr_nventa[0] + '-' + new_correlativo;
            } else if (arr_nventa[1] == '999999') {
                var new_serie = zfill(parseInt(arr_nventa[0]) + 1, 3);
                n_venta = new_serie + '-000001';
            }
        }

        data.nventa = n_venta;
        data.estado = 'Procesando';

        let subtotal = 0;

        detalles.forEach(async(detalle) => {
            subtotal += detalle.subtotal;
        });
        data.subtotal = subtotal;
        let venta = await Venta.create(data);
        const envioInit = {
            venta: venta.id,
            etapas: [

                {
                    etapa: 'Compra registrada',
                    ok: false,
                    mostrar: true
                },
                {
                    etapa: 'Preparando envió',
                    ok: false,
                    mostrar: false
                },
                {
                    etapa: 'Recibido por el transportista',
                    ok: false,
                    mostrar: false
                },
                {
                    etapa: 'SSalida de la bodega del transportista',
                    ok: false,
                    mostrar: false
                },
                {
                    etapa: 'Llegada a la sucursal de destino',
                    ok: false,
                    mostrar: false
                },
                {
                    etapa: 'Entregado',
                    ok: false,
                    mostrar: false
                }
            ]

        }
        await Envio.create(envioInit);

        detalles.forEach(async element => {
            element.venta = venta._id;
            await Dventa.create(element);

            let element_producto = await Producto.findById({ _id: element.producto });
            let new_stock = element_producto.stock - element.cantidad;

            await Producto.findByIdAndUpdate({ _id: element.producto }, {
                stock: new_stock
            });
            /*
                        //limpiar carrito
                        await Carrito.remove({ cliente: data.cliente });*/
        });
        await enviaCorreo.enviar_correo_compra_cliente(venta._id);
        res.status(200).send({ ok: true, data: venta });
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}

const zfill = (number, width) => {
    var numberOutput = Math.abs(number);
    var length = number.toString().length;
    var zero = "0";

    if (width <= length) {
        if (number < 0) {
            return ("-" + numberOutput.toString());
        } else {
            return numberOutput.toString();
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString());
        }

    }
}



module.exports = {
    registro_compra_cliente
}