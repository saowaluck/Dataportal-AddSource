import React from 'react'
import PropTypes from 'prop-types'

const MemberList = ({ members }) => (
  <div className='ui basic segment'>
    <div className='ui five column grid'>
      {members.map(item => (
        <div key={item.id} className='column'>
          <div className='ui fluid card'>
            <img
              className='ui image'
              src={item.avatar}
              alt=''
            />
            <div className='content'>
              <a href={`/members/${item.id}/`}>
                <h3 className='header'>{item.name}</h3>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

MemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default MemberList

