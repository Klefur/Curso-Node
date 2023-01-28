const { response } = require('express')
const { isValidObjectId } = require('mongoose')
const { User, Product, Category } = require('../models')

const collections = [
    'users',
    'categories',
    'products',
    'rol',
]

const searchUsers = async (item = '', res = response) => {

    const isValidID = isValidObjectId(item)

    if ( isValidID ) {
        const user = await User.findById(id)
        return res.json({
            result: user ? [ user ] : []
        })
    }

    const regex = RegExp(item, 'i')

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    })

    res.json({
        results: users
    })
}

const searchProducts = async (item = '', res = response) => {

    const isValidID = isValidObjectId(item)

    if ( isValidID ) {
        const product = await Product.findById(id)
                        .populate('category', 'name')
        return res.json({
            result: product ? [ product ] : []
        })
    }

    const regex = RegExp(item, 'i')

    const products = await Product.find({
        $or: [{ name: regex }, { available: item }],
        $and: [{ status: true }]
    })
        .populate('category', 'name')

    res.json({
        results: products
    })
}

const searchCategories = async (item = '', res = response) => {

    const isValidID = isValidObjectId(item)

    if ( isValidID ) {
        const category = await Category.findById(id)
        return res.json({
            result: category ? [ category ] : []
        })
    }

    const regex = RegExp(item, 'i')

    const categories = await Category.find({
        name: regex,
        status: true
    })    

    res.json({
        results: categories
    })
}


const search = async (req, res = response) => {
    
    const { collection, item } = req.params

    if ( !collections.includes(collection) ) {
        return res.status(400).json({
            msg: `La coleccion ${collection} no es valida`
        })
    }

    switch (collection) {
        case 'users':
            searchUsers( item, res )
            break
        case 'categories':
            searchCategories( item, res )
            break
        case 'products':
            searchProducts( item, res )
            break
        default:
            res.status(500).json({
                msg: 'No esta implementado'
            })
    }
}

module.exports = {
    search
}