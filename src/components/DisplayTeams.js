import React, { Component } from 'react'
import axios from 'axios'
import { Pagination } from 'semantic-ui-react'
import ModalAddTeam from './ModalAddTeam'
import ModalEditTeam from './ModalEditTeam'
import DeleteTeam from './DeleteTeam'

class DisplayTeams extends Component {
  state = {
    teams: [{
      team: [],
      members: [{
        id: '',
        name: '',
        avatar: '',
      }],
    }],
    beginList: 0,
    endList: 7,
    activePage: 1,
    listPerPage: 7,
  }

  componentDidMount() {
    const path = `${process.env.REACT_APP_API_URL}/teams/`
    axios
      .get(path)
      .then(result => {
        this.setState({
          teams: result.data,
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
    if (e.key === 'Enter' && this.state.searchText.trim() !== '') {
      e.preventDefault()
      axios.get(`${process.env.REACT_APP_API_URL}/teams/search/${this.state.searchText}`)
        .then((res) => {
          console.log(res.data)
          this.setState({ teams: res.data })
        })
    }
  }

  render() {
    return (
      <div className='ui main container'>
        <div className='ui segment'>
          <div className='ui eleven wide column'>
            <div className='ui basic row segment' >
              <ModalAddTeam />
            </div>
            <div className='ui basic row segment' >
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
            </div>
            <div className='ui basic row segment'>
              <table className='ui very basic large table selectable'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Member</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.teams.slice(this.state.beginList, this.state.endList).map(item => (
                    <tr key={item.team.id} >
                      <td><a href={`/teams/${item.team.id}/`}>{item.team.name}</a></td>
                      <td>{item.team.description}</td>
                      <td>
                        {item.members.length > 0 ? (item.members.map(member => (
                          <a href={`member/${member.id}`}>
                            <img className='ui avatar image' src={member.avatar} alt='logo' />
                          </a>
                      ))) : 'Not have member'}
                      </td>
                      <td>
                        <div className='ui labeled button'>
                          <ModalEditTeam id={item.team.id} email='pop@prontomarketing.com' />
                          <DeleteTeam id={item.team.id} />
                        </div>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
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
        </div>
      </div>
    )
  }
}

export default DisplayTeams
