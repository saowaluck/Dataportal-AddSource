import React from 'react'
import moxios from 'moxios'
import { shallow, mount } from 'enzyme'
import TeamProfile from './../TeamProfile'

describe('<TeamProfile />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should display detail of team when change state', () => {
    const match = {
      params: { id: 10 },
    }
    let auth = jest.fn()
    auth = {
      getEmail: () => 'TestEmail@prontomarketing.com',
    }
    const name = 'Simpleset'
    const description = 'The best satisfaction system'
    const members = [
      {
        id: 53,
        name: 'thanisorn',
        position: 'Intern',
        email: 'thanisorn@prontomarketing.com',
        slack: 'bibw',
        avatar: 'photo.jpg',
      },
    ]
    const wrapper = shallow(<TeamProfile
      id={0}
      match={match}
      auth={auth}
    />)
    wrapper.setState({
      match,
      auth,
      name,
      description,
      members,
    })
    expect(wrapper.state().name).toBe('Simpleset')
    expect(wrapper.state().description).toBe('The best satisfaction system')
    const expected = ('<div class="ui container grid segment"><div class="ui five wide column"><div class="ui basic row segment">' +
    '<div class="ui header"><h1>Simpleset</h1></div><div class="sub header">The best satisfaction system</div></div><div class="ui basic row segment">' +
    '<div class="ui header"><h1>Members</h1><div class="ui img"><img class="ui mini avatar image" src="photo.jpg" alt=""/></div></div></div>' +
    '<div class="ui basic row segment"><div class="ui header"><h1>Actions</h1><div class="ui item"><a href="/teams/10/join"><i class="icons">' +
    '<i aria-hidden="true" class="user plus icon"></i>Join group</i></a></div></div></div></div><div class="ui eleven wide column"><div class="ui row">' +
    '<div><div class="ui pointing secondary menu"><a class="active item">Members</a></div><div class="ui basic segment"><div class="ui five column grid">' +
    '<div class="column"><div class="ui fluid card"><img class="ui image" src="photo.jpg" alt=""/><div class="content"><a href="/members/53/">' +
    '<h3 class="header">thanisorn</h3></a></div></div></div></div></div></div></div></div></div>')
    expect(wrapper.html()).toEqual(expected)
  })

  it('should set state of team when call API properly', (done) => {
    const match = {
      params: { id: 10 },
    }
    let auth = jest.fn()
    auth = {
      getEmail: () => 'TestEmail@prontomarketing.com',
    }
    const wrapper = mount(<TeamProfile
      id={0}
      match={match}
      auth={auth}
    />)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          team: {
            name: 'data-swarm',
            description: 'Making Data Science at Ease at Pronto!',
          },
          members: [
            {
              id: 119,
              name: 'Thanisorn',
              position: 'intern',
              email: 'thanisorn@prontomarketing.com',
              slack: 'bibiw',
              avatar: 'photoBibiw.jpg',
            },
          ],
        },
      }).then(() => {
        expect(request.url).toBe('http://localhost:5000/teams/10/?memberEmail=TestEmail@prontomarketing.com')
        expect(request.config.method).toBe('get')
        expect(wrapper.state().name).toBe('data-swarm')
        expect(wrapper.state().description).toBe('Making Data Science at Ease at Pronto!')
        expect(wrapper.state().members).toEqual([{
          id: 119, name: 'Thanisorn', position: 'intern', email: 'thanisorn@prontomarketing.com', slack: 'bibiw', avatar: 'photoBibiw.jpg',
        }])
        done()
      })
    })
  })
})
