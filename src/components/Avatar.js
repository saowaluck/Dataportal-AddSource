import React from 'react'
import PropTypes from 'prop-types'

const Avatar = ({ image, size }) => (
  <img className={`ui ${size} image`} src={image} alt='' />
)

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
}

export default Avatar
