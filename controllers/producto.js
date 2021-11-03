const Producto = require('../models/producto');
const Inventario = require('../models/inventario');
const Review = require('../models/review');
const fs = require('fs');
const path = require('path');

const registro_producto_admin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'admin') {
            let data = req.body;

            var img_path = req.files.portada.path;
            var name = img_path.split('\\');


            data.slug = data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            data.portada = `${process.env.URL_SERVER}uploads/productos/${name[2]}`;
            let reg = await Producto.create(data);

            let inventario = await Inventario.create({
                admin: req.user.sub,
                cantidad: data.stock,
                proveedor: 'Primer registro',
                producto: reg._id
            });

            res.status(200).send({
                ok: true,
                data: { reg, inventario }

            });

        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}

const listar_productos_admin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'admin') {

            var filtro = req.params['filtro'];

            let reg = await Producto.find({ titulo: new RegExp(filtro, 'i') });
            res.status(200).send({ ok: true, data: reg });

        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}



const obtener_producto_admin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'admin') {



            try {
                const id = req.params['id'];
                const reg = await Producto.findById({ _id: id });

                res.status(200).send({ ok: true, data: reg });
            } catch (error) {
                res.status(401).send({ ok: false, message: 'Ha ocurrido erroor, intentalo de nuevo!' });
            }

        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}

const actualizar_producto_admin = async function(req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            try {
                let id = req.params['id'];
                let data = req.body;

                if (req.files) {
                    //SI HAY IMAGEN

                    const img_path = req.files.portada.path;
                    const name = img_path.split('\\');



                    const reg = await Producto.findByIdAndUpdate({ _id: id }, {
                        titulo: data.titulo,
                        stock: data.stock,
                        precio: data.precio,
                        categoria: data.categoria,
                        descripcion: data.descripcion,
                        contenido: data.contenido,
                        portada: `${process.env.URL_SERVER}/uploads/productos/${name[2]}`
                    });

                    fs.stat(`${process.env.URL_SERVER}/uploads/productos/${reg.portada}`, (err) => {
                        if (!err) {
                            fs.unlink(`${process.env.URL_SERVER}/uploads/productos/${reg.portada}`, (err) => {
                                if (err) throw err;
                            });
                        }
                    })

                    res.status(200).send({ ok: true, data: reg });
                } else {
                    //NO HAY IMAGEN
                    let reg = await Producto.findByIdAndUpdate({ _id: id }, {
                        titulo: data.titulo,
                        stock: data.stock,
                        precio: data.precio,
                        categoria: data.categoria,
                        descripcion: data.descripcion,
                        contenido: data.contenido,
                    });
                    res.status(200).send({ ok: true, data: reg });
                }
            } catch (err) {
                res.status(401).send({ ok: false, message: 'Ha ocurrido un error , intentalo de nuevo! ' });
            }


        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}

const eliminar_producto_admin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'admin') {
            try {
                const id = req.params['id'];

                const reg = await Producto.findByIdAndRemove({ _id: id });
                res.status(200).send({ ok: true, data: reg });
            } catch (err) {
                res.status(401).send({ ok: false, message: 'Ha ocurrido un error , intentalo de nuevo! ' });
            }


        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}

const listar_inventario_producto_admin = async function(req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            try {
                const id = req.params['id'];

                const reg = await Inventario.find({ producto: id }).populate('admin').sort({ createdAt: -1 });
                res.status(200).send({ ok: true, data: reg });
            } catch (err) {
                res.status(401).send({ ok: false, message: 'Ha ocurrido un error , intentalo de nuevo! ' });
            }


        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}

const eliminar_inventario_producto_admin = async function(req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            try { //OBTENER ID DEL INVENTARIO
                var id = req.params['id'];

                //ELIMINAR INVENTARIO
                let reg = await Inventario.findByIdAndRemove({ _id: id });

                //OBTENER EL REGISTRO DE PRODUCTO
                let prod = await Producto.findById({ _id: reg.producto });

                //CALCULAR EL NUEVO STOCK
                let nuevo_stock = parseInt(prod.stock) - parseInt(reg.cantidad);

                //ACTUALICACION DEL NUEVO STOCK AL PRODUCTO
                let producto = await Producto.findByIdAndUpdate({ _id: reg.producto }, {
                    stock: nuevo_stock
                })

                res.status(200).send({ ok: true, data: producto });
            } catch (err) {
                res.status(401).send({ ok: false, message: 'Ha ocurrido un error , intentalo de nuevo! ' });
            }

        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}

const registro_inventario_producto_admin = async function(req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            try {
                let data = req.body;

                let reg = await Inventario.create(data);

                //OBTENER EL REGISTRO DE PRODUCTO
                let prod = await Producto.findById({ _id: reg.producto });

                //CALCULAR EL NUEVO STOCK
                //STOCK ACTUAL         //STOCK A AUMENTAR
                let nuevo_stock = parseInt(prod.stock) + parseInt(reg.cantidad);

                //ACTUALICACION DEL NUEVO STOCK AL PRODUCTO
                let producto = await Producto.findByIdAndUpdate({ _id: reg.producto }, {
                    stock: nuevo_stock
                })

                res.status(200).send({ ok: true, data: reg });
            } catch (err) {
                res.status(401).send({ ok: false, message: 'Ha ocurrido un error , intentalo de nuevo! ' });
            }


        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}

