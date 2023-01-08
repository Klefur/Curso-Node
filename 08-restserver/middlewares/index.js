const validacionCampos = require('../middlewares/validacion-campos')
const validacionJWT = require('../middlewares/validacion-jwt')
const validacionAdmin = require('../middlewares/validacion-rol')

module.exports = {
    ...validacionCampos,
    ...validacionJWT,
    ...validacionAdmin
}
