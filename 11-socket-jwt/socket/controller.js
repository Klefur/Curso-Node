const { Socket } = require('socket.io')
const { comprobarJWT } = require('../helpers/generar-jwt')
const { ChatInfo } = require('../models')
const { check } = require('express-validator')

const chatMensajes = new ChatInfo()

const socketController = async ( socket = new Socket(), io ) => {
    const token = socket.handshake.headers['authtoken']
    const usuario = await comprobarJWT( token )
    
    if ( !usuario ) {
        return socket.disconnect()
    }

    // conexion del usuario
    chatMensajes.conectarUsuario( usuario )
    io.emit('usuarios-activos', chatMensajes.usuariosArr )
    socket.emit('recibir-mensajes', chatMensajes.ultimos10)

    // conexion a sala privada
    socket.join( usuario.id )

    socket.on('disconnect', () => {
        
        chatMensajes.desconectarUsuario( usuario )
        io.emit('usuarios-activos', chatMensajes.usuariosArr )
    })

    socket.on('enviar-mensaje', ( { uid, mensaje } ) => {
        
        if ( uid ) {
            
            socket.to( uid ).emit('mensaje-privado', { from: usuario.name, mensaje })
        } else {
            
            chatMensajes.enviarMensaje(usuario.id, usuario.name, mensaje )
            io.emit('recibir-mensajes', chatMensajes.ultimos10)
        }
    })
}


module.exports = {
    socketController
}