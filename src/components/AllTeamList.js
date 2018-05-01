import React, { Component } from 'react'
import axios from 'axios'
import { Pagination } from 'semantic-ui-react'

class AllTeamList extends Component {
  state = {
    teams: [],
    searchText: '',
    beginList: 0,
    endList: 20,
    activePage: 1,
    listPerPage: 20,
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_API_URL}/teams/`
    axios
      .get(url)
      .then((res) => {
        this.setState({
          teams: res.data,
        })
      })
      .catch(() => {
      })
  }

  onPageChange =(e, { activePage }) => {
    this.setState(({
      endList: activePage * this.state.listPerPage,
      activePage,
    }))
    if (activePage === 1) {
      this.setState(({
        beginList: 0,
      }))
    } else {
      this.setState(({
        beginList: ((activePage * this.state.listPerPage) - this.state.listPerPage),
      }))
    }
  }

  handleChange = e => {
    this.setState({ searchText: e.target.value })
  }

  handleSubmit = e => {
    if (e.key === 'Enter' && this.state.searchText.trim() === '') {
      axios.get(`${process.env.REACT_APP_API_URL}/teams/`)
        .then((res) => {
          this.setState({ teams: res.data })
        })
    } else if (e.key === 'Enter' && this.state.searchText.trim() !== '') {
      axios.get(`${process.env.REACT_APP_API_URL}/teams/search/${this.state.searchText}`)
        .then((res) => {
          this.setState({ teams: res.data })
        })
    }
  }

  render() {
    return (
      <div className='ui main container'>
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
          <br />
          <div className='ui four column grid'>
            {this.state.teams.slice(this.state.beginList, this.state.endList).map(item => (
              <div className='column' key={item.team.id}>
                <div className='ui card'>
                  <div className='content'>
                    <div className='header'>
                      <a href={`/teams/${item.team.id}/`}>
                        <div className='center aligned'>
                          {item.team.name}
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className='content'>
                    <div className='ui small feed'>
                      <div className='event'>
                        <div className='content'>
                          <div className='description'>
                            {item.team.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          ))}
          </div>
          {this.state.teams.length !== 0 &&
            <div className='ui center aligned basic segment'>
              <Pagination
                activePage={this.state.activePage}
                totalPages={Math.ceil(this.state.teams.length / this.state.listPerPage)}
                onPageChange={this.onPageChange}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default AllTeamList
