const express = require('express');
const cupon = require('../controllers/cupon');

const router = express.Router();
const auth = require('../middlewares/authenticate');

router.post('/registro_cupon_admin', auth.auth, cupon.registro_cupon_admin);
router.get('/listar_cupones_admin/:filtro?', auth.auth, cupon.listar_cupones_admin);
router.get('/obtener_cupon_admin/:id', auth.auth, cupon.obtener_cupon_admin);
router.put('/actualizar_cupon_admin/:id', auth.auth, cupon.actualizar_cupon_admin);
router.delete('/eliminar_cupon_admin/:id', auth.auth, cupon.eliminar_cupon_admin);
router.get('/validar_cupon_admin/:cupon', auth.auth, cupon.validar_cupon_admin);

module.exports = router;