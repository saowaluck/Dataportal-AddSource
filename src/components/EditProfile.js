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
        <div className='ui centered grid'>
          <div className='twelve wide column'>
            <div className='ui segment'>
              <form className='ui form' onSubmit={this.handleSubmit}>
                <div className='field'>
                  <label htmlFor='name'>Name
                    <input
                      type='text'
                      name='name'
                      placeholder='Name'
                      value={this.state.name}
                      required
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className='field'>
                  <label htmlFor='url'>Position
                    <input
                      type='text'
                      name='position'
                      placeholder='position'
                      value={this.state.position}
                      required
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
                      required
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
      </div>
    )
  }
}

EditProfile.propTypes = {
  auth: PropTypes.objectOf(PropTypes.func).isRequired,
}

export default EditProfile
