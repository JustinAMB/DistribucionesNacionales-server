const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/DistribucionesNacionales', async(err, res) => {
    if (err) { console.error(err); } else { console.log('servidor funciona') }
});
const app = express();
const port = process.env.PORT || 73;
app.listen(port, () => {
    console.log(`puerto ${port}`);
});