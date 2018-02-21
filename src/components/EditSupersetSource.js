import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'

class EditSupersetSource extends Component {
  state = {
    id: 0,
    name: '',
    url: '',
    tags: '',
    isSubmit: false,
  }

  componentDidMount = () => {
    this.setState({
      id: this.props.id,
      name: this.props.name,
      url: this.props.url,
      tags: this.props.tags,
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/source/edit/`, {
      id: this.state.id,
      name: this.state.name,
      url: this.state.url,
      tags: this.state.tags,
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
      <div className='ui main container'>
        <h1>Edit Resource</h1>
        <div className='ui segment'>
          <div className='ui stackable grid'>
            <div className='ten wide column'>
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
                      name='tags'
                      placeholder='Tag'
                      value={this.state.tags}
                      required
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <hr />
                <button className='ui primary button' type='submit'>Save</button>
              </form>
              {this.state.isSubmit && (<Redirect to={`/resources/${this.state.id}/`} />)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EditSupersetSource.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default EditSupersetSource
