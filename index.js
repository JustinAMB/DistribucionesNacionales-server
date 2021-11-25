//inicializacion de el servidor 
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const correo = require('./helpers/enviarCorreo');
const app = express();
// conexion a bae de datos
mongoose.connect('mongodb://127.0.0.1:27017/DistribucionesNacionales', async(err, res) => {
    if (err) { console.error(err); } else { console.log('servidor funciona') }
});

//configuraciones
app.use('/uploads', express.static(path.resolve('uploads')));
console.log(__dirname);
app.set('port', process.env.PORT || 73);
app.use(express.json());
require("dotenv").config({ path: '.env' });
app.use(cors());
app.use(morgan('tiny'));

/*socket*/
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: { origin: '*' }
});


io.on('connection', (socket) => {
    socket.on('delete-carrito', (data) => {
        io.emit('new-carrito', data);
        console.log(data);
    });


    socket.on('add-carrito-add', (data) => {
        io.emit('new-carrito-add', data);
        console.log(data);
    });

});
//rutas
app.use('/api/Cliente', require('./routes/cliente'));
app.use('/api/Producto', require('./routes/producto'));
app.use('/api/Cupon', require('./routes/cupon'));
app.use('/api/Descuento', require('./routes/descuento'));
app.use('/api/Config', require('./routes/config'));
app.use('/api/Admin', require('./routes/admin'));
app.use('/api/Venta', require('./routes/venta'));
app.use('/api/Carrito', require('./routes/carrito'));
//servidor escuchando


app.listen(app.get('port'), () => {
    console.log(`puerto ${app.get('port')}      `);
});