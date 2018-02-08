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
    const wrapper = shallow(<AddSupersetSource type='' />)
    const form = wrapper.find('form')

    expect(form.length).toBe(1)
    expect(form.find('input[name="name"]').length).toBe(1)
    expect(form.find('input[name="url"]').length).toBe(1)
    expect(form.find('input[name="tag"]').length).toBe(1)
    expect(form.find('button[type="submit"]').length).toBe(1)
  })

  it('should change state when set data in feilds', () => {
    const wrapper = shallow(<AddSupersetSource type='' />)

    wrapper.setState({
      name: 'Track Reseller',
      url: 'https://www.prontotools.io/',
      tag: 'Athena',
    })

    expect(wrapper.state().name).toBe('Track Reseller')
    expect(wrapper.state().url).toBe('https://www.prontotools.io/')
    expect(wrapper.state().tag).toBe('Athena')
  })

  it('should simulates click submit form', (done) => {
    const wrapper = shallow(<AddSupersetSource type='' />)

    const preventDefault = jest.fn()
    wrapper.find('form').simulate('submit', { preventDefault })
    wrapper.setState({
      name: 'Track Reseller',
      url: 'https://www.prontotools.io/',
      tag: 'Athena',
    })

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          identity: {
            low: 756,
            high: 0,
          },
          labels: ['Type', 'Source'],
          properties: {
            name: 'Track Reseller',
            url: 'https://www.prontotools.io/',
            tag: 'Athena',
            type: 'Superset Dashboard',
          },
        },
      }).then(() => {
        expect(preventDefault).toBeCalled()
        expect(wrapper.state().isSubmit).toBeTruthy()
        expect(request.url).toBe('http://localhost:5000/source/')
        expect(request.config.method).toBe('post')
        expect(wrapper.state().name).toBe('Track Reseller')
        expect(wrapper.state().url).toBe('https://www.prontotools.io/')
        expect(wrapper.state().tag).toBe('Athena')
        done()
      })
    })
  })
})
