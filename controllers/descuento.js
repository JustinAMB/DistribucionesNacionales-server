var Descuento = require('../models/descuento');
var fs = require('fs');
var path = require('path');
const registro_descuento_admin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'admin') {
            let data = req.body;

            var img_path = req.files.banner.path;
            var name = img_path.split('\\');
            var banner_name = name[2];

            data.banner = banner_name;
            let reg = await Descuento.create(data);

            res.status(200).send({ ok: true, data: reg });

        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}

const listar_descuentos_admin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'admin') {

            var filtro = req.params['filtro'];

            let reg = await Descuento.find({ titulo: new RegExp(filtro, 'i') }).sort({ createdAt: -1 });
            res.status(200).send({ ok: true, data: reg });

        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}

const obtener_banner_descuento = async(req, res) => {
    var img = req.params['img'];


    fs.stat(
        `./uploads/descuentos/${img}`, (err) => {
            const path_img = !err ? `./uploads/descuentos/${img}` : './uploads/default.jpg';
            res.status(200).send({
                ok: true,
                data: path_img
            });

        })
}

const obtener_descuento_admin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'admin') {

            const id = req.params['id'];

            try {
                const reg = await Descuento.findById({ _id: id });

                res.status(200).send({ ok: true, data: reg });
            } catch (error) {
                res.status(401).send({ ok: false, message: 'Ha ocurrido un error , intentalo de nuevo' });
            }

        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}


const actualizar_descuento_admin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'admin') {
            let id = req.params['id'];
            let data = req.body;

            if (req.files) {
                //SI HAY IMAGEN
                var img_path = req.files.banner.path;
                var name = img_path.split('\\');
                var banner_name = name[2];


                let reg = await Descuento.findByIdAndUpdate({ _id: id }, {
                    titulo: data.titulo,
                    descuento: data.descuento,
                    fecha_inicio: data.fecha_inicio,
                    fecha_fin: data.fecha_fin,
                    banner: banner_name
                });

                fs.stat('./uploads/descuentos/' + reg.banner, function(err) {
                    if (!err) {
                        fs.unlink('./uploads/descuentos/' + reg.banner, (err) => {
                            if (err) throw err;
                        });
                    }
                })

                res.status(200).send({ ok: true, data: reg });
            } else {
                //NO HAY IMAGEN
                let reg = await Descuento.findByIdAndUpdate({ _id: id }, {
                    titulo: data.titulo,
                    descuento: data.descuento,
                    fecha_inicio: data.fecha_inicio,
                    fecha_fin: data.fecha_fin,
                });
                res.status(200).send({ ok: true, data: reg });
            }

        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}

const eliminar_descuento_admin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'admin') {

            var id = req.params['id'];

            let reg = await Descuento.findByIdAndRemove({ _id: id });
            res.status(200).send({ ok: true, data: reg });

        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}

const obtener_descuento_activo = async(req, res) => {
    let descuentos = await Descuento.find().sort({ createdAt: -1 });
    var arr_descuentos = [];
    var today = Date.parse(new Date().toString()) / 1000;

    descuentos.forEach(element => {
        var tt_inicio = Date.parse(element.fecha_inicio + "T00:00:00") / 1000;
        var tt_fin = Date.parse(element.fecha_fin + "T23:59:59") / 1000;

        if (today >= tt_inicio && today <= tt_fin) {
            arr_descuentos.push(element);
        }
    });

    if (arr_descuentos.length >= 1) {
        res.status(200).send({ data: arr_descuentos });
    } else {
        res.status(401).send({ ok: false, message: 'error' });
    }

}

module.exports = {
    registro_descuento_admin,
    listar_descuentos_admin,
    obtener_banner_descuento,
    obtener_descuento_admin,
    actualizar_descuento_admin,
    eliminar_descuento_admin,
    obtener_descuento_activo
}