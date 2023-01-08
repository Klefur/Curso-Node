const { response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validacionJWT = async (req, res = response, next) => {
    const token = req.header('authToken')

    if ( !token ) {
        return res.status(401).json({ msg: 'Token no valido' })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETKEY)
        
        const user = await User.findById( uid )

        if ( !user ) {
            return res.status(401).json({ msg: 'Token no valido - Este usuario no existe' })
        }

        if ( !user.status ) {
            return res.status(401).json({ msg: 'Token no valido - Status: false' })
        }

        req.user = user

        next()

    } catch ( err ) {
        console.log(err)
        res.status(401).json({ msg: 'Token no valido' })
    }

}

module.exports = {
    validacionJWT
}