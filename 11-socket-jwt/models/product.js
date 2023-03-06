const { Schema, model } = require('mongoose')
const { stringify } = require('uuid')

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    status: {
        type: Boolean,
        required: [true, 'El estado es obligatorio'],
        default: true
    },
    price: {
        type: Number,
        default: 0
    },
    img: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: { type: String },
    available: { type: Boolean, default: true } 
})

ProductSchema.methods.toJSON = function() {
    const { __v, ...product } = this.toObject()
    return product
}

module.exports = model( 'Product', ProductSchema )