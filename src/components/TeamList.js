import React from 'react'
import PropTypes from 'prop-types'

const TeamList = ({ teams }) => (
  <div className='ui basic segment'>
    <div className='ui three column grid'>
      {teams.map(item => (
        <div className='column' key={item.id}>
          <div className='ui card'>
            <div className='content'>
              <div className='header'>
                <a href={`/teams/${item.id}/`}>
                  <div className='center aligned'>
                    {item.name}
                  </div>
                </a>
              </div>
            </div>
            <div className='content'>
              <div className='ui small feed'>
                <div className='event'>
                  <div className='content'>
                    <div className='description'>
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    ))}
    </div>
  </div>
)

TeamList.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default TeamList

