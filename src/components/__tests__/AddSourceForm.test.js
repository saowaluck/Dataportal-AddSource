import React from 'react'
import moxios from 'moxios'
import { shallow } from 'enzyme'
import AddSourceForm from './../AddSourceForm'

describe('<AddSourceForm />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should initial state of type', () => {
    const wrapper = shallow(<AddSourceForm />)
    wrapper.setState({
      type: ['Database', 'Superset Dashboard', 'Knowledge Post'],
    })
    expect(wrapper.state().type).toEqual(['Database', 'Superset Dashboard', 'Knowledge Post'])
  })

  it('should render form', () => {
    const wrapper = shallow(<AddSourceForm />)
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
        expect(request.url).toBe('http://localhost:5000/source/')
        expect(request.config.method).toBe('post')
      })
    })
  })
})
