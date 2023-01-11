const { request, response } = require('express')
const bcrypt = require('bcrypt')

const { User } = require('../models')
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
        const { name, img, email } = await googleVerify( id_token )
        
        let user = await User.findOne({ email })

        if ( !user ) {
            const data = {
                name,
                email,
                img,
                password: 'google',
                google: true,
            }

            user = new User( data )
            await user.save()
        }

        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Contacte con un administrador, Usuario inhabilitado'
            })
        }

        const token = await generarJWT( user.id )

        res.json({
            user,
            token
        })
    } catch ( err ) {
        res.status(400).json({ ok: false, msg: 'El token no se puede verificar' })
    }

}

module.exports = {
    login,
    googleSignIn
}