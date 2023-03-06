const { Router } = require('express')
const { check } = require('express-validator')
const { validacionJWT, validacionCampos, validacionAdmin } = require('../middlewares')
const { postCategory, 
        getCategory, 
        getCategories, 
        deleteCategory, 
        putCategory } = require('../controllers/categories')
const { existeCategoryID } = require('../helpers/dbValidators')

const router = Router()

router.get('/', getCategories)

router.get('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeCategoryID ),
    validacionCampos
], getCategory)

router.post('/', [ 
    validacionJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validacionCampos
], postCategory)

router.put('/:id', [
    validacionJWT,
    validacionAdmin,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeCategoryID ),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validacionCampos
], putCategory)

router.delete('/:id', [
    validacionJWT,
    validacionAdmin,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeCategoryID ),
    validacionCampos
], deleteCategory)

module.exports = router