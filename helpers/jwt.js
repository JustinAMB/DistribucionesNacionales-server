'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'diegoararca';

exports.createToken = (user) => {
    const payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role: user.rol,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
    }

    return jwt.encode(payload, secret);
}