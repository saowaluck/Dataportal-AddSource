import React from 'react'
import PropTypes from 'prop-types'

const Text = ({ header, paragraph }) => (
  <div>
    <h1 className='ui header'>{header}</h1>
    <h2 className='ui header'>{header}</h2>
    <h3 className='ui header'>{header}</h3>
    <h4 className='ui header'>{header}</h4>
    <h5 className='ui header'>{header}</h5>
    <h6 className='ui header'>{header}</h6>
    <p className='f5 f4-m f3-l fw2 black-50 mt0 lh-copy'>{paragraph}</p>
  </div>
)

Text.propTypes = {
  header: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
}

export default Text

