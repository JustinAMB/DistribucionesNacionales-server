const express = require('express');
const admin = require('../controllers/admin');
const auth = require('../middlewares/authenticate');
const router = express.Router();

router.post('/registro_admin', admin.registro_admin);
router.post('/login', admin.login_admin);

router.get('/obtener_mensajes_admin', auth.auth, admin.obtener_mensajes_admin);
router.put('/cerrar_mensaje_admin/:id', auth.auth, admin.cerrar_mensaje_admin);

router.get('/obtener_ventas_admin/:desde?/:hasta?', auth.auth, admin.obtener_ventas_admin);
router.get('/kpi_ganancias_mensuales_admin', auth.auth, admin.kpi_ganancias_mensuales_admin);

module.exports = router;