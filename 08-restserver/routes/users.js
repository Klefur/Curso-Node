const { Router } = require('express')
const { check } = require('express-validator')

const { validacionCampos, 
        validacionJWT, 
        validacionAdmin 
    } = require('../middlewares')

    const { rolValidator, 
        existeEmail, 
        existeUserID 
    } = require('../helpers/dbValidators')

const { getUsers,
        getUser,
        postUser,
        putUser,
        deleteUser,
        patchUser 
    } = require('../controllers/users')
    
const router = Router()

router.get('/', getUsers)

router.get('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeUserID ),
    validacionCampos
], getUser)

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('password', 'La clave es obligatoria y largo minimo 8').not().isEmpty().isLength({ min: 8 }),
    check('email').custom( existeEmail ),
    check('rol').custom( rolValidator ),
    validacionCampos,
],  postUser)

router.put('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeUserID ),
    check('email', 'El email no es valido').isEmail(),
    check('password', 'La clave es obligatoria y largo minimo 8').not().isEmpty().isLength({ min: 8 }),
    check('rol').custom( rolValidator ),
    validacionCampos,
],  putUser)

router.delete('/:id',[
    validacionJWT,
    validacionAdmin,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeUserID ),
    validacionCampos,
],  deleteUser)


module.exports = router