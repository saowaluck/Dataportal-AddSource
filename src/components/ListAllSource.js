import React from 'react'
import PropTypes from 'prop-types'

const ListAllSource = ({ resource }) => (
  <div className='ui main container'>
    <div className='ui stackable grid'>
      <div className='eleven wide column'>
        {resource.map(item =>
          (
            <div className='ui segment' key={item.id}>
              <div className='ui row vertical segment'>
                <div className='ui item'>
                  <h3 className='ui header'>
                    <a href={`/DisplaySourceDetail/${item.id}/`}>{item.name}</a>
                    <div className='ui right floated button disabled'>
                      <div className='visible content'>{item.type}</div>
                    </div>
                  </h3>
                  <br />
                  <p>
                    <span><a href='member'><i className='spy icon people' />{item.creator}</a></span>
                    <span><i className='wait icon' />{item.dateofCreate}</span>
                    <span><i className='history icon' />{item.dateofUpdate}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
)

ListAllSource.propTypes = {
  resource: PropTypes.array.isRequired,
}

export default ListAllSource
