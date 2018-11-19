import React from 'react'
import PropTypes from 'prop-types'

import './NomePlaneta.scss'

const NomePlaneta = ({ nome }) => (
  <div className="nome-planeta">
    <h1>{nome}</h1>
  </div>
)

NomePlaneta.propTypes = {
  nome: PropTypes.string.isRequired,
}

export default NomePlaneta
