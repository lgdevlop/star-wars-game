const planetaApi = require('./planeta')
const db = require('../db')

const requisicao = {}
const resposta = {}

const dados = [
  { nome: 'Geonosis', clima: 'Ameno', terreno: 'Lava', aparicoes: 1, id: 11 },
]
const dadosNovos = [
  { nome: 'Abacate', clima: 'Ameno', terreno: 'Lava', aparicoes: 1, id: 11 },
]
// let retornoResposta = ''
// resposta.json = jest.fn((parametro) => {
//   // expect(parametro).toBe(dadosNovos)
//   // retornoResposta = parametro
//   console.log('Resposta JSON', parametro)
// })

describe('Obtem todos os planetas', () => {
  it('Obtem todos os planetas do banco de dados', () => {
    // const requisicao = {}
    // const resposta = {}

    // const dados = [
    //   { nome: 'Geonosis', clima: 'Ameno', terreno: 'Lava', aparicoes: 1, id: 11 },
    // ]
    // const dadosNovos = [
    //   { nome: 'Abacate', clima: 'Ameno', terreno: 'Lava', aparicoes: 1, id: 11 },
    // ]

    // resposta.json = (parametro) => {
    //   expect(parametro).toBe(dadosNovos)
    // }

    resposta.json = jest.fn((parametro) => {
      // expect(parametro).toBe(dadosNovos)
      // retornoResposta = parametro
      console.log('Resposta JSON', parametro)
    })

    // const argumento = resposta.json.mock.calls.calls[0][0]
    // console.log('argumento: ', argumento)

    db.obtemTodosPlanetas = () =>
      new Promise((resolve, reject) => {
        const res = 1
        if (res === 1) {
          resolve(dados)
        } else {
          reject(dados)
        }
      })
    expect.assertions(1)
    planetaApi.obtemTodosPlanetas(requisicao, resposta)
    // expect(retornoResposta).toBe(dadosNovos)
    expect(resposta.json).toHaveBeenCalledWith(dados)
  })

  // it('Obtem uma mensagem de não encontrado do banco de dados', () => {
  //   const requisicao = {}
  //   const resposta = {}

  //   resposta.status = (status) => (mensagem) => {
  //     expect(status).toBe(202)
  //     expect(mensagem).toBe('Não Encontrado')
  //   }

  //   db.obtemTodosPlanetas = () =>
  //     new Promise((resolve, reject) => {
  //       const erro = { message: 'Não Encontrado' }
  //       const res = 0
  //       if (res === 1) {
  //         resolve(erro)
  //       } else {
  //         reject(erro)
  //       }
  //     })
  //   planetaApi.obtemTodosPlanetas(requisicao, resposta)
  // })

  // it('Obtem uma mensagem de erro 500', () => {
  //   const requisicao = {}
  //   const resposta = {}

  //   resposta.status = (status) => (mensagem) => {
  //     expect(status).toBe(500)
  //     expect(mensagem).toBe('Erro 500')
  //   }

  //   db.obtemTodosPlanetas = () =>
  //     new Promise((resolve, reject) => {
  //       const erro = 'Erro 500'
  //       const res = 0
  //       if (res === 1) {
  //         resolve(erro)
  //       } else {
  //         reject(erro)
  //       }
  //     })
  //   planetaApi.obtemTodosPlanetas(requisicao, resposta)
  // })
})

// describe('Obtem o planeta por ID ou por nome', () => {
//   it('Obtem o planeta por ID', () => {
//     const requisicao = {}
//     const resposta = {}

//     const dados = [
//       { nome: 'Geonosis', clima: 'Ameno', terreno: 'Lava', aparicoes: 1, id: 11 },
//     ]

//     resposta.json = (parametro) => {
//       expect(parametro).toBe(dados)
//     }

//     requisicao.params = { id: 11 }

//     // resposta.status = (status) => (mensagem) => {
//     //   expect(status).toBe(500)
//     //   expect(mensagem).toBe('Erro 500')
//     // }

//     db.obtemPorNomeOuIdPlaneta = (parametro) =>
//       new Promise((resolve, reject) => {
//         // const res = 1
//         if (parametro === requisicao.params.id) {
//           resolve(dados)
//         } else {
//           reject(dados)
//         }
//       })
//     planetaApi.obtemPorNomeOuIdPlaneta(requisicao, resposta)
//   })

//   it('Não encontra o planeta por ID', () => {
//     const requisicao = {}
//     const resposta = {}
//     const dadosErrado = {}

//     // const dados = [{ nome: 'Geonosis', clima: 'Ameno', terreno: 'Lava', aparicoes: 1, id: 11 }]

//     // resposta.json = (parametro) => {
//     //   expect(parametro).toBe(dados)
//     // }
//     resposta.status = (status) => (mensagem) => {
//       expect(status).toBe(202)
//       console.log(mensagem)
//       expect(mensagem).toBe(1) // Errado, rever o mock
//     }

//     requisicao.params = { id: 11 }
//     dadosErrado.params = { id: 1 }

//     db.obtemPorNomeOuIdPlaneta = (parametro) =>
//       new Promise((resolve, reject) => {
//         // const res = 1
//         const erro = { message: 'Não Encontrado' }
//         if (parametro === dadosErrado.params.id) {
//           resolve(erro)
//         } else {
//           reject(erro)
//         }
//       })
//     planetaApi.obtemPorNomeOuIdPlaneta(requisicao, resposta)
//   })
// })
