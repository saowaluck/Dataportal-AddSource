import React from 'react'
import PropTypes from 'prop-types'

const DisplaySourceDetail = ({ url, name }) => (
  <div className='ui main container'>
    <div className='ui stackable grid'>
      <div className='eleven wide column'>
        <div className='ui segment'>
          <iframe
            src={url}
            title={name}
            frame-ancestors='none'
            width='100%'
            height='580px'
          />
        </div>
      </div>
      <div className='five wide column'>
        <div className='ui segment'>
          <h2 className='ui header'>{name}</h2>
        </div>
      </div>
    </div>
  </div>
)

DisplaySourceDetail.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default DisplaySourceDetail

