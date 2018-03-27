import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Favorites from './Favorite'
import DisplayFavorite from './DisplayFavorite'

class DisplayDatabaseDetail extends Component {
  convertTable = () => {
    const data = this.props.data.columns
      .map(row => (
        <tr key={row}>
          {row.split(',').map(column => (
            <td key={column}>{column}</td>
          ))}
        </tr>
      ))
    return data
  }

  convertTags = () => this.props.data.tags.map(tag => (<span key={tag} className='ui left floated label'>{tag}</span>))
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
              <h3 className='ui header'>{ this.props.data.name }
                <a href={`/resources/edit/${this.props.data.id}/`}>
                  {' '}<i className='edit icon' />
                </a>
              </h3>
              <div className='meta'>
                {this.props.data.tags.map(tag => <span key={tag} className='ui left floated label'>{tag}</span>)}
                <Favorites id={this.props.data.id} memberEmail={this.props.data.auth.getEmail()} />
              </div>
              <p>{this.props.data.description}</p>
              <hr />
              <div className='ui list meta'>
                <div className='item'>
                  <img className='ui mini circular image' src={this.props.data.creator.avatar} alt='' />
                  <div className='content'>
                    <a href={`/members/${this.props.data.creator.id}/`}>
                      <h3>
                        <div className='ui sub header'>
                          {this.props.data.creator.name}
                        </div>
                      </h3>
                    </a>
                    {this.props.data.creator.position}
                  </div>
                </div>
                <b>Created:</b> {this.props.data.createdDate}
                <DisplayFavorite />
              </div>
              <div className='ui row vertical segment'>
                <h4 className='ui header'>
                  <b>Related Content</b>
                </h4>
                <div className='ui middle aligned divided list'>
                  {this.props.data.relatedResources.map(item => (
                    <div className='item' key={item.id}>
                      <div className='header'>
                        <a className='content' href={`/resources/${item.id}/`}>{item.name}</a>
                        <span className='ui right floated label'>{item.type}</span>
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

DisplayDatabaseDetail.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default DisplayDatabaseDetail