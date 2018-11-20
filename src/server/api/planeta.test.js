const planetaApi = require('./planeta')
const db = require('../db')

describe('Testando o recurso /planetas da API', () => {
  it('Obtem todos os planetas do banco de dados', (terminado) => {
    const requisicao = {}
    const resposta = {}

    const dados = [
      { nome: 'Geonosis', clima: 'Ameno', terreno: 'Lava', aparicoes: 1, id: 11 },
    ]

    resposta.json = (args) => {
      expect(args).toBe(dados)
      terminado()
    }

    db.obtemTodosPlanetas = () =>
      new Promise((resolve, reject) => {
        const res = 1
        if (res === 1) {
          resolve(dados)
        } else {
          reject(dados)
        }
      })
    planetaApi.obtemTodosPlanetas(requisicao, resposta)
  })

  it('Planeta não encontrado no banco de dados(nenhum planeta cadastrado)', (terminado) => {
    const requisicao = {}
    const resposta = {}

    resposta.send = (mensagem) => {
      expect(mensagem).toBe('Não Encontrado')
      terminado()
    }

    resposta.status = (status) => {
      expect(status).toBe(202)
      return resposta
    }

    resposta.status.mock = { calls: [] }

    db.obtemTodosPlanetas = () =>
      new Promise((resolve, reject) => {
        const erro = { message: 'Não Encontrado' }
        const res = 0
        if (res === 1) {
          resolve(erro)
        } else {
          reject(erro)
        }
      })

    planetaApi.obtemTodosPlanetas(requisicao, resposta)
  })

  it('Obtem uma mensagem de erro não esperada do Banco de dados', (terminado) => {
    const requisicao = {}
    const resposta = {}

    resposta.json = (erro) => {
      expect(erro).toEqual({ message: 'Erro não previsto' })
      terminado()
    }

    resposta.send = (mensagem) => {
      expect(mensagem).toBe('Não Encontrado')
      return resposta
    }
    resposta.status = (status) => {
      expect(status).toBe(500)
      return resposta
    }

    db.obtemTodosPlanetas = () =>
      new Promise((resolve, reject) => {
        const erro = { message: 'Erro não previsto' }
        const res = 0
        if (res === 1) {
          resolve(erro)
        } else {
          reject(erro)
        }
      })
    planetaApi.obtemTodosPlanetas(requisicao, resposta)
  })

  it('Obtem o planeta por ID', (terminado) => {
    const requisicao = {}
    const resposta = {}

    const dados = [
      { nome: 'Geonosis', clima: 'Ameno', terreno: 'Lava', aparicoes: 1, id: 11 },
    ]

    resposta.json = (parametro) => {
      expect(parametro).toEqual(dados)
      terminado()
    }

    requisicao.params = { id: 11 }

    db.obtemPorNomeOuIdPlaneta = () =>
      new Promise((resolve, reject) => {
        const res = 1
        if (res === 1) {
          resolve(dados)
        } else {
          reject(dados)
        }
      })
    planetaApi.obtemPorNomeOuIdPlaneta(requisicao, resposta)
  })

  it('Obtem o planeta por nome', (terminado) => {
    const requisicao = {}
    const resposta = {}

    const dados = [
      { nome: 'Geonosis', clima: 'Ameno', terreno: 'Lava', aparicoes: 1, id: 11 },
    ]

    resposta.json = (parametro) => {
      expect(parametro).toEqual(dados)
      terminado()
    }

    requisicao.params = { id: 'NomeDoPlaneta' }

    db.obtemPorNomeOuIdPlaneta = () =>
      new Promise((resolve, reject) => {
        const res = 1
        if (res === 1) {
          resolve(dados)
        } else {
          reject(dados)
        }
      })
    planetaApi.obtemPorNomeOuIdPlaneta(requisicao, resposta)
  })

  it('Planeta não encontrado na pesquisa por ID', (terminado) => {
    const requisicao = {}
    const resposta = {}

    const dados = [
      { nome: 'Geonosis', clima: 'Ameno', terreno: 'Lava', aparicoes: 1, id: 11 },
    ]

    resposta.send = (mensagem) => {
      expect(mensagem).toBe('Não Encontrado')
      terminado()
    }
    resposta.status = (status) => {
      expect(status).toBe(202)
      return resposta
    }

    requisicao.params = { id: 11 }

    db.obtemPorNomeOuIdPlaneta = () =>
      new Promise((resolve, reject) => {
        const erro = { message: 'Não Encontrado' }
        const res = 0
        if (res === 1) {
          resolve(dados)
        } else {
          reject(erro)
        }
      })
    planetaApi.obtemPorNomeOuIdPlaneta(requisicao, resposta)
  })

  it('Planeta não encontrado na pesquisa por nome', (terminado) => {
    const requisicao = {}
    const resposta = {}

    const dados = [
      { nome: 'Geonosis', clima: 'Ameno', terreno: 'Lava', aparicoes: 1, id: 11 },
    ]

    resposta.send = (mensagem) => {
      expect(mensagem).toBe('Não Encontrado')
      terminado()
    }
    resposta.status = (status) => {
      expect(status).toBe(202)
      return resposta
    }

    requisicao.params = { id: 'nomeDoPlaneta' }

    db.obtemPorNomeOuIdPlaneta = () =>
      new Promise((resolve, reject) => {
        const erro = { message: 'Não Encontrado' }
        const res = 0
        if (res === 1) {
          resolve(dados)
        } else {
          reject(erro)
        }
      })
    planetaApi.obtemPorNomeOuIdPlaneta(requisicao, resposta)
  })

  it('Obtem uma mensagem de erro não esperada do Banco de dados, na pesquisa por nome do planeta', (terminado) => {
    const requisicao = {}
    const resposta = {}

    resposta.json = (erro) => {
      expect(erro).toEqual({ message: 'Erro não previsto' })
      terminado()
    }

    resposta.status = (status) => {
      expect(status).toBe(500)
      return resposta
    }

    requisicao.params = { id: 'nomeDoPlaneta' }

    db.obtemPorNomeOuIdPlaneta = () =>
      new Promise((resolve, reject) => {
        const erro = { message: 'Erro não previsto' }
        const res = 0
        if (res === 1) {
          resolve(erro)
        } else {
          reject(erro)
        }
      })
    planetaApi.obtemPorNomeOuIdPlaneta(requisicao, resposta)
  })

  it('Obtem uma mensagem de erro não esperada do Banco de dados, na pesquisa por ID do planeta', (terminado) => {
    const requisicao = {}
    const resposta = {}

    resposta.json = (erro) => {
      expect(erro).toEqual({ message: 'Erro não previsto' })
      terminado()
    }

    resposta.status = (status) => {
      expect(status).toBe(500)
      return resposta
    }

    requisicao.params = { id: 11 }

    db.obtemPorNomeOuIdPlaneta = () =>
      new Promise((resolve, reject) => {
        const erro = { message: 'Erro não previsto' }
        const res = 0
        if (res === 1) {
          resolve(erro)
        } else {
          reject(erro)
        }
      })

    planetaApi.obtemPorNomeOuIdPlaneta(requisicao, resposta)
  })

  it('Remove planeta por ID', (terminado) => {
    const requisicao = {}
    const resposta = {}

    resposta.send = (mensagem) => {
      expect(mensagem).toBe('removido')
      terminado()
    }

    resposta.status = (status) => {
      expect(status).toBe(200)
      return resposta
    }

    requisicao.params = { id: 11 }

    db.removePorIdPlaneta = () =>
      new Promise((resolve, reject) => {
        const erro = { message: 'ID não encontrado no Banco de Dados' }
        const res = 1
        if (res === 1) {
          resolve('removido')
        } else {
          reject(erro)
        }
      })

    planetaApi.removePorIdPlaneta(requisicao, resposta)
  })

  it('ID do planeta não encontrado no banco de dados ao remover', (terminado) => {
    const requisicao = {}
    const resposta = {}

    const dados = [
      { nome: 'Geonosis', clima: 'Ameno', terreno: 'Lava', aparicoes: 1, id: 11 },
    ]

    resposta.send = (mensagem) => {
      expect(mensagem).toBe('ID não encontrado no Banco de Dados')
      terminado()
    }

    resposta.status = (status) => {
      expect(status).toBe(202)
      return resposta
    }

    requisicao.params = { id: 11 }

    db.removePorIdPlaneta = () =>
      new Promise((resolve, reject) => {
        const erro = { message: 'ID não encontrado no Banco de Dados' }
        const res = 0
        if (res === 1) {
          resolve(dados)
        } else {
          reject(erro)
        }
      })

    planetaApi.removePorIdPlaneta(requisicao, resposta)
  })

  it('Erro no banco de dados ao remover', (terminado) => {
    const requisicao = {}
    const resposta = {}

    const dados = [
      { nome: 'Geonosis', clima: 'Ameno', terreno: 'Lava', aparicoes: 1, id: 11 },
    ]

    resposta.json = (parametro) => {
      expect(parametro).toEqual({ message: 'Erro no Banco de Dados' })
      terminado()
    }

    resposta.status = (status) => {
      expect(status).toBe(500)
      return resposta
    }

    requisicao.params = { id: 11 }

    db.removePorIdPlaneta = () =>
      new Promise((resolve, reject) => {
        const erro = { message: 'Erro no Banco de Dados' }
        const res = 0
        if (res === 1) {
          resolve(dados)
        } else {
          reject(erro)
        }
      })

    planetaApi.removePorIdPlaneta(requisicao, resposta)
  })

  it('ID inválido do planeta informado para remover', (terminado) => {
    const requisicao = {}
    const resposta = {}

    resposta.sendStatus = (parametro) => {
      expect(parametro).toBe(400)
      terminado()
    }

    requisicao.params = { id: 'a' }

    planetaApi.removePorIdPlaneta(requisicao, resposta)
  })
})
