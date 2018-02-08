import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import dotenv from 'dotenv'
import PropTypes from 'prop-types'

dotenv.config({ path: './../../.env' })

class AddSupersetSource extends Component {
  state = {
    id: 0,
    name: '',
    url: '',
    tag: '',
    isSubmit: false,
  }

  componentDidMount() {
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/source/`, {
      name: this.state.name,
      url: this.state.url,
      tag: this.state.tag,
      type: this.props.type,
    })
      .then((res) => {
        this.setState({
          isSubmit: true,
          id: res.data.identity.low,
        })
      })
      .catch(() => {
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
            <label htmlFor='url'>URL
              <input
                type='url'
                name='url'
                placeholder='URL'
                value={this.state.url}
                required
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className='field'>
            <label htmlFor='tag'>Tag
              <input
                type='text'
                name='tag'
                placeholder='Tag'
                value={this.state.tag}
                required
                onChange={this.handleChange}
              />
            </label>
          </div>
          <hr />
          <button className='ui primary button' type='submit'>Add</button>
        </form>
        {this.state.isSubmit && (<Redirect to={`/resources/${this.state.id}/`} />)}
      </div>
    )
  }
}

AddSupersetSource.propTypes = {
  type: PropTypes.string.isRequired,
}

export default AddSupersetSource
