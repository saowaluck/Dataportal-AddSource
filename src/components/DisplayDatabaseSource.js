import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DisplayDatabaseSource extends Component {
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
              <h3 className='ui header'>
                {this.props.name}
                <a href={`/resources/edit/${this.props.id}/`}>
                  &nbsp;<i className='edit icon' />
                </a>
              </h3>
              {this.convertTags()}
              <div className='ui row vertical segment'>
                <div className='ui list meta'>
                  <p>{this.props.description}</p>
                  <b>created : </b>{this.props.createdDate}
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DisplayDatabaseSource.propTypes = {
  id: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default DisplayDatabaseSource
