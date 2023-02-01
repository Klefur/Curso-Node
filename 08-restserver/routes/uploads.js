const { Router } = require('express')
const { check } = require('express-validator')
const { loadArchive, updateImage, showImage } = require('../controllers/uploads')
const { validacionCampos, fileValidator } = require('../middlewares')
const { collectionPermitida } = require('../helpers')

const router = Router()

router.post( '/', [
    fileValidator
], loadArchive)

router.put( '/:collection/:id', [
    fileValidator,
    check('id', 'No es una id valida').isMongoId(),
    check('collection').custom( c => collectionPermitida( c, ['users', 'products'] )),
    validacionCampos
], updateImage)

router.get('/:collection/:id', [
    check('id', 'No es una id valida').isMongoId(),
    check('collection').custom( c => collectionPermitida( c, ['users', 'products'] )),
    validacionCampos
], showImage)

module.exports = router
