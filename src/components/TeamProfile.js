import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Tab, Icon, Button, Modal } from 'semantic-ui-react'
import MemberList from './MemberList'
import ListResourceBySelected from './ListResourceBySelected'

class TeamProfile extends Component {
  state = {
    name: '',
    description: '',
    members: [],
    actionsDisplay: false,
    openSelectIn: false,
    resources: [],
    selected: [],
    selectedAll: false,
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
    const url = `${process.env.REACT_APP_API_URL}/members/resources/?memberEmail=${email}`
    axios
      .get(url)
      .then(res => {
        this.setState({
          resources: res.data.resources,
        })
      })
      .catch(() => {
      })
    const getSeletedResource = `${process.env.REACT_APP_API_URL}/teams/${id}/resources/selected/?memberEmail=${email}`
    axios
      .get(getSeletedResource)
      .then(selectedResource => {
        this.setState({
          selectedResourceId: selectedResource.data.map(item => String(item[0].id)),
        })
      })
      .catch(() => {
      })
  }

  handleIcon = type => {
    if (type === 'Database') {
      return 'database icon'
    } else if (type === 'Superset Dashboard') {
      return 'chart bar outline icon'
    } return 'wpforms icon'
  }

  modalSelectIn = () => this.setState({ openSelectIn: true })
  modalSelectManage = () => {
    this.setState({
      openSelectManage: true,
      selected: this.state.selectedResourceId.map(item => item),
    })
  }

  close = () => this.setState({ openSelectIn: false, openSelectManage: false })

  handleManageResource = () => {
    const { id } = this.props.match.params
    const path = `${process.env.REACT_APP_API_URL}/teams/${id}/resources/`
    axios
      .post(path, {
        memberEmail: this.props.auth.getEmail(),
        selectedId: this.state.selected,
      })
      .then(() => {
        this.setState({ openSelectManage: false })
        document.location.reload()
      })
  }

  handleJoin = () => {
    const { id } = this.props.match.params
    const path = `${process.env.REACT_APP_API_URL}/teams/${id}/join/`
    axios
      .post(path, {
        memberEmail: this.props.auth.getEmail(),
        selected: this.state.selected.map(item => Number(item)),
      })
      .then(() => {
        this.setState({ openSelectIn: false })
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

  handleChecked = e => {
    if (this.state.selected.some(element => element === e.target.id)) {
      this.setState({ selected: this.state.selected.filter(element => element !== e.target.id) })
    } else {
      this.setState({ selected: [...this.state.selected, String(e.target.id)] })
    }
  }

  handleSelectAll = () => {
    if (this.state.selectedAll) {
      this.setState({
        selected: [],
        selectedAll: false,
      })
    } else {
      this.setState({
        selected: this.state.resources.map(item => String(item.id)),
        selectedAll: true,
      })
    }
  }

  checkSelect = (id) => {
    if (this.state.selected.some(item => item === String(id))) {
      return true
    } return false
  }

  panes = () => (
    [
      { menuItem: 'Pinned', render: () => <ListResourceBySelected id={this.props.match.params.id} actionsDisplay={this.state.actionsDisplay} /> },
      { menuItem: 'Members', render: () => <MemberList members={this.state.members} /> },
    ]
  )

  render() {
    return (
      <div>
        <Modal dimmer open={this.state.openSelectIn} onClose={this.close}>
          <Modal.Header>Select resource to this team.</Modal.Header>
          <Modal.Content>
            <div className='ui row vertical segment'>
              <p><input type='checkbox' name='checked' onClick={this.handleSelectAll} />Select All</p>
              <div className='ui middle aligned divided list'>
                {this.state.resources.map(item => (
                  <div className='item' key={item.id}>
                    <h3>
                      <input type='checkbox' id={item.id} name='checked' checked={this.checkSelect(item.id)} onClick={this.handleChecked} />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>
                        { item.name.length > 50
                          ? `${item.name.substring(0, 45)}...`
                          : item.name
                        }
                      </span>
                      <span className='ui mini right floated' >
                        <i className={this.handleIcon(item.type)} />
                      </span>
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={this.close}>
              Cancel
            </Button>
            <a href={`/teams/${this.props.match.params.id}/join`}>
              <Button positive icon='checkmark' labelPosition='right' content='Confirm' onClick={this.handleJoin} />
            </a>
          </Modal.Actions>
        </Modal>
        <Modal dimmer open={this.state.openSelectManage} onClose={this.close}>
          <Modal.Header>Select resource to this team.</Modal.Header>
          <Modal.Content>
            <div className='ui row vertical segment'>
              <p><input type='checkbox' name='checked' onClick={this.handleSelectAll} />Select All</p>
              <div className='ui middle aligned divided list'>
                {this.state.resources.map(item => (
                  <div className='item' key={item.id}>
                    <h3>
                      <input type='checkbox' id={item.id} name='checked' checked={this.checkSelect(item.id)} onClick={this.handleChecked} />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>
                        { item.name.length > 50
                          ? `${item.name.substring(0, 45)}...`
                          : item.name
                        }
                      </span>
                      <span className='ui mini right floated' >
                        <i className={this.handleIcon(item.type)} />
                      </span>
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={this.close}>
              Cancel
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content='Confirm' onClick={this.handleManageResource} />
          </Modal.Actions>
        </Modal>
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
                    <span>
                      <p>
                        <a href>
                          <Icon.Group onClick={this.modalSelectManage}>
                            <Icon name='cogs' />Manage resource
                          </Icon.Group>
                        </a>
                      </p>
                      <p>
                        <a href={`/teams/${this.props.match.params.id}/leave/`}>
                          <Icon.Group onClick={this.handleLeave}>
                            <Icon name='external share' />Leave group
                          </Icon.Group>
                        </a>
                      </p>
                    </span> :
                    <a href onClick={this.modalSelectIn}>
                      <Icon.Group>
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
