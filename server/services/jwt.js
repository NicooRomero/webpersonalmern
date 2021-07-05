const jwt = require('jwt-simple');
const moment = require('moment');

const SECRET_KEY = "nmugve3t5dypt84ikflrwgxpt";

exports.accessToken = function(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
        createToken: moment().unix(),
        exp: moment().add(3, 'hours').unix()
    };

    return jwt.encode(payload, SECRET_KEY);
};

exports.refreshToken = function(user) {
    const payload = {
        id: user._id,
        exp: moment().add(1, 'days').unix()
    };

    return jwt.encode(payload, SECRET_KEY);
}

exports.decodeToken = function(token) {
    return jwt.decode(token, SECRET_KEY, true);
}