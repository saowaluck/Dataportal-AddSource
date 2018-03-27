import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'
import axios from 'axios'
import DisplayListOfMemberFavoriteResource from './DisplayListOfMemberFavoriteResource'

class DisplayDatabaseResource extends Component {
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
      .then(res => {
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

  convertTable = () => {
    const data = this.props.columns
      .map(row => (
        <tr key={row}>
          {row.split(',').map(column => (
            <td key={column}>{column}</td>
          ))}
        </tr>
      ))
    return data
  }

  convertTags = () => this.props.tags.map(tag => (<span key={tag} className='ui left floated label'>{tag}</span>))

  handleFavorite = () => {
    const { id } = this.props
    const path = `${process.env.REACT_APP_API_URL}/resources/${id}/favorites/`
    axios
      .post(path, {
        memberEmail: this.props.auth.getEmail(),
      })
      .then(res => {
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
            <h2 className='ui dividing header'>Columns Details</h2>
            <table className='ui very basic table segment'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {this.convertTable()}
              </tbody>
            </table>
          </div>
          <div className='five wide column'>
            <div className='ui segment'>
              <h3 className='ui header'>{ this.props.name }
                <a href={`/resources/${this.props.id}/edit/`}>
                  {' '}<i className='edit icon' />
                </a>
              </h3>
              <div className='meta'>
                {this.props.tags.map(tag => <span key={tag} className='ui left floated label'>{tag}</span>)}
                <Icon onClick={this.handleFavorite} className={this.state.activeClassName} />
              </div>
              <p>{this.props.description}</p>
              <hr />
              <div className='ui list meta'>
                <div className='item'>
                  <img className='ui mini circular image' src={this.props.creator.avatar} alt='' />
                  <div className='content'>
                    <a href={`/members/${this.props.creator.id}/`}>
                      <h3>
                        <div className='ui sub header'>
                          {this.props.creator.name}
                        </div>
                      </h3>
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

DisplayDatabaseResource.propTypes = {
  id: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  creator: PropTypes.objectOf(PropTypes.any).isRequired,
  relatedResources: PropTypes.arrayOf(PropTypes.any).isRequired,
  auth: PropTypes.objectOf(PropTypes.func).isRequired,
}

export default DisplayDatabaseResource
