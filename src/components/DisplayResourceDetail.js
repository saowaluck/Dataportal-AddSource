import React from 'react'
import PropTypes from 'prop-types'
import Favorites from './Favorite'
import DisplayFavorite from './DisplayFavorite'

const DisplayResourceDetail = ({ data }) => (
  <div className='ui main container'>
    <div className='ui stackable grid'>
      <div className='eleven wide column'>
        <div className='ui segment'>
          <iframe
            src={data.url}
            title={data.name}
            frame-ancestors='none'
            width='100%'
            height='580px'
          />
        </div>
      </div>
      <div className='five wide column'>
        <div className='ui segment'>
          <h3 className='ui header'>{data.name}
            {(data.auth.getEmail() === data.creator.email) &&
            <a href={`/resources/${data.id}/edit/`}>
              <i className='edit icon' />
            </a>
          }
          </h3>
          <div className='meta'>
            {data.tags.map(tag => <span key={tag} className='ui left floated label'>{tag}</span>)}
            <Favorites id={data.id} memberEmail={data.auth.getEmail()} />
          </div>
          <hr />
          <div className='ui list meta'>
            <div className='item'>
              <img className='ui mini circular image' src={data.creator.avatar} alt='' />
              <div className='content'>
                <a href={`/members/${data.creator.id}/`}>
                  <div className='ui sub header'>
                    {data.creator.name}
                  </div>
                </a>
                {data.creator.position}
              </div>
            </div>
            <b>Created:</b> {data.createdDate}
            <DisplayFavorite />
          </div>
          <div className='ui row vertical segment'>
            <h4 className='ui header'>
              <b>Related Content</b>
            </h4>
            <div className='ui middle aligned divided list'>
              {data.relatedResources.map(item => (
                <div className='item' key={item.id}>
                  <div className='header'>
                    <a className='content' href={`/resources/${item.id}/`}>{item.name}</a>
                    <span className='ui right floated label'>{item.type}</span>
                  </div>
                </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
DisplayResourceDetail.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default DisplayResourceDetail

