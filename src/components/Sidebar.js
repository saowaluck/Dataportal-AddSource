
import React from 'react'
import PropTypes from 'prop-types'

const sidebar = () => (
  <div>
    <div className='ui top attached demo menu'>
      <a className='item'>
        <i className='sidebar icon' /> Menu
      </a>
    </div>
    <div className='ui bottom attached segment'>
      <div className='ui inverted labeled icon left inline vertical demo sidebar menu'>
      <a className='item'>
      <i className='home icon' /> Home
    </a>
      <a className='item'>
      <i className='block layout icon' /> Topics
    </a>
      <a className='item'>
      <i className='smile icon' /> Friends
    </a>
      <a className='item'>
      <i className='calendar icon' /> History
    </a>
    </div>
      <div className='pusher'>
      <div className='ui basic segment'>
      <h3 className='ui header'>Application Content</h3>
      <p />
      <p />
      <p />
      <p />
    </div>
    </div>
    </div>
  </div>
)

export default sidebar
