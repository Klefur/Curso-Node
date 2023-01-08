const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const dbConnection = () => {
    try {
        mongoose.connect(process.env.URI)
    } catch ( err ) {
        throw new Error('Error al iniciar base de datos')
    }
}

module.exports = {
    dbConnection
}