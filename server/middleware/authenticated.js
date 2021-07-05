const jwt = require('jwt-simple');
const moment = require('moment');

const SECRET_KEY = "nmugve3t5dypt84ikflrwgxpt";

exports.ensureAuth = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(403).send({ message: 'La petición no esta autenticada.' });
    }

    const token = req.headers.authorization.replace(/['"]+/g,"");

    try {
        var payload = jwt.decode(token, SECRET_KEY);
        if(payload.exp <= moment.unix()) {
            return res.status(404).send({ message: 'El token a expirado.' });
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send({ message: 'El token es inválido.' });
    }

    res.user = payload;
    next();
}