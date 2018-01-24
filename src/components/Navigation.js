import React from 'react'
import PropTypes from 'prop-types'

const Navigation = ({ tabs }) => (
  <div className='ui row vertical segment'>
    <div className='ui secondary menu nav-item'>
      <div className='ui secondary pointing menu'>
        <a className='item active' href='/'>{tabs[0]}</a>
        <a className='item' href='/'>{tabs[1]}</a>
      </div>
    </div>
  </div>
)

Navigation.propTypes = {
  tabs: PropTypes.string.isRequired,
}

export default Navigation
