import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Tab, Icon } from 'semantic-ui-react'
import MemberList from './MemberList'
import ListResourceByCreated from './ListResourceByCreated'

class TeamProfile extends Component {
  state = {
    name: '',
    description: '',
    members: [],
    actionsDisplay: false,
  }

  componentDidMount() {
    const id = +this.props.match.params.id
    const email = this.props.auth.getEmail()
    const path = `${process.env.REACT_APP_API_URL}/teams/${id}/?memberEmail=${email}`
    axios
      .get(path)
      .then(team => {
        this.setState({
          name: team.data.team.name,
          description: team.data.team.description,
          members: team.data.members,
          actionsDisplay: team.data.isRelationTeam,
        })
      })
      .catch(() => {
      })
  }

  handleJoin = () => {
    const { id } = this.props.match.params
    const path = `${process.env.REACT_APP_API_URL}/teams/${id}/join/`
    axios
      .post(path, {
        memberEmail: this.props.auth.getEmail(),
      })
  }

  handleLeave = () => {
    const { id } = this.props.match.params
    const path = `${process.env.REACT_APP_API_URL}/teams/${id}/leave/`
    axios
      .post(path, {
        memberEmail: this.props.auth.getEmail(),
      })
  }

  panes = () => (
    [
      { menuItem: 'Pinned', render: () => <ListResourceByCreated id={this.props.match.params.id} actionsDisplay={this.state.actionsDisplay} /> },
      { menuItem: 'Members', render: () => <MemberList members={this.state.members} /> },
    ]
  )

  render() {
    return (
      <div className='ui container grid segment'>
        <div className='ui five wide column'>
          <div className='ui basic row segment'>
            <div className='ui header'>
              <h1>{this.state.name}</h1>
            </div>
            <div className='sub header'>
              {this.state.description}
            </div>
          </div>
          <div className='ui basic row segment'>
            <div className='ui header'>
              <h1>Members</h1>
              <div className='ui img'>
                { this.state.members.slice(0, 5).map(member =>
                  <img key={member.id} className='ui mini avatar image' src={member.avatar} alt='' />)}
                {this.state.members.length > 5 && `+${this.state.members.length - 5} more`
                }
              </div>
            </div>
          </div>
          <div className='ui basic row segment'>
            <div className='ui header'>
              <h1>Actions</h1>
              <div className='ui item'>
                { this.state.actionsDisplay ?
                  <a href={`/teams/${this.props.match.params.id}/leave/`}>
                    <Icon.Group onClick={this.handleLeave}>
                      <Icon name='external share' />Leave group
                    </Icon.Group>
                  </a> :
                  <a href={`/teams/${this.props.match.params.id}/join`}>
                    <Icon.Group onClick={this.handleJoin}>
                      <Icon name='user plus' />Join group
                    </Icon.Group>
                  </a>
                }
              </div>
            </div>
          </div>
        </div>
        <div className='ui eleven wide column'>
          <div className='ui row'>
            <Tab menu={{ secondary: true, pointing: true }} panes={this.panes()} />
          </div>
        </div>
      </div>
    )
  }
}

TeamProfile.propTypes = {
  id: PropTypes.number.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  auth: PropTypes.objectOf(PropTypes.func).isRequired,
}

export default TeamProfile
