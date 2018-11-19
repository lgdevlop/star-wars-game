const planetaApi = require('../api/planeta')

const rotas = {}
let server

/**
 * Configura as rotas da API REST
 * @param express Instância do express
 */
rotas.configuraRotas = function configuraRotas(express) {
  server = express
  rotas.todosPlanetas()
  rotas.porNomeOuPorIdPlaneta()
}

/**
 * Configura a rota '/planetas' que retorna todos os planetas do Banco de Dados e adiciona um planeta no Banco de Dados.
 */
rotas.todosPlanetas = function todosPlanetas() {
  server
    .route('/planetas')
    .get(planetaApi.obtemTodosPlanetas)
    .post(planetaApi.adicionaPlaneta)
}

/**
 * Configura a rota '/planetas/:id' que retorna o planeta informado por nome ou por ID e deleta um planeta por ID
 */
rotas.porNomeOuPorIdPlaneta = function porNomeOuPorIdPlaneta() {
  server
    .route('/planetas/:id')
    .get(planetaApi.obtemPorNomeOuIdPlaneta)
    .delete(planetaApi.removePorIdPlaneta)
}

module.exports = rotas
