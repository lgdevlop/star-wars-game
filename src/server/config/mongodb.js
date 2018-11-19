/* eslint-disable no-console */
const mongoose = require('mongoose')

const bgVermelho = '\x1b[41m'
const bgVerde = '\x1b[42m'
const bgAmarelo = '\x1b[43m'
const fntVermelha = '\x1b[31m'
const fntBranca = '\x1b[37m'
const resetaTerminal = '\x1b[0m'

const host = process.env.HOST || 'localhost'

mongoose.connect(
  `mongodb://${host}/swapi_db`,
  { useNewUrlParser: true }
)
mongoose.connection.on('connected', () =>
  console.log(`${bgVerde}${fntBranca}`, 'Conectado ao MongoDB!', resetaTerminal)
)
// mongoose.connection.on('error', console.error.bind(console, 'Erro na conexão!'))
mongoose.connection.on('error', (erro) => {
  console.log(`${bgVermelho}${fntBranca}`, `Erro na conexão: ${erro}`, resetaTerminal)
  process.exit(0)
})
mongoose.connection.on('disconnected', () =>
  console.log(`${bgAmarelo}${fntVermelha}`, 'Desconectado do MongoDB:', resetaTerminal)
)

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      `${bgVermelho}${fntBranca}`,
      'Conexão encerrada com o MongoDB, aplicação encerrando...',
      resetaTerminal
    )
    process.exit(0)
  })
})
