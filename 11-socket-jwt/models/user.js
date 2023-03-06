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
        default: 'user',
        required: [true, 'Rol requerido'],
        enum: ['admin', 'user']
    },
    img: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject()
    user.uid = _id
    return user
}

module.exports = model( 'User', UserSchema )