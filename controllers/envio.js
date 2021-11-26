const Envio = require('../models/envio');


const update = async(req, res) => {
    try {
        const id = req.params['id'];

        const data = req.body.envio;

        const index = req.body.index;
        data.etapas[index].ok = true;
        data.etapas[index].mostrar = false;
        if (index < 5) {
            data.etapas[index + 1].mostrar = true;
        }
        const etapa = data.etapas[index];

        await Envio.findByIdAndUpdate(id, data);
        const envio = await Envio.findById(id);
        res.status(200).json({
            ok: true,
            data: envio,
            message: 'Envio actualizado'
        })
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error al actualizar el envio'
        })

    }

}
const getEnvio = async(req, res) => {
    try {
        const id = req.params['id'];


        const envio = await Envio.findById(id);
        res.status(200).json({
            ok: true,
            data: envio

        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            message: 'Error al actualizar el envio'
        })

    }

}
const getEnvios = async(req, res) => {
    try {



        const envio = await Envio.find();
        const resultados = envio.filter(envio => envio.etapas[5].ok == false);
        res.status(200).json({
            ok: true,
            data: resultados

        })
    } catch (error) {
        res.status(500).json({
            ok: false,

            message: 'Error al actualizar el envio'
        })

    }

}
module.exports = { getEnvios, getEnvio, update }