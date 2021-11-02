const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
mongoose.connect('mongodb://127.0.0.1:27017/DistribucionesNacionales', async(err, res) => {
    if (err) { console.error(err); } else { console.log('servidor funciona') }
});
const app = express();
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//console.log(path.join(__dirname, 'uploads'));
//app.use('/uploads', express.static(__dirname + '\\uploads'));
//app.use(express.static('public'));

app.use('/uploads', express.static(path.resolve('uploads')));
console.log(__dirname);
app.set('port', process.env.PORT || 73);
app.use(express.json());
require("dotenv").config();
app.use(cors());
app.use(morgan('tiny'));

app.use('/api/cliente', require('./routes/cliente'));
app.use('/api/producto', require('./routes/producto'));
app.use('/api/cupon', require('./routes/cupon'));
app.use('/api/descuento', require('./routes/descuento'));
app.use('/api/config', require('./routes/config'));
app.use('/api/admin', require('./routes/admin'));
app.listen(app.get('port'), () => {
    console.log(`puerto ${app.get('port')}`);
});