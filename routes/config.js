const express = require('express');
const config = require('../controllers/config');

const router = express.Router();
const auth = require('../middlewares/authenticate');
const multiparty = require('connect-multiparty');
const path = multiparty({ uploadDir: './uploads/configuraciones' });

router.put('/actualiza_config_admin/:id', [auth.auth, path], config.actualiza_config_admin);
router.get('/obtener_config_admin', auth.auth, config.obtener_config_admin);

router.get('/obtener_config_publico', config.obtener_config_publico);


module.exports = router;