import React from 'react'
import PropTypes from 'prop-types'

const DisplaySourceDetail = ({
  name, createdDate, url, tags,
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
          <h3 className='ui header'>{ name }
            <a href='/'>
              &nbsp;<i className='edit icon' />
            </a>
          </h3>
          <div className='meta'>
            {tags.map(tag => <span key={tag} className='ui left floated label'>{tag}</span>)}
          </div>
          <div className='ui row vertical segment'>
            <div className='ui list meta'>
              <div className='item' />
              <b>created</b>{createdDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

DisplaySourceDetail.propTypes = {
  name: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default DisplaySourceDetail

