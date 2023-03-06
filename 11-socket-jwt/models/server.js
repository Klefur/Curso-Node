require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
2
const { userRouter,
        authRouter, 
        categoryRouter, 
        productRouter, 
        searchRouter, 
        uploadRouter } = require('../routes')
const { dbConnection } = require('../database/config')
const { socketController } = require('../socket/controller')


class Server {

    constructor(){

        this.app = express()
        this.server = require('http').createServer( this.app )
        this.io = require('socket.io')( this.server )


        this.paths = {
            user: '/api/users',
            auth: '/api/auth',
            category: '/api/categories',
            product: '/api/products',
            search: '/api/search',
            upload: '/api/upload'
        }

        // conexion DB
        this.dbConnect()

        // Middlewares
        this.middlewares()

        // Rutas
        this.routes()
        this.listen()
        
        // sockets
        this.sockets()
    }

    dbConnect() {

        this.db = dbConnection()
    }

    middlewares() {

        this.app.use( cors() )
        this.app.use( express.json() )
        this.app.use( express.static('public') )
        this.app.use( fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }))
    }

    routes() {

        this.app.use(this.paths.user, userRouter)
        this.app.use(this.paths.auth, authRouter)
        this.app.use(this.paths.category, categoryRouter)
        this.app.use(this.paths.product, productRouter)
        this.app.use(this.paths.search, searchRouter)
        this.app.use(this.paths.upload, uploadRouter)
    }
    
    sockets() {
        
        this.io.on( 'connection', ( socket ) => socketController( socket, this.io ) )
    }

    listen() {

        this.server.listen(process.env.PORT)
    }

}

module.exports = Server