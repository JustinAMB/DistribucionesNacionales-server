const express = require('express');
const envio = require('../controllers/envio');

const router = express.Router();
const auth = require('../middlewares/authenticate');


router.put('/actualizar_envio/:id', auth.auth, envio.update);

router.get('/obtener_envios', auth.auth, envio.getEnvios);
router.get('/obtener_envio/:id', auth.auth, envio.getEnvio);


module.exports = router;