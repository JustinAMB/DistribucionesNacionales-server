const express = require('express');
const envio = require('../controllers/envio');

const router = express.Router();
const auth = require('../middlewares/authenticate');


router.put('/actualizar_envio/:id', auth.auth, envio.update);


module.exports = router;