require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { userRouter, authRouter, categoryRouter, productRouter } = require('../routes')
const { dbConnection } = require('../database/config')

class Server {

    constructor(){
        this.app = express()
        this.paths = {
            user: '/api/users',
            auth: '/api/auth',
            category: '/api/categories',
            product: '/api/products',
            search: 'api/search'
        }

        // conexion DB
        this.dbConnect()

        // Middlewares
        this.middlewares()

        // Rutas
        this.routes()
        this.listen()
    }

    dbConnect() {
        this.db = dbConnection()
    }

    middlewares() {
        this.app.use( cors() )
        this.app.use( express.json() )
        this.app.use( express.static('public') )
    }

    routes() {
        this.app.use(this.paths.user, userRouter)
        this.app.use(this.paths.auth, authRouter)
        this.app.use(this.paths.category, categoryRouter)
        this.app.use(this.paths.product, productRouter)
    }

    listen() {
        this.app.listen(process.env.PORT)
    }

}

module.exports = Server