const url = 'http://localhost:8080/api/auth/'

let usuario = null
let socket = null

const txtUid = document.getElementById('txtUid')
const txtMensaje = document.getElementById('txtMensaje')
const ulUsuarios = document.getElementById('ulUsuarios')
const ulMensajes = document.getElementById('ulMensajes')
const btnSalir = document.getElementById('btnSalir')

const validarJWT = async () => {
    
    const token = localStorage.getItem('token') || ''

    if ( token.length <= 10 ) {
        window.location = 'index.html'
        throw new Error( 'No hay token en el servidor' )
    }

    const resp = await fetch( url, {
        headers: { 'authToken': token }
    })

    const { user: userDB, token: tokenDB } = await resp.json()
    usuario = userDB
    document.title = usuario.name

}

const conectarSocket = async () => {

    socket = io({
        'extraHeaders': {
            'authtoken': localStorage.getItem('token')
        }
    })

    socket.on('connect', () => {
        
    })  

    socket.on('disconnect', () => {

    })

    socket.on('recibir-mensajes', mostrarMensajes)

    socket.on('usuarios-activos', mostrarUsuarios)

    socket.on('mensaje-privado', privado)
}

const mostrarUsuarios = ( usuarios = [] ) => {
    
    let usersHtml = ''
    usuarios.forEach( ({ name, uid }) => {

        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${name}</h5>
                    <span class="fs-6 text-muted">${uid}</span>
                </p>
            </li>
        `
    })

    ulUsuarios.innerHTML = usersHtml
}

const mostrarMensajes = ( mensajes ) => {

    let mensajesHtml = ''

    mensajes.forEach( ({ mensaje, nombre }) => {
        mensajesHtml += `
            <li>
                <p>
                    <span class="text-primary">${nombre}:</span>
                    <span class="fs-6 text-muted">${mensaje}</span>
                </p>
            </li>
        `
    })

    ulMensajes.innerHTML = mensajesHtml

}

const privado = ( { from, mensaje } ) => {
    ulMensajes.innerHTML += `
        <li>
            <p>
                <span class="text-primary">${from}:</span>
                <span class="fs-6 text-muted">${mensaje}</span>
            </p>
        </li>
    ` 
}

txtMensaje.addEventListener('keyup', ({ code }) => {
    
    const mensaje = txtMensaje.value
    const uid = txtUid.value

    if ( code !== "Enter" ) { return }
    if ( mensaje.length === 0) { return }

    socket.emit('enviar-mensaje', { mensaje, uid })

    txtMensaje.value = ''
})

btnSalir.addEventListener('click', () => {
    localStorage.clear()
    window.location = ''
})

const main = async () => {
    
    await validarJWT()
    await conectarSocket()
    
}

main()