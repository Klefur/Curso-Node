const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Nombre requerido']
    },
    email: {
        type: String,
        required: [true, 'Email requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password requerida']
    },
    rol: {
        type: String,
        required: [true, 'Rol requerido'],
        enum: ['admin', 'user']
    },
    img: {
        type: String
    },
    status: {
        type: Boolean
    },
    google: {
        type: Boolean
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject()
    return { uid: _id, user }
}

module.exports = model( 'User', UserSchema )