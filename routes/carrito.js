const express = require('express');
const carrito = require('../controllers/carrito');

const router = express.Router();
const auth = require('../middlewares/authenticate');

router.post('/agregar_carrito_cliente', auth.auth, carrito.agregar_carrito_cliente);
router.get('/obtener_carrito_cliente/:id', auth.auth, carrito.obtener_carrito_cliente);
router.delete('/eliminar_carrito_cliente/:id', auth.auth, carrito.eliminar_carrito_cliente);

module.exports = router;