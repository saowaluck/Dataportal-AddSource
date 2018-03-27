import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import axios from 'axios'
import ListAllResource from './ListAllResource'
import CategoryTeam from './CategoryTeam'

class Search extends Component {
  state = {
    searchText: '',
    resource: [],
    favorite: [],
    defaultresource: [],
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_API_URL}/resources/`
    axios
      .get(url)
      .then((res) => {
        this.setState({
          resource: res.data.resources,
          defaultresource: res.data.resources,
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
      const url = `${process.env.REACT_APP_API_URL}/resources/search/${this.state.searchText}/`
      axios
        .get(url)
        .then((res) => {
          this.setState({ resource: res.data.resources })
        })
    }
    this.setState({
      resource: this.state.defaultresource,
    })
  }

  panes = () => (
    [
      {
        menuItem: 'All',
        render: () => (<ListAllResource
          resource={this.state.resource}
          favorite={this.state.favorite}
        />),
      },
      { menuItem: 'Teams', render: () => <CategoryTeam teams={this.state.teams} /> },
    ]
  )

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
              <div className='ui twelve wide column'>
                <div className='ui row'>
                  <div className='meta'>
                    <p>{this.state.resource.length} results found for {this.state.searchText}</p>
                    <Tab menu={{ secondary: true, pointing: true }} panes={this.panes()} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Search
