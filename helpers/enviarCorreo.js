 //Requerimos el paquete
 var nodemailer = require('nodemailer');
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
 module.exports = correo;