import { Button, Confirm } from 'semantic-ui-react'
import React, { Component } from 'react'
import axios from 'axios'

class Team extends Component {
  state = {
    teams: [],
    open: false,
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_API_URL}/team/`
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

  show = () => this.setState({ open: true })
  handleConfirm = () => this.setState({ open: false })
  handleCancel = () => this.setState({ open: false })


  render() {
    return (
      <div className='ui main container'>
        <div className='ui stackable grid'>
          <div className='eleven wide column'>
            <table border='1'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Member</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                { this.state.teams.map((team) => (
                  <tr>
                    <td key={team.id}>{team.name}</td>
                    <td key={team.id}>{team.description}</td>
                    <td>{team.member.map(member => member.name)}</td>
                    <td>
                      <Button negative onClick={this.show}>Delete</Button>
                      <Button onClick={this.show}>Show</Button>

                    </td>
                  </tr>
                  ))
              }
              </tbody>
            </table>
          </div>
        </div>
        <Confirm
          open={this.state.open}
          header='This is a custom header'
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    )
  }
}
export default Team
