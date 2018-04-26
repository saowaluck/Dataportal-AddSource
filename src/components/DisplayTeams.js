import React, { Component } from 'react'
import axios from 'axios'
import ModalAddTeam from './ModalAddTeam'

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
                  {this.state.teams.map(item => (
                    <tr key={item.team.id} >
                      <td><a href={`/teams/${item.team.id}/`}>{item.team.name}</a></td>
                      <td>{item.team.description}</td>

                      {item.members.length > 0 ? (item.members.map(member => (
                        <td>
                          <a href={`member/${member.id}`}>
                            <img className='ui avatar image' src={member.avatar} alt='logo' />
                          </a>
                        </td>
                      ))) : <td>Not have member</td>}
                      <td>
                        <a href=''><i className='large pencil alternate icon' /></a>
                        <a href=''><i className='large trash outline icon' /></a>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DisplayTeams
