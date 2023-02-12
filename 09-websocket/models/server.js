require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { socketController } = require('../sockets/controller')

class Server {

    constructor(){
    
        this.app = express()
        this.server = require('http').createServer( this.app )
        this.io = require('socket.io')( this.server )

        // Middlewares
        this.middlewares()

        // Rutas
        this.routes()

        // Sockets
        this.sockets()
    }

    middlewares() {
    
        this.app.use( cors() )
        this.app.use( express.static('public') )
    
    }

    routes() {
    
        // this.app.use(this.paths.user, userRouter)
    }

    sockets() {
        this.io.on('connection', socketController)
    }

    listen() {

        this.server.listen(process.env.PORT)
    }

}

module.exports = Server