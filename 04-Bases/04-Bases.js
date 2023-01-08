const { number } = require('yargs')

const argv = require('yargs')
                .option('b', {
                    alias: 'base',
                    type: 'number',
                    demandOption: true,
                    describe: 'Es la base de multiplicar'
                })
                .option('h', {
                    alias: 'hasta',
                    demandOption: true,
                    describe: 'Es la base de multiplicar'
                })
                .argv

console.log('==========================')
console.log(`      Tabla del: ${ argv.b } `)
console.log('==========================')

for ( let i = 1; i <= argv.h; i++) {
    console.log(`${ argv.b } x ${ i } = ${ argv.b * i }`)
}