const { request, response } = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const { generarJWT } = require('../helpers/generar-jwt')

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

module.exports = {
    login
}