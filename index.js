const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/DistribucionesNacionales', async(err, res) => {
    if (err) { console.error(err); } else { console.log('servidor funciona') }
});
const app = express();
app.set('port', process.env.PORT || 73);
app.use(express.json());
require("dotenv").config();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api/cliente', require('./routes/cliente'));
app.listen(app.get('port'), () => {
    console.log(`puerto ${app.get('port')}`);
});