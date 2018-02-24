import React, { Component } from 'react'
import axios from 'axios'
import ListAllSource from './ListAllSource'

class Search extends Component {
  state = {
    searchText: '',
    resource: [],
    defaultresource: [],
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_API_URL}/source/`
    axios
      .get(url)
      .then((res) => {
        this.setState({
          resource: res.data,
          defaultresource: res.data,
        })
      })
      .catch(() => {
      })
  }

  handleChange = e => {
    this.setState({ searchText: e.target.value })
  }

  handleSubmit = e => {
    if (e.key === 'Enter' && this.state.searchText.trim() !== '') {
      e.preventDefault()
      const url = `${process.env.REACT_APP_API_URL}/source/search/${this.state.searchText}/`
      axios
        .get(url)
        .then((res) => {
          this.setState({ resource: res.data })
        })
    }
    this.setState({
      resource: this.state.defaultresource,
    })
  }

  render() {
    return (
      <div className='ui main container'>
        <div className='ui stackable grid'>
          <div className='eleven wide column'>
            <div className='ui segment'>
              <div className='ui fluid category search'>
                <div className='ui fluid left icon input'>
                  <input
                    type='text'
                    name='search'
                    placeholder='Search...'
                    value={this.state.searchText}
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                  />
                  <i className='search icon' />
                </div>
              </div>
              <div className='meta'>
                <p>{this.state.resource.length} results found for {this.state.searchText}</p>
              </div>
              <ListAllSource resource={this.state.resource} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Search
