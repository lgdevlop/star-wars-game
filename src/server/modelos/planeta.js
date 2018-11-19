const moongoose = require('mongoose')

const esquema = moongoose.Schema({
  id: Number,
  nome: String,
  clima: String,
  terreno: String,
  aparicoes: Number,
})

moongoose.model('planeta', esquema)
