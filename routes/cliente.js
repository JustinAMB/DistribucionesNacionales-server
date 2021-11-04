const express = require('express');
const cliente = require('../controllers/cliente');

const router = express.Router();
const auth = require('../middlewares/authenticate');

router.post('/registro_cliente', cliente.registro_cliente);
router.get('/obtener_direccion_principal_cliente/:id', auth.auth, cliente.obtener_direccion_principal_cliente);
router.post('/login_cliente', cliente.login_cliente);

router.get('/listar_clientes_filtro_admin/:tipo/:filtro', auth.auth, cliente.listar_clientes_filtro_admin);
router.post('/registro_cliente_admin', auth.auth, cliente.registro_cliente_admin);
router.get('/obtener_cliente_admin/:id', auth.auth, cliente.obtener_cliente_admin);
router.put('/actulizar_cliente_admin/:id', auth.auth, cliente.actulizar_cliente_admin);
router.delete('/eliminar_cliente_admin/:id', auth.auth, cliente.eliminar_cliente_admin);
router.get('/obtener_cliente_guest/:id', auth.auth, cliente.obtener_cliente_guest);
router.put('/actualizar_perfil_cliente_guest/:id', auth.auth, cliente.actualizar_perfil_cliente_guest);


///DIRECCION
router.post('/registro_direccion_cliente', auth.auth, cliente.registro_direccion_cliente);
router.get('/obtener_direccion_todos_cliente/:id', auth.auth, cliente.obtener_direccion_todos_cliente);
router.put('/cambiar_direccion_principal_cliente/:id/:cliente', auth.auth, cliente.cambiar_direccion_principal_cliente);

//CONTACTO
router.post('/enviar_mensaje_contacto', cliente.enviar_mensaje_contacto);

//ORDENES
router.get('/obtener_ordenes_cliente/:id', auth.auth, cliente.obtener_ordenes_cliente);
router.get('/obtener_detalles_ordenes_cliente/:id', auth.auth, cliente.obtener_detalles_ordenes_cliente);

//REVIEWS
router.post('/emitir_review_producto_cliente', auth.auth, cliente.emitir_review_producto_cliente);
router.get('/obtener_review_producto_cliente/:id', cliente.obtener_review_producto_cliente);
router.get('/obtener_reviews_cliente/:id', auth.auth, cliente.obtener_reviews_cliente);

module.exports = router;