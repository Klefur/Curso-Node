const { response } = require('express')

const validacionAdmin = async (req, res = response, next) => {
    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin un token valido'
        })
    }

    const { rol } = req.user

    if ( rol !== 'admin' ) {
        return res.status(401).json({
            msg: 'No eres administrador - No puedes hacer esto'
        })
    }

    next()
}

const validacionRol = async ( ...roles ) => {
    return (req, res = response, next) => {
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin un token valido'
            })
        }

        if ( !roles.includes( req.user.rol ) ) {
            return res.status(401).json({
                msg: `El usuario no tiene estos roles ${roles}`
            })
        }

        next()
    }
}

module.exports = {
    validacionAdmin,
    validacionRol
}