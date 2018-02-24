import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'

class EditKnowledgePostSource extends Component {
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

  handleTagsAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
    })
  }

  handleTagsChange = (e, { value }) => this.setState({ tags: value })

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
                  <label htmlFor='tag'>Tag
                    <Dropdown
                      options={this.state.options}
                      placeholder='Insert Tag'
                      name='tags'
                      search
                      selection
                      fluid
                      multiple
                      allowAdditions
                      value={this.state.tags}
                      onAddItem={this.handleTagsAddition}
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

EditKnowledgePostSource.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
}

export default EditKnowledgePostSource
