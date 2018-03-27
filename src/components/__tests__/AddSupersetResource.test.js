import React from 'react'
import moxios from 'moxios'
import { shallow, mount } from 'enzyme'
import AddSupersetResource from './../AddSupersetResource'

describe('<AddSupersetResource />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should initial of type', () => {
    let auth = jest.fn()
    auth = {
      getName: jest.fn(),
      getEmail: jest.fn(),
      getAvatar: jest.fn(),
    }
    const wrapper = mount(<AddSupersetResource type='Superset Dashboard' auth={auth} />)
    expect(wrapper.props().type).toBe('Superset Dashboard')
  })

  it('should render form', () => {
    let auth = jest.fn()
    auth = {
      getName: jest.fn(),
      getEmail: jest.fn(),
      getAvatar: jest.fn(),
    }
    const wrapper = mount(<AddSupersetResource type='Superset Dashboard' auth={auth} />)
    const form = wrapper.find('form')

    expect(form.length).toBe(1)
    expect(form.find('input[name="name"]').length).toBe(1)
    expect(form.find('input[name="url"]').length).toBe(1)
    expect(form.find('Dropdown[name="tags"]').length).toBe(1)
    expect(form.find('button[type="submit"]').length).toBe(1)
  })

  it('should change state when set data in feilds', () => {
    let auth = jest.fn()
    auth = {
      getName: jest.fn(),
      getEmail: jest.fn(),
      getAvatar: jest.fn(),
    }
    const wrapper = shallow(<AddSupersetResource type='Superset Dashboard' auth={auth} />)

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
    let auth = jest.fn()
    auth = {
      getName: jest.fn(),
      getEmail: jest.fn(),
      getAvatar: jest.fn(),
    }
    const wrapper = shallow(<AddSupersetResource type='Superset Dashboard' auth={auth} />)

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
        expect(request.url).toBe('http://localhost:5000/resources/')
        expect(request.config.method).toBe('post')
        expect(wrapper.state().id).toBe(1780)
        done()
      })
    })
  })
})
