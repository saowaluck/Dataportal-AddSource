import React from 'react'
import moxios from 'moxios'
import { shallow } from 'enzyme'
import EditProfile from './../EditProfile'

describe('<EditProfile />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should render edit form', () => {
    let auth = jest.fn()
    auth = {
      getEmail: () => 'test@pronto.com',
    }
    const wrapper = shallow(<EditProfile auth={auth} />)
    const form = wrapper.find('form')

    expect(form.length).toBe(1)
    expect(form.find('input[name="position"]').length).toBe(1)
    expect(form.find('input[name="slack"]').length).toBe(1)
  })

  it('should simulates click submit form when edit resource type Knowledge Post in fields', (done) => {
    let auth = jest.fn()
    auth = {
      getEmail: () => 'test@pronto.com',
    }
    const wrapper = shallow(<EditProfile auth={auth} />)
    const preventDefault = jest.fn()

    wrapper.find('form').simulate('submit', { preventDefault })
    wrapper.setState({
      id: 129,
      name: 'kanokwan meekaew',
      position: 'intern',
      slack: 'kmk',
    })

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          identity: {
            low: 129,
            high: 0,
          },
          properties: {
            id: 129,
            name: 'kanokwan meekaew',
            position: 'intern',
            slack: 'kmk',
          },
        },
      }).then(() => {
        expect(preventDefault).toBeCalled()
        expect(wrapper.state().isSubmit).toBeTruthy()
        expect(request.config.method).toBe('post')
        expect(wrapper.state().name).toBe('kanokwan meekaew')
        expect(wrapper.state().position).toBe('intern')
        expect(wrapper.state().slack).toBe('kmk')
        const expected = ('<div class="ui main container"><div class="ui stackable grid segment">' +
        '<div class="ui four wide column"><div class="ui row basic segment aligned page">' +
        '<img class="ui small circular image" src="" alt=""/><h2 class="ui header">kanokwan meekaew</h2>' +
        '<div class="item"><i class="envelope outline blue icon"></i></div></div></div>' +
        '<div class="ui twelve wide column"><h2>Edit Profile</h2><form class="ui form">' +
        '<div class="field"><label for="url">Position<input type="text" name="position" placeholder="position" value="intern"/>' +
        '</label></div><div class="field"><label for="slack">Slack<input type="text" name="slack" placeholder="Slack" value="kmk"/>' +
        '</label></div><hr/><button class="ui primary button" type="submit">Update profile</button></form></div></div></div>')
        expect(wrapper.html()).toEqual(expected)
        done()
      })
    })
  })
})
