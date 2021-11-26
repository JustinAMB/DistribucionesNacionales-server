const express = require('express');
const venta = require('../controllers/venta');

const router = express.Router();
const auth = require('../middlewares/authenticate');

router.post('/registro_compra_cliente', auth.auth, venta.registro_compra_cliente);


module.exports = router;