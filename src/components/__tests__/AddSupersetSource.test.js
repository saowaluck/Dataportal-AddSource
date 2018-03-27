import React from 'react'
import moxios from 'moxios'
import { shallow, mount } from 'enzyme'
import AddSupersetSource from './../AddSupersetSource'

describe('<AddSupersetSource />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should initial of type', () => {
    const wrapper = mount(<AddSupersetSource type='Superset Dashboard' />)
    expect(wrapper.props().type).toBe('Superset Dashboard')
  })

  it('should render form', () => {
    const wrapper = mount(<AddSupersetSource type='Superset Dashboard' />)
    const form = wrapper.find('form')

    expect(form.length).toBe(1)
    expect(form.find('input[name="name"]').length).toBe(1)
    expect(form.find('input[name="url"]').length).toBe(1)
    expect(form.find('Dropdown[name="tags"]').length).toBe(1)
    expect(form.find('button[type="submit"]').length).toBe(1)
  })

  it('should change state when set data in feilds', () => {
    const wrapper = shallow(<AddSupersetSource type='Superset Dashboard' />)

    wrapper.setState({
      name: 'Track Reseller',
      url: 'https://www.prontotools.io/',
      tags: 'Athena, Prontoworld',
    })

    expect(wrapper.state().name).toBe('Track Reseller')
    expect(wrapper.state().url).toBe('https://www.prontotools.io/')
    expect(wrapper.state().tags).toBe('Athena, Prontoworld')
  })

  it('should simulates click submit form', (done) => {
    const wrapper = shallow(<AddSupersetSource type='Superset Dashboard' />)

    const preventDefault = jest.fn()
    wrapper.find('form').simulate('submit', { preventDefault })

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          id: 1780,
        },
      }).then(() => {
        expect(preventDefault).toBeCalled()
        expect(wrapper.state().isSubmit).toBeTruthy()
        expect(request.url).toBe('http://localhost:5000/source/')
        expect(request.config.method).toBe('post')
        expect(wrapper.state().id).toBe(1780)
        done()
      })
    })
  })
})