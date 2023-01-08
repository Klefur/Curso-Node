const { read } = require('fs')

require('colors')

const mostrarMenu = () => {
    
    return new Promise( resolve => {
        console.clear()
        console.log('=========================='.green)
        console.log('  Seleccione una opcion'.green)
        console.log('==========================\n'.green)
    
        console.log('1.- Crear Tarea')
        console.log('2.- Listar Tareas')
        console.log('3.- Listar Tareas Completas')
        console.log('4.- Listar Tareas Pendientes')
        console.log('5.- Completar tareas')
        console.log('6.- Borrar tareas')
        console.log('0.- Salir')
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question('Seleccione una opcion: ', (opt) => {
            readline.close()
            resolve(opt)
        })
    })

}

const pausa = () => {
    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`\nPresione ${ 'Enter'.green } para continuar\n`, (opt) => {
            readline.close()
            resolve(opt)
        })
    })
}

module.exports = {
    mostrarMenu,
    pausa
}