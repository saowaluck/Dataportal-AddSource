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
                <a href='/'>{this.props.name}</a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DisplayDatabaseSource.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
}

export default DisplayDatabaseSource
