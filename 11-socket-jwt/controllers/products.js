const { response } = require('express')
const { Product } = require('../models')

const postProduct = async (req, res = response) => {

    const body = req.body
    body.name = body.name.toUpperCase()

    const existeProduct = await Product.findOne({ name: body.name })

    if ( existeProduct ) {
        return res.status(400).json({
            msg: `El producto ${name} ya existe`
        })
    }
    
    const data = {
        ...body,
        user: req.user._id,
    }

    const product = new Product( data )

    await product.save()

    res.status(201).json({ product })

}

const getProducts= async (req, res) => {
    
    const { page=1, page_size=10 } = req.query
    const estado = { status: true }

    const [ total, products ] = await Promise.all([
        Product.count( estado ),
        Product.find( estado )
            .populate('user', 'name')
            .populate('category', 'name')
            .limit( Number( page_size ) )
            .skip( Number( page_size ) * ( Number( page ) - 1) )
    ])

    res.json({
        total,
        products
    })
}

const getProduct= async (req, res) => {
    
    const { id } = req.params

    console.log(id)
    const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name')

    res.json({ product })
}

const putProduct= async (req, res) => {

    const { id } = req.params
    const { status, user, ...body} = req.body
    
    if ( body.name ){
        body.name = body.name.toUpperCase()
    }
    body.user = req.user._id

    const product = await Product.findByIdAndUpdate( id, { body })
        .populate('user', 'name')
        .populate('category', 'name')

    res.json({ product })
}

const deleteProduct= async (req, res) => {

    const { id } = req.params
    const category = await Product.findByIdAndUpdate( id, { status: false } )
        .populate('user', 'name')
        .populate('category', 'name')

    res.json({ msg: 'Product deleted', category })
}


module.exports = {
    postProduct,
    getProducts,
    getProduct,
    putProduct,
    deleteProduct
}