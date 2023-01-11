const { response } = require('express')
const { Category } = require('../models')

const postCategory = async (req, res = response) => {
    const name =  req.body.name.toUpperCase()

    const existeCategory = await Category.findOne({ name })

    if ( existeCategory ) {
        return res.status(400).json({
            msg: `La categoria ${name} ya existe`
        })
    }
    
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category( data )

    await category.save()

    res.status(201).json({ category })

}

const getCategories= async (req, res = response) => {
    const { page=1, page_size=10 } = req.query
    const estado = { status: true }

    const [ total, categories ] = await Promise.all([
        User.count( estado ),
        User.find( estado )
            .populate('user', 'name')
            .limit( Number( page_size ) )
            .skip( Number( page_size ) * ( Number( page ) - 1) )
    ])

    res.json({
        total,
        categories
    })
}

const getCategory= async (req, res = response) => {
    const { id } = req.params
    const category = await Category.findById(id).populate('user', 'name')

    res.json({ category })
}

const putCategory= async (req, res = response) => {
    const { id } = req.params
    const { status, user, ...body} = req.body
    
    if ( body.name ) {
        body.name = body.name.toUpperCase()
    }
    
    body.user = req.user._id
    console.log(req.user)

    const category = await Category.findByIdAndUpdate({ id, body }).populate('user', 'name')

    res.json({ category })
}

const deleteCategory= async (req, res = response) => {
    const { id } = req.params
    const category = await Category.findByIdAndUpdate( id, { status: false } ).populate('user', 'name')

    res.json({ msg: 'Category deleted', category })
}


module.exports = {
    postCategory,
    getCategories,
    getCategory,
    putCategory,
    deleteCategory
}