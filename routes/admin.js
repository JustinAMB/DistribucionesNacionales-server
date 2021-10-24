const express = require('express');
const adminController = require('../controllers/admin');
const auth = require('../middlewares/authenticate');
const router = express.Router();

router.post('/registro_admin', adminController.registro_admin);
router.post('/login_admin', adminController.login_admin);

router.get('/obtener_mensajes_admin', auth.auth, adminController.obtener_mensajes_admin);
router.put('/cerrar_mensaje_admin/:id', auth.auth, adminController.cerrar_mensaje_admin);

router.get('/obtener_ventas_admin/:desde?/:hasta?', auth.auth, adminController.obtener_ventas_admin);
router.get('/kpi_ganancias_mensuales_admin', auth.auth, adminController.kpi_ganancias_mensuales_admin);

module.exports = router;