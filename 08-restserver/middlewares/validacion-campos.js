const { response } = require("express")
const { validationResult } = require('express-validator')


const validacionCampos = (req, res = response, next) => {
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors)
    }

    next()
}

const validacionEstados = (req, res = response, next) => {
    const { status, google } = req
}

module.exports = {
    validacionCampos
}