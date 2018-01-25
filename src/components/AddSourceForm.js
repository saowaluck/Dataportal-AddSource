import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Dropdown } from 'semantic-ui-react'
import dotenv from 'dotenv'
import dateformat from 'dateformat'

dotenv.config({ path: './../../.env' })

class AddSourceForm extends Component {
  state = {
    id: 0,
    name: '',
    url: '',
    tag: '',
    types: [
      { key: '0', text: 'Data Source', value: 'Data Source' },
      { key: '1', text: 'Superset Dashboard', value: 'Superset Dashboard' },
      { key: '2', text: 'Knowledge Post', value: 'Knowledge post' },
    ],
    type: 'Superset Dashboard',
    isSubmit: false,
    dateofCreate: new Date(),
    dateofUpdate: new Date(),
    creator: 'kan ouivirus'
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/api/types/`)
      .then((res) => {
        const types = res.data.map((item, i) => ({ key: i, text: item.type, value: item.type }))
        this.setState({ types })
      })
      .catch(() => {
      })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDropdownChange(value) {
    this.setState({ type: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/source/`, {
      name: this.state.name,
      url: this.state.url,
      type: this.state.type,
      tag: this.state.tag,
      dateofCreate: dateformat(this.state.dateofCreate, "dd, mm, yyyy"),
      dateofUpdate: dateformat(this.state.dateofUpdate, "dd, mm, yyyy"),
      creator: this.state.creator,
    })
      .then((res) => {
        this.setState({
          isSubmit: true,
          id: res.data
        })
      })
      .catch(() => {
      })
  }

  render() {
    return (
      console.log(dateformat(this.state.dateofCreate, "dd, mm, yyyy")),
      <div className='ui main container'>
        <h1>Add New Resource</h1>
        <div className='ui segment'>
          <div className='ui stackable grid'>
            <div className='ten wide column'>
              <form className='ui form' onSubmit={this.handleSubmit}>
                <div className='field'>
                <label htmlFor='tag'>Resource Type</label>
                  <Dropdown
                    selection
                    name='type'
                    options={this.state.types}
                    placeholder='Superset Dashboard'
                    onChange={(e, { value }) => {
                    this.handleDropdownChange(value)
                  }}
                  />
                </div>
                <div className='field'>
                  <label htmlFor='name'>Name
                    <input
                      type='text'
                      name='name'
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
                      value={this.state.tag}
                      required
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <hr />
                <button className='ui primary button' type='submit'>Add</button>
              </form>
              {this.state.isSubmit && (<Redirect to={`/DisplaySourceDetail/${this.state.id}`} />)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddSourceForm
