const { Schema, model, SchemaType } = require('mongoose')

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

CategorySchema.methods.toJSON = function() {
    const { __v, ...category } = this.toObject()
    return category
}

module.exports = model( 'Category', CategorySchema )