const express = require('express');
const clienteController = require('../controllers/cliente');

const router = express.Router();
const auth = require('../middlewares/authenticate');

router.post('/registro_cliente', clienteController.registro_cliente);
router.get('/obtener_direccion_principal_cliente/:id', auth.auth, clienteController.obtener_direccion_principal_cliente);
router.post('/login_cliente', clienteController.login_cliente);

router.get('/listar_clientes_filtro_admin/:tipo/:filtro', auth.auth, clienteController.listar_clientes_filtro_admin);
router.post('/registro_cliente_admin', auth.auth, clienteController.registro_cliente_admin);
router.get('/obtener_cliente_admin/:id', auth.auth, clienteController.obtener_cliente_admin);
router.put('/actulizar_cliente_admin/:id', auth.auth, clienteController.actulizar_cliente_admin);
router.delete('/eliminar_cliente_admin/:id', auth.auth, clienteController.eliminar_cliente_admin);
router.get('/obtener_cliente_guest/:id', auth.auth, clienteController.obtener_cliente_guest);
router.put('/actualizar_perfil_cliente_guest/:id', auth.auth, clienteController.actualizar_perfil_cliente_guest);


///DIRECCION
router.post('/registro_direccion_cliente', auth.auth, clienteController.registro_direccion_cliente);
router.get('/obtener_direccion_todos_cliente/:id', auth.auth, clienteController.obtener_direccion_todos_cliente);
router.put('/cambiar_direccion_principal_cliente/:id/:cliente', auth.auth, clienteController.cambiar_direccion_principal_cliente);

//CONTACTO
router.post('/enviar_mensaje_contacto', clienteController.enviar_mensaje_contacto);

//ORDENES
router.get('/obtener_ordenes_cliente/:id', auth.auth, clienteController.obtener_ordenes_cliente);
router.get('/obtener_detalles_ordenes_cliente/:id', auth.auth, clienteController.obtener_detalles_ordenes_cliente);

//REVIEWS
router.post('/emitir_review_producto_cliente', auth.auth, clienteController.emitir_review_producto_cliente);
router.get('/obtener_review_producto_cliente/:id', clienteController.obtener_review_producto_cliente);
router.get('/obtener_reviews_cliente/:id', auth.auth, clienteController.obtener_reviews_cliente);

module.exports = router;