const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');


mongoose.connect('mongodb://127.0.0.1:27017/DistribucionesNacionales', async(err, res) => {
    if (err) { console.error(err); } else { console.log('servidor funciona') }
});
const app = express();

/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
}); */
app.use('/uploads', express.static(path.resolve('uploads')));
console.log(__dirname);
app.set('port', process.env.PORT || 73);
app.use(express.json());
require("dotenv").config({ path: '.env' });
app.use(cors());
app.use(morgan('tiny'));

app.use('/api/Cliente', require('./routes/cliente'));
app.use('/api/Producto', require('./routes/producto'));
app.use('/api/Cupon', require('./routes/cupon'));
app.use('/api/Descuento', require('./routes/descuento'));
app.use('/api/Config', require('./routes/config'));
app.use('/api/Admin', require('./routes/admin'));
app.use('/api/Venta', require('./routes/venta'));
app.use('/api/Carrito', require('./routes/carrito'));
app.listen(app.get('port'), () => {
    console.log(`puerto ${app.get('port')}      `);
});