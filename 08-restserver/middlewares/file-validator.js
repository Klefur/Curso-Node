const { response } = require("express")

const fileValidator = (req, res = response, next) => {
    
    if ( !req.files || Object.keys(req.files).lenght === 0 || !req.files.archivo ) {
        return res.status(400).json({ msg: 'No hay archivos para subir' })
    }

    next()
}

module.exports = {
    fileValidator
}