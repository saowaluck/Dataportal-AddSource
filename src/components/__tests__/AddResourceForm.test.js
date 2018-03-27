import React from 'react'
import moxios from 'moxios'
import { shallow } from 'enzyme'
import AddResourceForm from './../AddResourceForm'

describe('<AddResourceForm />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should initial state of type', () => {
    let auth = jest.fn()
    auth = {
      getEmail: () => 'test@pronto.com',
    }
    const wrapper = shallow(<AddResourceForm auth={auth} />)
    wrapper.setState({
      type: ['Database', 'Superset Dashboard', 'Knowledge Post'],
    })
    expect(wrapper.state().type).toEqual(['Database', 'Superset Dashboard', 'Knowledge Post'])
  })

  it('should render form', () => {
    let auth = jest.fn()
    auth = {
      getEmail: () => 'test@pronto.com',
    }
    const wrapper = shallow(<AddResourceForm auth={auth} />)
    const form = wrapper.find('form')

    expect(form.length).toBe(1)
    expect(form.find('Dropdown').length).toBe(1)
  })

  it('should call API properly', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
      }).then(() => {
        expect(request.url).toBe('http://localhost:5000/resources/')
        expect(request.config.method).toBe('post')
      })
    })
  })
})
