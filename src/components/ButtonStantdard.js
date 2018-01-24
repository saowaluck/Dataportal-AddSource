import React from 'react'
import PropTypes from 'prop-types'

const ButtonStantdard = ({ text }) => (
  <div className='ui blue inverted fluid large submit button'>
    {text}
  </div>
)

ButtonStantdard.propTypes = {
  text: PropTypes.string.isRequired,
}

export default ButtonStantdard
