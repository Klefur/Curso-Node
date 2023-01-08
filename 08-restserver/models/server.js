require('dotenv').config()
require('../routes/user')
const express = require('express')
const cors = require('cors')
const userRouter = require('../routes/user')
const authRouter = require('../routes/auth')
const { dbConnection } = require('../database/config')

class Server {

    constructor(){
        this.app = express()
        this.paths = {
            user: '/api/users',
            auth: '/api/auth'
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
    }

    listen() {
        this.app.listen(process.env.PORT)
    }

}

module.exports = Server