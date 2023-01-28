const dbValidators = require('./dbValidators')
const generarJWT = require('./generar-jwt')
const googleVerify = require('./google-verify')
const subirArchivo = require('./file-upload')

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}