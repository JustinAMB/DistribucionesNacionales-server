const Venta = require('../models/venta');
const Dventa = require('../models/dventa');
const Producto = require('../models/producto');

const Carrito = require('../models/carrito');

const fs = require('fs');
const handlebars = require('handlebars');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const path = require('path');



const registro_compra_cliente = async(req, res) => {
    if (req.user) {

        const data = req.body;
        const detalles = data.detalles;

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

        console.log(data);

        let venta = await Venta.create(data);

        detalles.forEach(async element => {
            element.venta = venta._id;
            await Dventa.create(element);

            let element_producto = await Producto.findById({ _id: element.producto });
            let new_stock = element_producto.stock - element.cantidad;

            await Producto.findByIdAndUpdate({ _id: element.producto }, {
                stock: new_stock
            });

            //limpiar carrito
            await Carrito.remove({ cliente: data.cliente });
        });

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

const enviar_correo_compra_cliente = async(req, res) => {

    var id = req.params['id'];

    var readHTMLFile = function(path, callback) {
        fs.readFile(path, { encoding: 'utf-8' }, function(err, html) {
            if (err) {
                throw err;
                callback(err);
            } else {
                callback(null, html);
            }
        });
    };

    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'tiendaakahai@gmail.com',
            pass: 'Zxcv1234$'
        }
    }));

    //cliente _id fecha data subtotal

    var venta = await Venta.findById({ _id: id }).populate('cliente');
    var detalles = await Dventa.find({ venta: id }).populate('producto');

    var cliente = venta.cliente.nombres + ' ' + venta.cliente.apellidos;
    var _id = venta._id;
    var fecha = new Date(venta.createdAt);
    var data = detalles;
    var subtotal = venta.subtotal;
    var precio_envio = venta.envio_precio;

    readHTMLFile(process.cwd() + '/mail.html', (err, html) => {

        let rest_html = ejs.render(html, { data: data, cliente: cliente, _id: _id, fecha: fecha, subtotal: subtotal, precio_envio: precio_envio });

        var template = handlebars.compile(rest_html);
        var htmlToSend = template({ op: true });

        var mailOptions = {
            from: 'diegoalonssoac@gmail.com',
            to: venta.cliente.email,
            subject: 'Gracias por tu compra, Mi Tienda',
            html: htmlToSend
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (!error) {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).send({ ok: true, message: 'se ha enviado la informacion de la compra a su correo!' });

    });
}

module.exports = {
    registro_compra_cliente,
    enviar_correo_compra_cliente
}