const actualizar_producto_variedades_admin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'admin') {
            try {
                const id = req.params['id'];
                const data = req.body;

                const reg = await Producto.findByIdAndUpdate({ _id: id }, {
                    titulo_variedad: data.titulo_variedad,
                    variedades: data.variedades
                });
                res.status(200).send({ ok: true, data: reg });
            } catch (err) {
                res.status(401).send({ ok: false, message: 'Ha ocurrido un error , intentalo de nuevo! ' });
            }


        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}


const agregar_imagen_galeria_admin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'admin') {
            try {
                const id = req.params['id'];
                const data = req.body;

                const img_path = req.files.imagen.path;
                const name = img_path.split('\\');
                const imagen_name = `${process.env.URL_SERVER}/uploads/productos/${name[2]}`;

                const reg = await Producto.findByIdAndUpdate({ _id: id }, {
                    $push: {
                        galeria: {
                            imagen: imagen_name,
                            _id: data._id
                        }
                    }
                });

                res.status(200).send({ ok: true, data: reg });
            } catch (err) {
                res.status(401).send({ ok: false, message: 'Ha ocurrido un error , intentalo de nuevo! ' });
            }


        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}


const eliminar_imagen_galeria_admin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'admin') {
            try {
                const id = req.params['id'];
                const data = req.body;


                const reg = await Producto.findByIdAndUpdate({ _id: id }, { $pull: { galeria: { _id: data._id } } });
                res.status(200).send({ ok: true, data: reg });
            } catch (err) {
                res.status(401).send({ ok: false, message: 'Ha ocurrido un error , intentalo de nuevo! ' });
            }


        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}



//---METODOS PUBLICOS----------------------------------------------------

const listar_productos_publico = async(req, res) => {
    try {
        const filtro = req.params['filtro'];
        const reg = await Producto.find({ titulo: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
        res.status(200).send({ ok: true, data: reg });
    } catch (err) {
        res.status(401).send({ ok: false, message: 'Ha ocurrido un error , intentalo de nuevo! ' });
    }

}

const obtener_productos_slug_publico = async function(req, res) {
    try {
        const slug = req.params['slug'];

        const reg = await Producto.findOne({ slug: slug });
        res.status(200).send({ ok: true, data: reg });
    } catch (err) {
        res.status(401).send({ ok: false, message: 'Ha ocurrido un error , intentalo de nuevo! ' });
    }

}

const listar_productos_recomendados_publico = async(req, res) => {


    try {
        const categoria = req.params['categoria'];
        const reg = await Producto.find({ categoria: categoria }).sort({ createdAt: -1 }).limit(8);
        res.status(200).send({ ok: true, data: reg });
    } catch (err) {
        res.status(401).send({ ok: false, message: 'Ha ocurrido un error , intentalo de nuevo! ' });
    }

}

const listar_productos_nuevos_publico = async function(req, res) {
    try {
        let reg = await Producto.find().sort({ createdAt: -1 }).limit(8);
        res.status(200).send({ ok: true, data: reg });
    } catch (err) {
        res.status(401).send({ ok: false, message: 'Ha ocurrido un error , intentalo de nuevo! ' });
    }

}

const listar_productos_masvendidos_publico = async function(req, res) {
    try {
        let reg = await Producto.find().sort({ nventas: -1 }).limit(8);
        res.status(200).send({ ok: true, data: reg });
    } catch (err) {
        res.status(401).send({ ok: false, message: 'Ha ocurrido un error , intentalo de nuevo! ' });
    }


}

const obtener_reviews_producto_publico = async function(req, res) {


    try {
        let id = req.params['id'];

        let reviews = await Review.find({ producto: id }).populate('cliente').sort({ createdAt: -1 });
        res.status(200).send({ ok: true, data: reviews });
    } catch (err) {
        res.status(401).send({ ok: false, message: 'Ha ocurrido un error , intentalo de nuevo! ' });
    }

}

module.exports = {
    registro_producto_admin,
    listar_productos_admin,

    obtener_producto_admin,
    actualizar_producto_admin,
    eliminar_producto_admin,
    listar_inventario_producto_admin,
    eliminar_inventario_producto_admin,
    registro_inventario_producto_admin,
    listar_productos_publico,
    actualizar_producto_variedades_admin,
    agregar_imagen_galeria_admin,
    eliminar_imagen_galeria_admin,
    obtener_productos_slug_publico,
    listar_productos_recomendados_publico,
    listar_productos_nuevos_publico,
    listar_productos_masvendidos_publico,
    obtener_reviews_producto_publico
}