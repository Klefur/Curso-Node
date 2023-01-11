const { Router } = require('express')
const { check } = require('express-validator')
const { validacionJWT, validacionCampos, validacionAdmin } = require('../middlewares')
const { postProduct, 
        getProducts, 
        getProduct, 
        deleteProduct, 
        putProduct } = require('../controllers/products')
const { existeProductID, existeCategoryID } = require('../helpers/dbValidators')

const router = Router()

router.get('/', getProducts)

router.get('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeProductID ),
    validacionCampos
], getProduct)

router.post('/', [
    validacionJWT,
    check('name', 'El nombre es necesario').not().isEmpty(),
    check('category', 'No es un id valido').isMongoId(),
    check('category').custom( existeCategoryID ),
    validacionCampos
], postProduct)

router.put('/:id', [
    validacionJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeProductID ),
    validacionCampos
], putProduct)

router.delete('/:id', [
    validacionJWT,
    validacionAdmin,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existeProductID ),
    validacionCampos
], deleteProduct)

module.exports = router