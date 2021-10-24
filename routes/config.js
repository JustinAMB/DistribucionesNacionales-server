const express = require('express');
const configController = require('../controllers/configController');

const router = express.Router();
const auth = require('../middlewares/authenticate');
const multiparty = require('connect-multiparty');
const path = multiparty({ uploadDir: './uploads/configuraciones' });

router.put('/actualiza_config_admin/:id', [auth.auth, path], configController.actualiza_config_admin);
router.get('/obtener_config_admin', auth.auth, configController.obtener_config_admin);
router.get('/obtener_logo/:img', configController.obtener_logo);
router.get('/obtener_config_publico', configController.obtener_config_publico);


module.exports = router;