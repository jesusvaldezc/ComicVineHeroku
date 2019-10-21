const express = require('express')
const person = require('./comics.js');
const port = process.env.PORT || 3000
const app = express()

app.get('/', function (req, res) {
    return res.send({
        greeting: "Hola mundo"

    })
})

app.get("/comicCharacter", function (req, res) {
    if (!req.query.search) {
        return res.send({
            error: "Debes de enviar una direccion valida"
        })
    }
    person.character(req.query.search, function (error, comicData) {
        if (error) {
            return res.send({
                error: error
            })
        } else {
            return res.send({
                comicData
                });            
        }
    })

})

    app.get('/*', function (req, res) {
        return res.send({
            error: "Ruta no es valida"
        })

    })

    app.listen(port, function () {
        console.log('Up and running!')
    })
