const mongoose = require('mongoose')
require('../modelos/planeta')

const modelo = mongoose.model('planeta')

const db = {}

/**
 * Verifica se existe o planeta cadastrado no MongoDB
 * @param {string} nomePlaneta
 */
db.verificaSePlanetaExisteMongoDb = function verificaSePlanetaExisteMongoDb(nomePlaneta) {
  return new Promise((resolve, reject) => {
    modelo
      .find({ nome: { $regex: nomePlaneta, $options: 'i' } })
      .then((planetaEncontrado) => {
        if (typeof planetaEncontrado !== 'undefined' && planetaEncontrado.length > 0) {
          throw new Error('Planeta já cadastrado')
        } else {
          resolve('Não encontrado')
        }
      })
      .catch((erro) => reject(erro))
  })
}

/**
 * Obtem todos os planetas do MongoDB
 */
db.obtemTodosPlanetas = function obtemTodosPlanetas() {
  return new Promise((resolve, reject) =>
    modelo
      .find()
      .then((planetas) => {
        if (typeof planetas !== 'undefined' && planetas.length > 0) {
          resolve(planetas)
        } else {
          throw new Error('Não Encontrado')
        }
      })
      .catch((erro) => reject(erro))
  )
}

/**
 * Obtem o Planeta do MongoDB, buscando por nome ou por ID(SWAPI)
 */
db.obtemPorNomeOuIdPlaneta = function obtemPorNomeOuIdPlaneta(planeta) {
  return new Promise((resolve, reject) => {
    modelo
      .find(planeta)
      .then((planetaEncontrado) => {
        if (typeof planetaEncontrado !== 'undefined' && planetaEncontrado.length > 0) {
          resolve(planetaEncontrado)
        } else {
          throw new Error('Não Encontrado')
        }
      })
      .catch((erro) => reject(erro))
  })
}

/**
 * Adiciona planeta no MongoDB
 */
db.adicionaPlaneta = function adicionaPlaneta(parametros) {
  return new Promise((resolve, reject) => {
    modelo
      .create(parametros)
      .then((planeta) => resolve(planeta))
      .catch((erro) => reject(erro))
  })
}

/**
 * Remove o planeta por ID do MongoDB
 */
db.removePorIdPlaneta = function removePorIdPlaneta(parametros) {
  return new Promise((resolve, reject) => {
    modelo
      .deleteOne(parametros)
      .then((dados) => {
        if (dados.n > 0) {
          resolve('removido')
        } else {
          throw new Error('ID não encontrado no Banco de Dados')
        }
      })
      .catch((erro) => reject(erro))
  })
}

module.exports = db
