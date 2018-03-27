import React from 'react'
import ReactDOM from 'react-dom'
import App from './../App'
import './../__mocks__/mock-localstorage'

it('renders without crashing', () => {
  const auth = jest.fn()
  const div = document.createElement('div')
  ReactDOM.render(<App auth={auth} />, div)
})
