const https = require('https')
const db = require('../db')
require('../modelos/planeta')

const planetaApi = {}

/**
 * Verifica se o planeta existe na SWAPI
 * @param {string} nomePlaneta
 */
const verificaSePlanetaExisteSwapi = (nomePlaneta) => {
  const url = `https://swapi.co/api/planets/?search=${nomePlaneta}&format=json`
  return new Promise((resolve, reject) => {
    let resposta = ''
    https.get(url, (resp) => {
      resp.on('data', (data) => {
        resposta += data
      })
      resp
        .on('end', () => {
          resolve(JSON.parse(resposta))
        })
        .on('error', (erro) => {
          reject(erro)
        })
    })
  })
}

/**
 * Lista todos os planetas cadastrados no MongoDB
 */
planetaApi.obtemTodosPlanetas = function obtemTodosPlanetas(requisicao, resposta) {
  db.obtemTodosPlanetas()
    .then((planetas) => {
      resposta.json(planetas)
    })
    .catch((erro) => {
      if (erro.message.trim() === 'Não Encontrado') {
        resposta.status(202).send('Não Encontrado')
      } else {
        resposta.status(500).json(erro)
      }
    })
}

/**
 * Busca planeta por ID(Swapi) ou por nome(não sensível a caixa)
 */
planetaApi.obtemPorNomeOuIdPlaneta = function obtemPorNomeOuIdPlaneta(
  requisicao,
  resposta
) {
  const planeta = {}

  const reg = new RegExp('^\\d+$')
  if (reg.test(requisicao.params.id)) {
    planeta.id = requisicao.params.id
  } else {
    const campoComRegex = `^${requisicao.params.id}$`
    planeta.nome = { $regex: campoComRegex, $options: 'i' }
  }

  db.obtemPorNomeOuIdPlaneta(planeta)
    .then((planetas) => resposta.json(planetas))
    .catch((erro) => {
      if (erro.message.trim() === 'Não Encontrado') {
        resposta.status(202).send('Não Encontrado')
      } else {
        resposta.status(500).json(erro)
      }
    })
}

/**
 * Adiciona planeta no banco de dados somente se não já estiver cadastrado e existir no swapi. Não sensível a caixa, respeitará a caixa do primeiro cadastro.
 */
planetaApi.adicionaPlaneta = function adicionaPlaneta(requisicao, resposta) {
  Promise.all([
    db.verificaSePlanetaExisteMongoDb(requisicao.body.nome),
    verificaSePlanetaExisteSwapi(requisicao.body.nome),
  ])
    .then((dados) => {
      if (dados[1].count > 0) {
        const parametros = { ...requisicao.body }
        parametros.aparicoes = dados[1].results[0].films.length
        parametros.id = dados[1].results[0].url.substr(
          29,
          dados[1].results[0].url.lastIndexOf('/') - 29
        )

        db.adicionaPlaneta(parametros)
          .then((planeta) => resposta.json(planeta))
          .catch((erro) => resposta.status(500).json(erro))
      } else {
        resposta.sendStatus(400)
      }
    })
    .catch((erro) => {
      if (erro.message.trim() === 'Planeta já cadastrado') {
        resposta.status(202).send('Planeta já cadastrado')
      } else {
        resposta.status(500).json(erro)
      }
    })
}

/**
 * Remove o planeta pelo ID informado.
 */
planetaApi.removePorIdPlaneta = function removePorIdPlaneta(requisicao, resposta) {
  const reg = new RegExp('^\\d+$')
  if (reg.test(requisicao.params.id)) {
    db.removePorIdPlaneta({ id: requisicao.params.id })
      .then((dados) => resposta.status(200).send(dados))
      .catch((erro) => {
        if (erro.message.trim() === 'ID não encontrado no Banco de Dados') {
          resposta.status(202).send('ID não encontrado no Banco de Dados')
        } else {
          resposta.status(500).json(erro)
        }
      })
  } else {
    resposta.sendStatus(400)
  }
}

module.exports = planetaApi
