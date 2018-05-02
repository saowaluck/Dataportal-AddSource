import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Favorites from './Favorite'
import DisplayFavorite from './DisplayFavorite'
import ConsumerList from './ConsumerList'

class DisplayResourceDetail extends Component {
  handleIcon = type => {
    if (type === 'Database') {
      return 'database icon'
    } else if (type === 'Superset Dashboard') {
      return 'chart bar outline icon'
    } return 'wpforms icon'
  }

  render() {
    return (
      <div className='ui main container'>
        <div className='ui stackable grid'>
          <div className='eleven wide column'>
            <div className='ui segment'>
              <iframe
                src={this.props.data.url}
                title={this.props.data.name}
                frame-ancestors='none'
                width='100%'
                height='580px'
              />
            </div>
          </div>
          <div className='five wide column'>
            <div className='ui segment'>
              <h3 className='ui header'>{this.props.data.name}
                {
                  <Favorites
                    id={this.props.data.id}
                    memberEmail={this.props.data.auth.getEmail()}
                    creatorEmail={this.props.data.creator.email}
                  />}
              </h3>
              <span className='meta'>
                <i className='tags large icon' />
                {this.props.data.tags.map(tag => <span key={tag} className='ui left floated label'>{tag}</span>)}
              </span>
              <h5>{(this.props.data.auth.getEmail() === this.props.data.creator.email) &&
                <a href={`/resources/${this.props.data.id}/edit/`}>
                  <i className='edit icon' />Edit resource
                </a>
                }
              </h5>
              <hr />
              <div className='ui list meta'>
                <div className='item'>
                  <img className='ui mini circular image' src={this.props.data.creator.avatar} alt='' />
                  <div className='content'>
                    <a href={`/members/${this.props.data.creator.id}/`}>
                      <div className='ui sub header'>
                        {this.props.data.creator.name}
                      </div>
                    </a>
                    {this.props.data.creator.position}
                  </div>
                </div>
                <div className='item'>
                  <b>Created:</b> {moment(new Date(this.props.data.createdDate)).format('MMM DD, YYYY')}
                </div>
                <div className='item'>
                  <a href={this.props.data.url}>
                    <i className='external share icon' /> View Original
                  </a>
                </div>
                <DisplayFavorite id={this.props.data.creator.id} />
                <ConsumerList id={this.props.data.id} />
              </div>
              <div className='ui row vertical segment'>
                <h4 className='ui header'>
                  <b>Related Content</b>
                </h4>
                <div className='ui middle aligned divided list'>
                  {this.props.data.relatedResources.map(item => (
                    <div className='item' key={item.id}>
                      <div className='header'>
                        <a className='content' href={`/resources/${item.id}/`}>
                          { item.name.length > 40
                            ? `${item.name.substring(0, 40)}...`
                            : item.name
                          }
                        </a>
                        <span className='ui mini right floated' ><i className={this.handleIcon(item.type)} /></span>
                      </div>
                    </div>
                  ))}
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
  data: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default DisplayResourceDetail
