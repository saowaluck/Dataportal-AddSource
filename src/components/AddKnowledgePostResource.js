import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'

class AddKnowledgePostResource extends Component {
  state = {
    id: undefined,
    name: '',
    url: '',
    tags: [],
    isSubmit: false,
    options: [],
    message: false,
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/tags/`)
      .then(res => {
        res.data.tags.map(tag => (
          this.setState({
            options: [
              { text: tag, value: tag },
              ...this.state.options,
            ],
          })
        ))
      })
  }

  onSearchChange = (e, { searchQuery }) => {
    if (searchQuery.match(',')) {
      const tag = searchQuery.substring(0, searchQuery.length - 1)
      if (this.state.tags.every(currentTags => currentTags !== tag)) {
        this.setState({
          options: [{ text: tag, value: tag }, ...this.state.options],
          tags: [
            ...this.state.tags,
            tag,
          ],
        }, () => {
          this.dropdown.clearSearchQuery()
        })
      } else {
        this.setState(() => {
          this.dropdown.clearSearchQuery()
        })
      }
    }
  }

  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
    })
  }

  handleTagsChange = (e, { value }) => {
    this.setState({
      tags: value,
    })
  }

  allTagOption = e => { this.dropdown = e }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/resources/`, {
      name: this.state.name,
      url: this.state.url,
      tags: this.state.tags,
      type: this.props.type,
      email: this.props.auth.getEmail(),
    })
      .then((res) => {
        if (res.data.id === undefined) {
          this.setState({
            isSubmit: false,
            message: true,
          })
        } else {
          this.setState({
            isSubmit: true,
            id: res.data.id,
            message: false,
          })
        }
      })
      .catch(() => {
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='required field'>
            <label htmlFor='name'>Name</label>
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={this.state.name}
                required
                onChange={this.handleChange}
              />
          </div>
          <div className='required field'>
            <label htmlFor='url'>URL</label>
              <input
                type='url'
                name='url'
                placeholder='URL'
                value={this.state.url}
                required
                onChange={this.handleChange}
              />
          </div>
          <div className='field'>
            <label htmlFor='name'>Tags
              <Dropdown
                name='tags'
                ref={this.allTagOption}
                options={this.state.options}
                multiple
                placeholder='Insert Tags'
                search
                selection
                fluid
                allowAdditions
                value={this.state.tags}
                onSearchChange={this.onSearchChange}
                onAddItem={this.handleAddition}
                onChange={this.handleTagsChange}
              />
            </label>
          </div>
          <hr />
          <button className='ui primary button' type='submit'>Add</button>
        </form>
        { this.state.message &&
          <div className='ui red message'>
            The value was already entered. Type and URL must be unique. Please try again
          </div>
        }
        {this.state.isSubmit && (<Redirect to={`/resources/${this.state.id}/`} />)}
      </div>
    )
  }
}

AddKnowledgePostResource.propTypes = {
  type: PropTypes.string.isRequired,
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default AddKnowledgePostResource
