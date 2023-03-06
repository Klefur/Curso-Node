const { Router } = require('express')
const { check } = require('express-validator')

const { login, googleSignIn, renovarToken } = require('../controllers/auth')
const { validacionCampos, validacionJWT } = require('../middlewares')

const router = Router()

router.post('/login',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
], login)

router.post('/google',[
    check('id_token', 'El id_token es obligatorio').not().isEmpty(),
    validacionCampos
], googleSignIn)

router.get('/', validacionJWT, renovarToken )


module.exports = router