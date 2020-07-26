let { decode } = require('./../commons/checkuser');
let JWTauthen = async (req, res, next) => {
    let jwt = req.headers['Authorization'] || req.headers['authorization'];
    if (!jwt) return next();
    let payload = decode(jwt)
    res.user = payload.data._jar.cookies[0].value
    next();
};
module.exports = {
    JWTauthen
}
