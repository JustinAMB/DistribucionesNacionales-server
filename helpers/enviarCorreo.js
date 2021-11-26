 //Requerimos el paquete
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
 const correo = () => {
     //Creamos el objeto de transporte
     var transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
             user: 'tiendaakahai@gmail.com',
             pass: 'Zxcv1234$'
         }
     });

     var mensaje = "Hola...";

     var mailOptions = {
         from: 'tiendaakahai@gmail.com',
         to: 'zaidajim1123@gmail.com ',
         subject: 'Asunto Del Correo',
         text: mensaje
     };

     transporter.sendMail(mailOptions, function(error, info) {
         if (error) {
             console.log(error);
         } else {
             console.log('Email enviado: ' + info.response);
         }
     });

 }

 const enviar_correo_compra_cliente = async(id) => {



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
     console.log(venta.cliente);

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
             from: 'tiendaakahai@gmail.com',
             to: venta.cliente.email,
             subject: 'Gracias por tu compra, Mi Tienda',
             html: htmlToSend
         };

         transporter.sendMail(mailOptions, function(error, info) {
             if (!error) {
                 console.log('Email sent: ' + info.response);
             }
         });



     });

 }


 const etapasEnvio = [
     'Se ha registrado la compra de su pedido , muchas gracias.',
     'Se esta preparando su pedido para ser enviado al transportista para su posterior envio.',
     'El pedido ha sido enviado al transportista, se le notificara cuando el pedido salga de la bodega del tanasportista.',
     'El pedido ha salido de la bodega del transportitas , y se encuentra en en camino a sucursal de su localidad ,se le notificara cuando el pedido llegue a la sucursal.',
     'Su pedido se encuentra en la sucursal de su localidad por si gusta pasar a recogerlo o espera que se lo entreguen',
     'El pedido ha sido entregado, muchas gracias por su compra',

 ]
 const enviarCorreoEtapa = async(index, id) => {



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

     console.log(venta.cliente);

     var cliente = venta.cliente.nombres + ' ' + venta.cliente.apellidos;
     var _id = venta._id;
     var fecha = new Date(venta.createdAt);

     var subtotal = venta.subtotal;
     var precio_envio = venta.envio_precio;

     readHTMLFile(process.cwd() + '/etapa.html', (err, html) => {

         let rest_html = ejs.render(html, { descripcion: etapasEnvio[index], cliente: cliente, _id: _id, fecha: fecha, subtotal: subtotal, precio_envio: precio_envio });

         var template = handlebars.compile(rest_html);
         var htmlToSend = template({ op: true });

         var mailOptions = {
             from: 'tiendaakahai@gmail.com',
             to: venta.cliente.email,
             subject: 'Actulizacion del pedido',
             html: htmlToSend
         };

         transporter.sendMail(mailOptions, function(error, info) {
             if (!error) {
                 console.log('Email sent: ' + info.response);
             }
         });



     });

 }
 module.exports = { correo, enviar_correo_compra_cliente, enviarCorreoEtapa };