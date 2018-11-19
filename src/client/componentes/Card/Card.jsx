import React from 'react'
import PropTypes from 'prop-types'

import './Card.scss'
import NomePlaneta from '../../common/NomePlaneta'
import DadosCard from '../../common/DadosCard'

const Card = ({
  mensagem,
  nome,
  populacao,
  clima,
  terreno,
  quantidadeAparicaoFilmes,
}) => {
  const classe = 'card-box'
  const modifier = 'card-box--loading'

  return nome === '' ? (
    <div className={`${classe} ${modifier}`}>
      <h1>{mensagem}</h1>
    </div>
  ) : (
    <div className={classe}>
      <NomePlaneta nome={nome} />
      <DadosCard
        populacao={populacao}
        clima={clima}
        terreno={terreno}
        quantidadeAparicaoFilmes={quantidadeAparicaoFilmes}
      />
    </div>
  )
}

Card.propTypes = {
  mensagem: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  populacao: PropTypes.string.isRequired,
  clima: PropTypes.string.isRequired,
  terreno: PropTypes.string.isRequired,
  quantidadeAparicaoFilmes: PropTypes.number.isRequired,
}

export default Card
