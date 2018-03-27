import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const FavoriteList = ({ favorites }) => (
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
        {favorites.map(item => (
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

FavoriteList.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default FavoriteList

