const { Schema, model } = require('mongoose')

const RolSchema = Schema({
    name: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
})

module.exports = model( 'Rol', RolSchema )