import React from 'react'
import PropTypes from 'prop-types'

import './DadosCard.scss'

const DadosCard = ({ populacao, clima, terreno, quantidadeAparicaoFilmes }) => (
  <div className="card-dados">
    <div className="card-dados-box">
      <p>
        Population:
        <span> {populacao}</span>
      </p>
    </div>
    <div className="card-dados-box">
      <p>
        Climate:
        <span> {clima}</span>
      </p>
    </div>
    <div className="card-dados-box">
      <p>
        Terrain:
        <span> {terreno}</span>
      </p>
    </div>
    <div className="card-dados-featured">
      <p>
        Featured in
        <span> {quantidadeAparicaoFilmes} </span>
        {quantidadeAparicaoFilmes > 1 ? 'Films' : 'Film'}
      </p>
    </div>
  </div>
)

DadosCard.propTypes = {
  populacao: PropTypes.string.isRequired,
  clima: PropTypes.string.isRequired,
  terreno: PropTypes.string.isRequired,
  quantidadeAparicaoFilmes: PropTypes.number.isRequired,
}

export default DadosCard
