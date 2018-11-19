const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const rotas = require('./rotas')
require('./config/mongodb')

const bgVerde = '\x1b[42m'
const fntBranca = '\x1b[37m'
const resetaTerminal = '\x1b[0m'

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cors())

rotas.configuraRotas(server)

const porta = 4444

server.listen(porta, () => {
  // eslint-disable-next-line no-console
  console.log(
    `${bgVerde}${fntBranca}`,
    `Servidor escutando na porta ${porta}...`,
    resetaTerminal
  )
})
