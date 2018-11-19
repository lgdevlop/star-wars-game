import React, { Component } from 'react'

import AppLogo from '../../common/AppLogo'
import Card from '../../componentes/Card'
import BotaoRandom from '../../common/BotaoRandom'

import * as ConsomeRESTApi from '../../utils/Swapi'

import './AppLayout.scss'

class AppLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numeroTotalPlanetas: 0,
      idPlaneta: '',
      nome: '',
      populacao: '',
      clima: '',
      terreno: '',
      quantidadeAparicaoFilmes: 0,
      mensagem: 'Click the button below',
    }
  }

  componentDidMount() {
    this.obtemQuantidadeTotalPlanetas()
  }

  obtemNumeroPlanetaAleatorio = ({ numeroTotalPlanetas }) =>
    Math.floor(Math.random() * numeroTotalPlanetas) + 1

  adicionaDadosNoEstado = (dados, chave, chaveEstado) => {
    const objEstado = {}
    objEstado[chaveEstado] = dados[chave]
    this.setState(objEstado)
  }

  obtemQuantidadeTotalPlanetas = async () => {
    ConsomeRESTApi.obtemPlanetas()
    const dados = await ConsomeRESTApi.obtemDados()
    this.adicionaDadosNoEstado(dados, 'count', 'numeroTotalPlanetas')
  }

  obtemPlanetaAleatorio = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const numeroPlanetaAleatorio = this.obtemNumeroPlanetaAleatorio(this.state)
    this.setState({ idPlaneta: numeroPlanetaAleatorio })
    this.obtemPlaneta(numeroPlanetaAleatorio)
  }

  obtemPlaneta = async (planetaId) => {
    ConsomeRESTApi.limpaParametros()
    ConsomeRESTApi.obtemPlanetas(planetaId)
    const dados = await ConsomeRESTApi.obtemDados()

    this.adicionaDadosNoEstado(dados, 'name', 'nome')
    this.adicionaDadosNoEstado(dados, 'population', 'populacao')
    this.adicionaDadosNoEstado(dados, 'climate', 'clima')
    this.adicionaDadosNoEstado(dados, 'terrain', 'terreno')

    const aparicoesFilme = dados.films.length
    this.setState({ quantidadeAparicaoFilmes: aparicoesFilme })
  }

  handleClick = () => {
    this.setState({ mensagem: 'Loading...' })
    this.setState({ nome: '' })
    this.obtemPlanetaAleatorio()
  }

  render() {
    const {
      mensagem,
      nome,
      populacao,
      clima,
      terreno,
      quantidadeAparicaoFilmes,
    } = this.state
    return (
      <div className="container">
        <AppLogo />
        <Card
          mensagem={mensagem}
          nome={nome}
          populacao={populacao}
          clima={clima}
          terreno={terreno}
          quantidadeAparicaoFilmes={quantidadeAparicaoFilmes}
        />
        <BotaoRandom handleClick={this.handleClick} />
      </div>
    )
  }
}

export default AppLayout
