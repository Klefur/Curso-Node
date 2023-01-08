const { mostrarMenu, pausa } = require('./helpers/mensajes.js')

const main = async () => {
    
    let opt = ''

    do {
        opt = await mostrarMenu()
        opt !== '0' ? await pausa() : null
    } while ( opt !== '0' )
    
}

main()