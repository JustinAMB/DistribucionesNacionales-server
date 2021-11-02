const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'ucr2021if2021';

exports.auth = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'NoHeadersError' });
    }

    const token = req.headers.authorization.replace(/['"]+/g, '');

    const segment = token.split('.');

    if (segment.length != 3) {
        return res.status(403).send({ message: 'InvalidToken' });
    } else {
        try {
            const payload = jwt.decode(token, secret);
            console.log(payload);
            if (payload.exp <= moment().unix()) {
                return res.status(403).send({ ok: false, message: 'TokenExpirado' });
            }

        } catch (error) {
            return res.status(403).send({ ok: false, message: 'InvalidToken' });
        }
    }

    req.user = payload;

    next();

}