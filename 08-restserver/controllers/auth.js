const { request, response } = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const { generarJWT } = require('../helpers/generar-jwt')
const { googleVerify } = require('../helpers/google-verify')

const login = async (req = request, res = response) => {
    const { email, password } = req.body
    try{
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'Usuario/contraseña incorrectos - Email' })
        }
        
        if (!user.status) {
            return res.status(400).json({ msg: 'Usuario/contraseña incorrectos - Status: false' })
        }
        
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({ msg: 'Usuario/contraseña incorrectos - Contraseña' })
        }
        
        const token = await generarJWT( user.id )
        res.json({ user , token })
        
    } catch ( err ) {
        throw err
    }
}

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body

    try {
        const googleUser = await googleVerify( id_token )
        
        res.json({
            msg: 'Todo ok',
            id_token
        })
    } catch ( err ) {
        res.status(400).json({ ok: false, msg: 'El token no se puede verificar' })
    }

}

module.exports = {
    login,
    googleSignIn
}