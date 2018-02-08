import React from 'react'
import logo from './../assets/images/logo-mark.png'

const Header = () => (
  <div className='ui fixed menu'>
    <div className='ui container'>
      <a href='/' className='header item'>
        <img className='logo' src={logo} alt='' />
      Dataportal
      </a>
      <div className='right menu'>
        <div className='ui simple right item'>
          <a href='/resources/add/'>Add New Resource</a>
        </div>
        <div className='ui simple right dropdown item'>
        Kan Ouivirach <i className='dropdown icon' />
          <div className='menu'>
            <a className='item' href='/'>Edit Profile</a>
            <div className='divider' />
            <div class="g-signin2" data-width="300" data-height="200" data-longtitle="true" />
            <a className='item' href='/'>Log Out</a>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Header
