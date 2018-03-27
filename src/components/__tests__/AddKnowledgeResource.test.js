import React from 'react'
import moxios from 'moxios'
import { shallow, mount } from 'enzyme'
import AddKnowledgePostResource from './../AddKnowledgePostResource'

describe('<AddKnowledgePostResource />', () => {
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
    const wrapper = mount(<AddKnowledgePostResource type='Knowledge Post' auth={auth} />)
    expect(wrapper.props().type).toBe('Knowledge Post')
  })

  it('should render form', () => {
    let auth = jest.fn()
    auth = {
      getName: jest.fn(),
      getEmail: jest.fn(),
      getAvatar: jest.fn(),
    }
    const wrapper = shallow(<AddKnowledgePostResource type='Knowledge Post' auth={auth} />)
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
    const wrapper = shallow(<AddKnowledgePostResource type='Knowledge Post' auth={auth} />)

    wrapper.setState({
      name: 'Robot Framework',
      url: 'https://www.prontotools.io/robot-framework-101-มาลองใช้กัน/',
      tags: 'automate_testing, circle_ci',
    })

    expect(wrapper.state().name).toBe('Robot Framework')
    expect(wrapper.state().url).toBe('https://www.prontotools.io/robot-framework-101-มาลองใช้กัน/')
    expect(wrapper.state().tags).toBe('automate_testing, circle_ci')
  })

  it('should simulates click submit form', (done) => {
    let auth = jest.fn()
    auth = {
      getName: jest.fn(),
      getEmail: jest.fn(),
      getAvatar: jest.fn(),
    }
    const wrapper = shallow(<AddKnowledgePostResource type='' auth={auth} />)

    const preventDefault = jest.fn()
    wrapper.find('form').simulate('submit', { preventDefault })

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          id: 1800,
        },
      }).then(() => {
        expect(preventDefault).toBeCalled()
        expect(wrapper.state().isSubmit).toBeTruthy()
        expect(request.url).toBe('http://localhost:5000/resources/')
        expect(request.config.method).toBe('post')
        expect(wrapper.state().id).toBe(1800)
        done()
      })
    })
  })
})
