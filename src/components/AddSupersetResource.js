import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Dropdown, Label } from 'semantic-ui-react'

class AddSupersetResource extends Component {
  state = {
    id: undefined,
    name: '',
    url: '',
    tags: [],
    isSubmit: false,
    options: [],
    message: false,
    messageTags: false,
    isDuplicate: '',
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
    if (this.state.tags.length < 10) {
      this.setState({ messageTags: false })
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
    } else {
      this.setState({ messageTags: true })
    }
  }

  handleAddition = (e, { value }) => {
    if (value.length < 11) {
      this.setState({
        options: [{ text: value, value }, ...this.state.options],
      })
    }
  }

  handleTagsChange = (e, { value }) => {
    if (value.length < 11) {
      this.setState({
        tags: value,
        messageTags: false,
      })
    } else {
      this.setState({ messageTags: true })
    }
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
        if (res.data.isDuplicate) {
          this.setState({
            isSubmit: false,
            message: true,
            isDuplicate: res.data,
          })
        } else {
          this.setState({
            isSubmit: true,
            id: res.data.id,
            message: false,
          })
        }
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
              required
              value={this.state.name}
              onChange={this.handleChange}
            />
            {this.state.nameEror === 'error' && <Label basic color='red' pointing>Please enter a name</Label>}
          </div>
          <div className='required field'>
            <label htmlFor='url'>URL</label>
            <input
              type='url'
              name='url'
              required
              placeholder='URL'
              value={this.state.url}
              onChange={this.handleChange}
            />
            {this.state.url === 'er' && <Label basic color='red' pointing>Please enter url</Label>}
          </div>
          {this.state.messageTags &&
            <div className='ui red message'>
              Can not input tags more than 10.
            </div>
          }
          <div className='field'>
            <label htmlFor='name'>Tags
              <span className='meta'>(limit:10)</span>
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
            Have resource duplicate this type and url,can see resource in
            <a href={`/resources/${this.state.isDuplicate.id}/`}>
              <b>&nbsp;{this.state.isDuplicate.name}</b>
            </a>
          </div>
        }
        {this.state.isSubmit && (<Redirect to={`/resources/${this.state.id}/`} />)}
      </div>
    )
  }
}

AddSupersetResource.propTypes = {
  type: PropTypes.string.isRequired,
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default AddSupersetResource
