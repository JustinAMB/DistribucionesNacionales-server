const express = require('express');
const cliente = require('../controllers/cliente');
const router = express.Router();
router.post('/registro', cliente.registroCliente);
module.exports = router;