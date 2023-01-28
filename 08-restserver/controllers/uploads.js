const { response } = require('express')
const { subirArchivo } = require('../helpers')
const { User, Product } = require('../models')

const loadArchive = async (req, res = response) => {
    
    try{
        
        const nombre = await subirArchivo( req.files, undefined, 'img' )
        res.json({ nombre })
    } catch (err) {

        res.status(400).json({ err })
    }
}

const updateImage = async (req, res = response) => {
    
    const { id, collection } = req.params
    
    let modelo

    switch ( collection ) {
        case 'users':
            modelo = await User.findById( id )
            if ( !modelo ) {
                return res.status(400).json({ msg: 'No existe un usuario con este ID' })
            }
            break
       
        case 'products':
            modelo = await Product.findById( id )
            if ( !modelo ) {
                return res.status(400).json({ msg: 'No existe un producto con este ID' })
            }
            break

        default:
            return res.status(500).json({ msg: 'No implementado' })
    }

    const nombre = await subirArchivo( req.files, undefined, collection )
    modelo.img = nombre

    await modelo.save()
    
}

module.exports = {
    loadArchive,
    updateImage,
}