const express = require('express') // eslint-disable-line

const server = express()
const publishing = express.static('./dist')

const bgVerde = '\x1b[42m'
const fntBranca = '\x1b[37m'
const resetaTerminal = '\x1b[0m'

server.use(publishing)

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(
    `${bgVerde}${fntBranca}`,
    `Servidor escutando na porta ${PORT}...`,
    resetaTerminal
  ) // eslint-disable-line no-console
})
