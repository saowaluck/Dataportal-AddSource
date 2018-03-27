import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Loader } from 'semantic-ui-react'
import axios from 'axios'
import logo from './../assets/images/logo-mark.png'

class Header extends Component {
  state = {
    id: '',
    name: this.props.auth.getName(),
    avatar: this.props.auth.getAvatar(),
  }

  componentDidMount() {
    const memberEmail = this.props.auth.getEmail()
    axios
      .get(`${process.env.REACT_APP_API_URL}/members/?memberEmail=${memberEmail}`)
      .then(result => {
        this.setState({ id: result.data.id })
      })
      .catch(() => {
      })
  }

  render() {
    const { isAuthenticated } = this.props.auth
    return (
      <div className='ui stackable menu'>
        <div className='ui container'>
          <a href='/' className='header item'>
            <img className='ui mini image' src={logo} alt='' />
            Dataportal
          </a>
          <div className='right menu'>
            <div className='ui simple right item'>
              <a href='/resources/add/'>Add New Resource</a>
            </div>
            {isAuthenticated() ? (
              <div className='ui simple right dropdown item'>
                <img className='ui avatar image' src={this.state.avatar} alt='logo' />
                {this.state.name}<i className='dropdown icon' />
                <div className='menu'>
                  <a className='item' href={`/members/${this.state.id}/edit/`}>Edit Profile</a>
                  <div className='divider' />
                  <a className='item' href='/logout'>Logout</a>
                </div>
              </div>) : (<Loader active inline='centered' />)
            }
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default Header
