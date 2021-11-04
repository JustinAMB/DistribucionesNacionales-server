const express = require('express');
const descuento = require('../controllers/descuento');

const router = express.Router();
const auth = require('../middlewares/authenticate');
const multiparty = require('connect-multiparty');
const path = multiparty({ uploadDir: './uploads/descuentos' });

router.post('/registro_descuento_admin', [auth.auth, path], descuento.registro_descuento_admin);
router.get('/listar_descuentos_admin/:filtro?', auth.auth, descuento.listar_descuentos_admin);

router.get('/obtener_descuento_admin/:id', auth.auth, descuento.obtener_descuento_admin);
router.put('/actualizar_descuento_admin/:id', [auth.auth, path], descuento.actualizar_descuento_admin);
router.delete('/eliminar_descuento_admin/:id', auth.auth, descuento.eliminar_descuento_admin);

router.get('/obtener_descuento_activo', descuento.obtener_descuento_activo);

module.exports = router;