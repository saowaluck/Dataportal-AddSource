import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'
import axios from 'axios'
import DisplayListOfMemberFavoriteResource from './DisplayListOfMemberFavoriteResource'

class DisplayResourceDetail extends Component {
  state = {
    activeClassName: '',
    members: [],
  }

  componentWillMount() {
    const email = this.props.auth.getEmail()
    const { id } = this.props
    const path = `${process.env.REACT_APP_API_URL}/resources/${id}/favorites/?memberEmail=${email}`
    axios
      .get(path)
      .then((res) => {
        if (res.data.isFavorite) {
          this.setState({
            activeClassName: 'ui large heart icon',
            members: res.data.members,
          })
        } else {
          this.setState({ activeClassName: 'ui large heart outline icon' })
        }
      })
  }

  handleFavorite = () => {
    const { id } = this.props
    const path = `${process.env.REACT_APP_API_URL}/resources/${id}/favorites/`
    axios
      .post(path, {
        memberEmail: this.props.auth.getEmail(),
      })
      .then((res) => {
        if (res.data.isFavorite) {
          this.setState({ activeClassName: 'ui large heart icon' })
        } else {
          this.setState({ activeClassName: 'ui large heart outline icon' })
        }
      })
  }

  render() {
    return (
      <div className='ui main container'>
        <div className='ui stackable grid'>
          <div className='eleven wide column'>
            <div className='ui segment'>
              <iframe
                src={this.props.url}
                title={this.props.name}
                frame-ancestors='none'
                width='100%'
                height='580px'
              />
            </div>
          </div>
          <div className='five wide column'>
            <div className='ui segment'>
              <h3 className='ui header'>{ this.props.name }
                <a href={`/resources/${this.props.id}/edit/`}>
                  &nbsp;<i className='edit icon' />
                </a>
              </h3>
              <div className='meta'>
                {this.props.tags.map(tag => <span key={tag} className='ui left floated label'>{tag}</span>)}
                <Icon onClick={this.handleFavorite} className={this.state.activeClassName} />
              </div>
              <hr />
              <div className='ui list meta'>
                <div className='item'>
                  <img className='ui mini circular image' src={this.props.creator.avatar} alt='' />
                  <div className='content'>
                    <a href={`/members/${this.props.creator.id}/`}>
                      <div className='ui sub header'>
                        {this.props.creator.name}
                      </div>
                    </a>
                    {this.props.creator.position}
                  </div>
                </div>
                <b>Created:</b> {this.props.createdDate}
                <DisplayListOfMemberFavoriteResource members={this.state.members} />
              </div>
              <div className='ui row vertical segment'>
                <h4 className='ui header'>
                  <b>Related Content</b>
                </h4>
                <div className='ui middle aligned divided list'>
                  { this.props.relatedResources.map(item => (
                    <div className='item' key={item.id}>
                      <div className='header'>
                        <a className='content' href={`/resources/${item.id}/`}>{item.name}</a>
                        <span className='ui right floated label'>{item.type}</span>
                      </div>
                    </div>
                  )) }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DisplayResourceDetail.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  creator: PropTypes.objectOf(PropTypes.any).isRequired,
  relatedResources: PropTypes.arrayOf(PropTypes.any).isRequired,
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default DisplayResourceDetail

