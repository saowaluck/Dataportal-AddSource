import React from 'react'
import moxios from 'moxios'
import { shallow, mount } from 'enzyme'
import AddKnowledgePostSource from './../AddKnowledgePostSource'

describe('<AddKnowledgePostSource />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should initial of type', () => {
    const wrapper = mount(<AddKnowledgePostSource type='Knowledge Post' />)
    expect(wrapper.props().type).toBe('Knowledge Post')
  })

  it('should render form', () => {
    const wrapper = shallow(<AddKnowledgePostSource type='Knowledge Post' />)
    const form = wrapper.find('form')

    expect(form.length).toBe(1)
    expect(form.find('input[name="name"]').length).toBe(1)
    expect(form.find('input[name="url"]').length).toBe(1)
    expect(form.find('Dropdown[name="tags"]').length).toBe(1)
    expect(form.find('button[type="submit"]').length).toBe(1)
  })

  it('should change state when set data in feilds', () => {
    const wrapper = shallow(<AddKnowledgePostSource type='Knowledge Post' />)

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
    const wrapper = shallow(<AddKnowledgePostSource type='' />)

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
        expect(request.url).toBe('http://localhost:5000/source/')
        expect(request.config.method).toBe('post')
        expect(wrapper.state().id).toBe(1800)
        done()
      })
    })
  })
})
