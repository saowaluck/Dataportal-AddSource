import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Dropdown, Confirm } from 'semantic-ui-react'

class EditResource extends Component {
  state = {
    id: undefined,
    name: '',
    url: '',
    tags: [''],
    isSubmit: false,
    isRedirect: false,
    options: [],
    message: false,
    open: false,
  }

  componentDidMount = () => {
    this.setState({
      id: this.props.id,
      name: this.props.name,
      url: this.props.url,
      tags: this.props.tags,
      options: this.props.tags.map(tag =>
        Object.assign({ text: tag, value: tag })),
    })
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

  handleDeleteResource = e => {
    const { id } = this.state
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/resources/${id}/delete/`)
      .then((res) => {
        if (res) {
          this.setState({ open: false, isRedirect: true })
        }
      })
  }

  show = () => this.setState({ open: true })
  handleCancel = () => this.setState({ open: false })

  handleSubmit = e => {
    const { id } = this.state
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/resources/${id}/edit/`, {
      name: this.state.name,
      url: this.state.url,
      tags: this.state.tags,
      type: this.props.type,
      createdDate: this.props.createdDate,
      check_url: this.props.url,
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
      <div className='ui main container'>
        <div className='ui centered grid'>
          <div className='twelve wide column'>
            <div className='ui segment'>
              <h1>Edit Resource</h1>
              <form className='ui form'>
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
              </form>
              <button name='submit' onClick={this.handleSubmit} className='ui primary button' type='submit'>Save</button>
              <button name='delete'onClick={this.show} className='ui negative button' type='submit'>Delete</button>
              { this.state.message &&
                <div className='ui red message'>
                  The value was already entered. Type and URL must be unique. Please try again
                </div>
              }
              {this.state.isSubmit && (<Redirect to={`/resources/${this.state.id}/`} />)}
              {this.state.isRedirect && (<Redirect to='/search/' />)}
            </div>
          </div>
        </div>
        <Confirm
          open={this.state.open}
          content='Are you sure to delete this resource ?'
          cancelButton='Not right now'
          confirmButton='Yes, delete resource'
          onCancel={this.handleCancel}
          onConfirm={this.handleDeleteResource}
        />
      </div>
    )
  }
}

EditResource.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
}

export default EditResource
