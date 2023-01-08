const { Router } = require('express')
const { check } = require('express-validator')

const Rol = require('../models/rol')
const { validacionCampos } = require('../middlewares/validacion-campos')
const { rolValidator, existeEmail, existeUserID} = require('../helpers/dbValidators')
const { getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser,
    patchUser } = require('../controllers/user')
    
const router = Router()

router.get('/', getUsers)

router.get('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeUserID ),
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

router.patch('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeUserID ),
],  patchUser)

router.delete('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeUserID ),
    validacionCampos,
],  deleteUser)


module.exports = router