// config inicial
//dotenv
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

// rotas da API
const personRoutes = require('./routes/postRoutes')

//   /person - será redirecionado para o personRoutes.js
app.use('/posts', personRoutes)


// rota inicial / endpoint

//verbo http | na home | ..| função anonima, callback
app.get('/', (req, res) => {
    // mostrar requisição

    res.json({mensagem: 'Oi Express!'})
})

// entregar uma porta 
// const DB_USER = process.env.DB_USER
// const DB_PASS = encodeURIComponent(process.env.DB_PASS)
const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@apiblogtestmat.rdyaees.mongodb.net/?retryWrites=true&w=majority`)

//mongoose.connect('mongodb+srv://apiblog:apiblog123@apiblogtestmat.rdyaees.mongodb.net/?retryWrites=true&w=majority')

//promisse
.then(()=> {
    console.log("Conectado ao MongoDB!")
    app.listen(3000)
})
//qnd der erro
.catch((err) => console.log(err))
