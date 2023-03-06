const validacionCampos = require('./validacion-campos')
const validacionJWT = require('./validacion-jwt')
const validacionAdmin = require('./validacion-rol')
const fileValidator = require('./file-validator')

module.exports = {
    ...validacionCampos,
    ...validacionJWT,
    ...validacionAdmin,
    ...fileValidator
}
