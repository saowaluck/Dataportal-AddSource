import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import axios from 'axios'
import AllResourceList from './AllResourceList'
import DatabaseList from './DatabaseList'
import KnowledgePostList from './KnowledgePostList'
import SupersetList from './SupersetList'
import NewsFeed from './NewsFeed'
import RecommentData from './RecommenetData'
class Search extends Component {
  state = {
    searchText: '',
    resources: [],
    defaultresources: [],
    checked:false,
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_API_URL}/resources/`
    axios
      .get(url)
      .then((res) => {
        this.setState({
          resources: res.data.resources,
          defaultresources: res.data.resources,
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
      axios.get(`${process.env.REACT_APP_API_URL}/resources/search/${this.state.searchText}/?checked=${this.state.checked}`)
        .then((res) => {
          this.setState({ resources: res.data.resources })
        })
    }
    this.setState({
      resources: this.state.defaultresources,
    })
  }

  handleChecked = () => {
    if(this.state.checked) {
      this.setState({
        checked: false,
      })
    } else {
      this.setState({
        checked: true,
      })
    }
  }

  panes = () => (
    [
      { menuItem: 'All', render: () => (<AllResourceList searchText={this.state.searchText} resources={this.state.resources} />) },
      { menuItem: 'Knowledge Post', render: () => <KnowledgePostList searchText={this.state.searchText} resources={this.state.resources.filter(item => item.resource.type === 'Knowledge Post')} /> },
      { menuItem: 'Superset Dashboard', render: () => <SupersetList searchText={this.state.searchText} resources={this.state.resources.filter(item => item.resource.type === 'Superset Dashboard')} /> },
      { menuItem: 'Database', render: () => <DatabaseList searchText={this.state.searchText} resources={this.state.resources.filter(item => item.resource.type === 'Database')} /> },
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
                <br />
                <div className='ui checkbox' onClick={this.handleChecked} >
                  <input type='checkbox' name='checked' />
                  <label>Basic Search</label>
                </div>
              </div>
              <div className='ui twelve wide column'>
                <div className='ui row'>
                  <div className='meta'>
                    <Tab menu={{ secondary: true, pointing: true }} panes={this.panes()} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='five wide column'>
          <NewsFeed />
          <RecommentData  email={this.props.auth.getEmail()}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Search
