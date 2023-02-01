const { Category, Product } = require('../models')
const Rol = require('../models/rol')
const User = require('../models/user')

const rolValidator = async ( rol = 'user' ) => {
    
    const existeRol = await Rol.findOne({ rol })
    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no es valido`)
    }

    return true
}

const existeEmail = async ( email = '' ) => {

    const existeEmail = await User.findOne({ email })
    if ( existeEmail ) {
        throw new Error(`Ya existe el email ${email}`)
    }

    return true
}

const existeUserID = async ( id = '' ) => {

    const existeUser = await User.findById(id)
    if ( !existeUser ) {
        throw new Error(`No existe el usuario con id ${id}`)
    }

    return true
}

const existeCategoryID = async ( id = '' ) => {

    const existeCategory = await Category.findById(id)
    if ( !existeCategory ) {
        throw new Error(`No existe la categoria con id ${id}`)
    }

    return true
}

const existeProductID = async ( id = '' ) => {

    const existeProduct = await Product.findById(id)
    if ( !existeProduct ) {
        throw new Error(`No existe la producto con id ${id}`)
    }

    return true
}

const collectionPermitida = (collection = '', collections = []) => {

    if ( !collections.includes( collection ) ) {
        throw new Error(`La coleccion ${collection} no es permitida`)
    }

    return true
}

module.exports = {
    rolValidator,
    existeEmail,
    existeUserID,
    existeCategoryID,
    existeProductID,
    collectionPermitida
}