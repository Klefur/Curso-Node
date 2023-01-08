const express = require('express')
const app = express()
const port = 8080


app.set('view engine', 'hbs')
// contenido estatico
app.use( express.static('public'))


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/generic', (req, res) => {
    res.render('generic')
})

app.get('/elements', (req, res) => {
    res.render('elements')
})

app.get('*', (req, res) => {
    res.send('404 | Page not found')
})

app.listen(port)
