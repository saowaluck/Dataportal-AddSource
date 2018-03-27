import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import axios from 'axios'
import DisplayCreatedResources from './DisplayCreatedResources'
import FavoriteList from './FavoriteList'
import TeamList from './TeamList'

class MemberProfile extends Component {
  state = {
    name: '',
    position: '',
    email: '',
    slack: '',
    createds: [],
    teams: [],
    favorites: [],
    avatar: '',
  }

  componentDidMount() {
    const id = +this.props.match.params.id
    const path = `${process.env.REACT_APP_API_URL}/members/${id}/`
    axios
      .get(path)
      .then(result => {
        const {
          name, position, email, slack, avatar,
        } = result.data.member
        this.setState({
          name, position, email, slack, avatar,
        })
        this.setState({
          createds: result.data.createds,
          teams: result.data.teams,
          favorites: result.data.favorites,
        })
      })
      .catch(() => {
      })
  }

  panes = () => (
    [
      { menuItem: 'Created', render: () => <DisplayCreatedResources createds={this.state.createds} /> },
      { menuItem: 'Favorites', render: () => <FavoriteList favorites={this.state.favorites} /> },
      { menuItem: 'Teams', render: () => <TeamList teams={this.state.teams} /> },
    ]
  )

  render() {
    return (
      <div className='ui main container'>
        <div className='ui stackable grid segment'>
          <div className='ui four wide column'>
            <div className='ui row basic segment aligned page'>
              <img className='ui small circular image' src={this.state.avatar} alt='' />
              <h2 className='ui header'>{this.state.name}
                <div className='ui sub header'>{this.state.position}</div>
              </h2>
            </div>
            <div className='ui row medium basic segment'>
              <h3 className='ui header aligned'>Find me at</h3>
              <div className='ui list'>
                <div className='item'>
                  <i className='envelope outline blue icon' />
                  {this.state.email}
                </div>
                <div className='item'>
                  <i className='slack hash icon blue icon' />
                  {this.state.slack}
                </div>
              </div>
            </div>
          </div>
          <div className='ui twelve wide column'>
            <div className='ui row'>
              <Tab menu={{ secondary: true, pointing: true }} panes={this.panes()} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

MemberProfile.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default MemberProfile
