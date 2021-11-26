const envio = require('../models/envio');


const update = async(req, res) => {
    try {
        const id = req.params['id'];

        const data = req.body.envio;
        const index = data.index;
        data.etapas[index].ok = true;
        data.etapas[index].mostar = false;
        if (index < 5) {
            data.etapas[index + 1].mostar = true;
        }
        const etapa = data.etapas[index];

        await Envio.findByIdAndUpdate(id, req.body);
        const envio = await Envio.findById(id);
        res.status(200).json({
            ok: true,
            data: envio,
            message: 'Envio actualizado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al actualizar el envio'
        })

    }

}
module.exports = { update }