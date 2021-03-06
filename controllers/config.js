const Config = require('../models/config');
const fs = require('fs');
const path = require('path');

const obtener_config_admin = async(req, res) => {

    if (req.user) {
        if (req.user.role == 'admin') {

            let reg = await Config.findById({ _id: "617514202dec1c3a8c91e710" });

            res.status(200).send({ ok: true, data: reg });

        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}

const actualiza_config_admin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'admin') {

            const data = req.body;

            if (req.files) {
                console.log('Si hay img');
                const img_path = req.files.logo.path;
                const name = img_path.split('\\');





                let reg = await Config.findByIdAndUpdate({ _id: "617514202dec1c3a8c91e710" }, {
                    categorias: JSON.parse(data.categorias),
                    titulo: data.titulo,
                    serie: data.serie,
                    logo: `${process.env.URL_SERVER}uploads/configuraciones/${name[2]}`,
                    correlativo: data.correlativo,
                });

                fs.stat('./uploads/configuraciones/' + reg.logo, function(err) {
                    if (!err) {
                        fs.unlink('./uploads/configuraciones/' + reg.logo, (err) => {
                            if (err) throw err;
                        });
                    }
                })
                res.status(200).send({ ok: true, data: reg });
            } else {
                console.log('No hay img');
                let reg = await Config.findByIdAndUpdate({ _id: "60aac901eadf8212e476d2da" }, {
                    categorias: data.categorias,
                    titulo: data.titulo,
                    serie: data.serie,
                    correlativo: data.correlativo,
                });
                res.status(200).send({ ok: false, data: reg });
            }



        } else {
            res.status(500).send({ ok: false, message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ ok: false, message: 'NoAccess' });
    }
}



const obtener_config_publico = async(req, res) => {
    try {
        const reg = await Config.findById({ _id: "617514202dec1c3a8c91e710" });
        res.status(200).send({ ok: true, data: reg });
    } catch (err) {
        res.status(501).send({ ok: false, message: 'no se han encontrado las configuraciones' });
    }

}

module.exports = {
    actualiza_config_admin,
    obtener_config_admin,

    obtener_config_publico
}