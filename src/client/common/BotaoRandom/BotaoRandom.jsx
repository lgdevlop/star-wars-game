import React from 'react'
import PropTypes from 'prop-types'

import './BotaoRandom.scss'

const BotaoRandom = ({ handleClick }) => (
  <div className="botao-random">
    <button onClick={handleClick} type="button">
      Get Random Planet
    </button>
  </div>
)

BotaoRandom.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

export default BotaoRandom
