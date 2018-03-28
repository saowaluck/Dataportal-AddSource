import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'

class EditResource extends Component {
  state = {
    id: 0,
    name: '',
    url: '',
    tags: [''],
    isSubmit: false,
    options: [],
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
    const { id } = this.state
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/resources/${id}/edit/`, {
      name: this.state.name,
      url: this.state.url,
      tags: this.state.tags,
      type: this.props.type,
      createdDate: this.props.createdDate,
    })
      .then((res) => {
        console.log(res.data)
        this.setState({
          isSubmit: true,
          id: res.data.id,
        })
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

EditResource.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
}

export default EditResource
