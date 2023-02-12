const lblNuevoTicket = document.querySelector('h1')
const btnCrear = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes')

const searchParams = new URLSearchParams( window.location.search )

if ( !searchParams.has( 'escritorio' ) ) {
    window.location = 'index.html'
    throw new Error( 'El escritorio es obligatorio' )
}

const escritorio = searchParams.get( 'escritorio' )
lblNuevoTicket.innerText = escritorio

divAlerta.style.display = 'none'

const socket = io();


socket.on('connect', () => {
    // console.log('Conectado');
    btnCrear.disabled = false
    inicio = new Date().getTime()
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = true
});

socket.on('ultimo-ticket', (ultimo) => {
    
})

socket.on('tickets-pendientes', ( pendientes ) => {
    
    if ( pendientes === 0 ) {
        lblPendientes.innerText = '0'
    }

    lblPendientes.innerText = pendientes
})

btnCrear.addEventListener( 'click', () => {
    
    socket.emit( 'atender-ticket', { escritorio }, ( { status, ticket, msg } ) => {
        
        if ( status !== 200 ) {
            lblTicket.innerText = 'Nadie'
            divAlerta.style.display = ''
            return divAlerta.innerText = msg
        }

        lblTicket.innerText = 'Ticket ' + ticket.numero
    
    } )

});