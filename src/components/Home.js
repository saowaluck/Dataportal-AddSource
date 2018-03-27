import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

class Home extends Component {
  state = {
    loading: true,
    name: '',
    email: '',
    avatar: '',
  }

  componentDidMount() {
    setTimeout(() => this.setState({
      loading: false,
      name: this.props.auth.getName(),
      email: this.props.auth.getEmail(),
      avatar: this.props.auth.getAvatar(),
    }), 1000)
  }

  createMember = () => (
    axios.post(`${process.env.REACT_APP_API_URL}/members/`, {
      name: this.state.name,
      position: '',
      email: this.state.email,
      slack: '',
      avatar: this.state.avatar,
    })
  )

  render() {
    const { loading } = this.state
    const { isAuthenticated } = this.props.auth
    if (loading) {
      return null
    }
    if (isAuthenticated()) {
      this.createMember()
    }
    return (
      isAuthenticated() ?
        <Redirect to='/search' />
        : <Redirect to='/notfound' />
    )
  }
}

Home.propTypes = {
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default Home

