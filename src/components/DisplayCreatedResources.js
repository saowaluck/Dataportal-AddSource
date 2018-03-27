import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const DisplayCreatedResources = ({ createds }) => (
  <div className='ui basic segment' >
    <table className='ui very basic large table selectable'>
      <thead>
        <tr>
          <th>Resource</th>
          <th>Type</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody>
        {createds.map(item => (
          <tr key={item.id} >
            <td><a href={`/resources/${item.id}/`}>{item.name}</a></td>
            <td>{item.type}</td>
            <td>{moment(item.updatedDate).format('MMM DD, YYYY')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

DisplayCreatedResources.propTypes = {
  createds: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default DisplayCreatedResources

