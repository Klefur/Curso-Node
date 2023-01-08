const Rol = require('../models/rol')
const User = require('../models/user')

const rolValidator = async ( rol = '' ) => {
    const existeRol = await Rol.findOne({ rol })
    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no es valido`)
    }
}

const existeEmail = async ( email = '' ) => {
    const existeEmail = await User.findOne({ email })
    if (existeEmail) {
        throw new Error(`Ya existe el email ${email}`)
    }
}

const existeUserID = async ( id = '' ) => {
    const existeUser = await User.findById(id)
    if (existeUser) {
        throw new Error(`No existe el usuario con id ${id}`)
    }
}

module.exports = {
    rolValidator,
    existeEmail,
    existeUserID
}