import React from 'react'
import PropTypes from 'prop-types'

const ListAllSource = ({ resource }) => (
  <div className='ui row vertical segment'>
    { resource.map(item => (
      <div className='ui segment' key={item.id}>
        <div className='ui row vertical segment' >
          <div className='ui item' >
            <h3 className='ui header'>
              <a href={`/resources/${item.id}/`}>{item.name}</a>
              <div className='ui right floated button disabled'>
                <div className='visible content'>{item.type}</div>
              </div>
            </h3>
          </div>
        </div>
      </div>
    )) }
  </div>
)

ListAllSource.propTypes = {
  resource: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default ListAllSource
