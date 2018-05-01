import React, { Component } from 'react'
import axios from 'axios'
import { Pagination } from 'semantic-ui-react'

class AllMemberList extends Component {
  state = {
    members: [],
    searchText: '',
    beginList: 0,
    endList: 20,
    activePage: 1,
    listPerPage: 20,
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_API_URL}/members/all/`
    axios
      .get(url)
      .then((res) => {
        this.setState({
          members: res.data,
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
      axios.get(`${process.env.REACT_APP_API_URL}/members/all/`)
        .then((res) => {
          this.setState({ members: res.data })
        })
    } else if (e.key === 'Enter' && this.state.searchText.trim() !== '') {
      axios.get(`${process.env.REACT_APP_API_URL}/members/search/${this.state.searchText}`)
        .then((res) => {
          this.setState({ members: res.data })
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
          <div className='ui seven column grid'>
            {this.state.members.slice(this.state.beginList, this.state.endList).map(item => (
              <div key={item.id} className='column'>
                <div className='ui fluid card'>
                  <img
                    className='ui image'
                    src={item.avatar}
                    alt=''
                  />
                  <div className='content'>
                    <a href={`/members/${item.id}/`}>
                      <h3 className='header'>{item.name}</h3>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {this.state.members.length !== 0 &&
            <div className='ui center aligned basic segment'>
              <Pagination
                activePage={this.state.activePage}
                totalPages={Math.ceil(this.state.members.length / this.state.listPerPage)}
                onPageChange={this.onPageChange}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default AllMemberList
