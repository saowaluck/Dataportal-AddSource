import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class EditProfile extends Component {
  state = {
    id: '',
    name: '',
    position: '',
    email: '',
    slack: '',
    avatar: '',
  }

  componentDidMount() {
    const memberEmail = this.props.auth.getEmail()
    axios
      .get(`${process.env.REACT_APP_API_URL}/members/?memberEmail=${memberEmail}`)
      .then(result => {
        const {
          id, name, position, email, slack, avatar,
        } = result.data
        this.setState({
          id, name, position, email, slack, avatar,
        })
      })
      .catch(() => {
      })
  }

  handleSubmit = e => {
    const { id } = this.state
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/members/${id}`, {
      name: this.state.name,
      position: this.state.position,
      slack: this.state.slack,
      email: this.state.email,
      avatar: this.state.avatar,
    })
      .then(res => {
        this.setState({
          isSubmit: true,
          id: res.data.id,
        })
      })
      .catch(() => {
      })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className='ui main container'>
        <div className='ui stackable grid segment'>
          <div className='ui four wide column'>
            <div className='ui row basic segment aligned page'>
              <img className='ui small circular image' src={this.state.avatar} alt='' />
              <h2 className='ui header'>{this.state.name}</h2>
              <div className='item'>
                <i className='envelope outline blue icon' />
                {this.state.email}
              </div>
            </div>
          </div>
          <div className='ui twelve wide column'>
            <h2>Edit Profile</h2>
            <form className='ui form' onSubmit={this.handleSubmit}>
              <div className='field'>
                <label htmlFor='url'>Position
                  <input
                    type='text'
                    name='position'
                    placeholder='position'
                    value={this.state.position}
                    onChange={this.handleChange}
                  />
                </label>
              </div>
              <div className='field'>
                <label htmlFor='slack'>Slack
                  <input
                    type='text'
                    name='slack'
                    placeholder='Slack'
                    value={this.state.slack}
                    onChange={this.handleChange}
                  />
                </label>
              </div>
              <hr />
              <button className='ui primary button' type='submit'>Update profile</button>
            </form>
            {this.state.isSubmit && (<Redirect to={`/members/${this.state.id}/`} />)}
          </div>
        </div>
      </div>
    )
  }
}

EditProfile.propTypes = {
  auth: PropTypes.objectOf(PropTypes.func).isRequired,
}

export default EditProfile
