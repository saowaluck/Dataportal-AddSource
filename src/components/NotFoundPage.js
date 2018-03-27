import React from 'react'

const NotFoundPage = () => (
  <div className='ui main container'>
    <div className='ui huge message'>
      <div className='header'>
        <h1>404 Not Found</h1>
      </div>
      <div className='content'>
        <p>Sorry, you need to<a href='/login'> login </a>with Pronto email.</p>
      </div>
    </div>
  </div>
)
export default NotFoundPage
