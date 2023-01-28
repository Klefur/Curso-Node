const { Router } = require('express')
const { check } = require('express-validator')
const { loadArchive, updateImage } = require('../controllers/uploads')
const { validacionCampos, fileValidator } = require('../middlewares')

const router = Router()

router.post( '/', [
    fileValidator
], loadArchive)

router.put( '/:collection/:id', [
    check('id', 'No es una id valida').isMongoId(),
    check('collection').custom( c => collectionPermitida( c, ['users', 'products'] )),
    fileValidator,
    validacionCampos
], updateImage)

module.exports = router
