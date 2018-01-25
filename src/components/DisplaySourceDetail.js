import React from 'react'
import PropTypes from 'prop-types'

const DisplaySourceDetail = ({
  url, name, tag, dateofCreate, creator,
}) => (
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
          <div className='meta'>
            {tag.split(',').map(item => <span key={item.id} className='ui left floated label'>{item}</span>)}
          </div>
          <div className='ui list meta'>
            <div className='item'>
              <i className='user circle outline big icon' />
              <div className='content'>
                <div className='ui sub header'>{creator}</div>
              </div>
            </div>
            <b>created</b> {dateofCreate}
          </div>

        </div>
      </div>
    </div>
  </div>
)

DisplaySourceDetail.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  dateofCreate: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
}

export default DisplaySourceDetail

