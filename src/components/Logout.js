import React from 'react'
import PropTypes from 'prop-types'

const Logout = ({ auth }) => (
  <div>
    {auth.logout()}
  </div>
)

Logout.propTypes = {
  auth: PropTypes.func.isRequired,
}

export default Logout
