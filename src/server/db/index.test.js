const mongoose = require('mongoose')
require('../modelos/planeta')

const modelo = mongoose.model('planeta')

const db = require('./index')

describe('Testando a lógica CRUD', () => {
  it('verificaSePlanetaExisteMongoDb: Planeta encontrado no banco de dados', (terminado) => {
    jest.spyOn(modelo, 'find')
    modelo.find.mockImplementation(() => Promise.resolve('Encontrado'))

    // expect.assertions(1)
    return db.verificaSePlanetaExisteMongoDb('Abacate').catch((erro) => {
      expect(erro.message).toBe('Planeta já cadastrado')
      terminado()
    })
  })

  it('verificaSePlanetaExisteMongoDb: Planeta não encontrado no banco de dados', (terminado) => {
    jest.spyOn(modelo, 'find')
    modelo.find.mockImplementation(() => Promise.resolve({}))

    // expect.assertions(1)
    return db.verificaSePlanetaExisteMongoDb('Abacate').then((retorno) => {
      expect(retorno).toBe('Não encontrado')
      terminado()
    })
  })

  it('verificaSePlanetaExisteMongoDb: Erro não esperado no banco de dados ao buscar por planeta', (terminado) => {
    jest.spyOn(modelo, 'find')
    modelo.find.mockImplementation(() => Promise.reject(new Error('Erro desconhecido')))

    // expect.assertions(1)
    return db.verificaSePlanetaExisteMongoDb('Abacate').catch((erro) => {
      expect(erro.message).toBe('Erro desconhecido')
      terminado()
    })
  })

  it('obtemTodosPlanetas: Planeta encontrado no banco de dados', (terminado) => {
    jest.spyOn(modelo, 'find')
    modelo.find.mockImplementation(() => Promise.resolve('Encontrado'))

    // expect.assertions(1)
    return db.obtemTodosPlanetas().then((planeta) => {
      expect(planeta).toBe('Encontrado')
      terminado()
    })
  })

  it('obtemTodosPlanetas: Planeta não encontrado no banco de dados', (terminado) => {
    jest.spyOn(modelo, 'find')
    modelo.find.mockImplementation(() => Promise.resolve({}))

    // expect.assertions(1)
    return db.obtemTodosPlanetas().catch((erro) => {
      expect(erro.message).toBe('Não Encontrado')
      terminado()
    })
  })

  it('obtemTodosPlanetas: Erro não esperado no banco de dados ao buscar por planeta', (terminado) => {
    jest.spyOn(modelo, 'find')
    modelo.find.mockImplementation(() => Promise.reject(new Error('Erro desconhecido')))

    // expect.assertions(1)
    return db.obtemTodosPlanetas().catch((erro) => {
      expect(erro.message).toBe('Erro desconhecido')
      terminado()
    })
  })

  it('obtemPorNomeOuIdPlaneta: Planeta encontrado no banco de dados', (terminado) => {
    jest.spyOn(modelo, 'find')
    modelo.find.mockImplementation(() => Promise.resolve('Encontrado'))

    // expect.assertions(1)
    return db.obtemPorNomeOuIdPlaneta('Planeta').then((planeta) => {
      expect(planeta).toBe('Encontrado')
      terminado()
    })
  })

  it('obtemPorNomeOuIdPlaneta: Planeta não encontrado no banco de dados', (terminado) => {
    jest.spyOn(modelo, 'find')
    modelo.find.mockImplementation(() => Promise.resolve({}))

    // expect.assertions(1)
    return db.obtemPorNomeOuIdPlaneta('Planeta').catch((erro) => {
      expect(erro.message).toBe('Não Encontrado')
      terminado()
    })
  })

  it('obtemPorNomeOuIdPlaneta: Erro não esperado no banco de dados ao buscar por planeta', (terminado) => {
    jest.spyOn(modelo, 'find')
    modelo.find.mockImplementation(() => Promise.reject(new Error('Erro desconhecido')))

    // expect.assertions(1)
    return db.obtemPorNomeOuIdPlaneta('Planeta').catch((erro) => {
      expect(erro.message).toBe('Erro desconhecido')
      terminado()
    })
  })

  it('adicionaPlaneta: Planeta adicionado no banco de dados', (terminado) => {
    jest.spyOn(modelo, 'create')
    modelo.create.mockImplementation(() => Promise.resolve('Adicionado'))

    // expect.assertions(1)
    return db.adicionaPlaneta('Planeta').then((retorno) => {
      expect(retorno).toBe('Adicionado')
      terminado()
    })
  })

  it('adicionaPlaneta: Erro não esperado no banco de dados ao adicionar planeta', (terminado) => {
    jest.spyOn(modelo, 'create')
    modelo.create.mockImplementation(() => Promise.reject(new Error('Erro desconhecido')))

    // expect.assertions(1)
    return db.adicionaPlaneta('Planeta').catch((erro) => {
      expect(erro.message).toBe('Erro desconhecido')
      terminado()
    })
  })

  it('removePorIdPlaneta: Remove planeta do banco de dados', (terminado) => {
    jest.spyOn(modelo, 'deleteOne')
    const dados = {}
    dados.n = 1
    modelo.deleteOne.mockImplementation(() => Promise.resolve(dados))

    // expect.assertions(1)
    return db.removePorIdPlaneta('Planeta').then((mensagem) => {
      expect(mensagem).toBe('removido')
      terminado()
    })
  })

  it('removePorIdPlaneta: Planeta não encontrado no banco de dados para remoção', (terminado) => {
    jest.spyOn(modelo, 'deleteOne')
    const dados = {}
    dados.n = 0
    modelo.deleteOne.mockImplementation(() => Promise.resolve(dados))

    // expect.assertions(1)
    return db.removePorIdPlaneta('Planeta').catch((erro) => {
      expect(erro.message).toBe('ID não encontrado no Banco de Dados')
      terminado()
    })
  })

  it('removePorIdPlaneta: Erro não esperado no banco de dados ao remover planeta', (terminado) => {
    jest.spyOn(modelo, 'deleteOne')
    modelo.deleteOne.mockImplementation(() =>
      Promise.reject(new Error('Erro desconhecido'))
    )

    // expect.assertions(1)
    return db.removePorIdPlaneta('Planeta').catch((erro) => {
      expect(erro.message).toBe('Erro desconhecido')
      terminado()
    })
  })
})
