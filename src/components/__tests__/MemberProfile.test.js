import React from 'react'
import moxios from 'moxios'
import { shallow, mount } from 'enzyme'
import MemberProfile from './../MemberProfile'

describe('<MemberProfile />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should display member profile', () => {
    const match = {
      params: { id: 0 },
    }
    const name = 'kanokwan'
    const position = 'Intern'
    const email = 'kmk@protomarketing.com'
    const slack = 'pang_kmk'
    const createds = [{
      id: 112,
      name: 'account',
      type: 'Database',
      updatedDate: '2018-03-05T08:39:24+00:00',
    }]
    const teams = [{
      id: 118,
      name: 'Dataprotal',
      description: 'Open Data',
    }]

    const wrapper = shallow(<MemberProfile
      name={name}
      position={position}
      email={email}
      slack={slack}
      createds={createds}
      teams={teams}
      match={match}
    />)
    wrapper.setState({
      name,
      position,
      email,
      slack,
      createds,
      teams,
    })
    expect(wrapper.state().name).toBe('kanokwan')
    expect(wrapper.state().position).toBe('Intern')
    expect(wrapper.state().email).toBe('kmk@protomarketing.com')
    expect(wrapper.state().slack).toBe('pang_kmk')
    expect(wrapper.state().createds).toEqual([{
      id: 112, name: 'account', type: 'Database', updatedDate: '2018-03-05T08:39:24+00:00',
    }])
    expect(wrapper.state().teams).toEqual([{ id: 118, name: 'Dataprotal', description: 'Open Data' }])
    const expected = ('<div class="ui main container"><div class="ui stackable grid segment"><div class="ui four wide column">' +
    '<div class="ui row basic segment aligned page"><img class="ui small circular image" src="" alt=""/>' +
    '<h2 class="ui header">kanokwan<div class="ui sub header">Intern</div></h2></div><div class="ui row medium basic segment">' +
    '<h3 class="ui header aligned">Find me at</h3><div class="ui list"><div class="item"><i class="envelope outline blue icon"></i>kmk@protomarketing.com</div>' +
    '<div class="item"><i class="slack hash icon blue icon"></i>pang_kmk</div></div></div></div><div class="ui twelve wide column"><div class="ui row">' +
    '<div><div class="ui pointing secondary menu"><a class="active item">Created</a><a class="item">Favorites</a><a class="item">Teams</a></div>' +
    '<div class="ui basic segment"><table class="ui very basic large table selectable"><thead><tr><th>Resource</th><th>Type</th><th>Updated</th></tr></thead>' +
    '<tbody><tr><td><a href="/resources/112/">account</a></td><td>Database</td><td>Mar 05, 2018</td></tr></tbody></table></div></div></div></div></div></div>')
    expect(wrapper.html()).toEqual(expected)
  })

  it('should set state of team when call API properly', (done) => {
    const match = {
      params: { id: 0 },
    }
    const wrapper = mount(<MemberProfile match={match} />)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          member: {
            id: 105,
            name: 'kanokwan',
            position: 'intern',
            email: 'kmk@g.com',
            slack: 'pang',
          },
          createds: [
            {
              id: 112,
              name: 'account',
              type: 'Database',
              updatedDate: '2018-03-05T08:39:24+00:00',
            },
          ],
          teams: [
            {
              id: 118,
              name: 'Dataprotal',
              description: 'Open Data',
            },
          ],
        },
      }).then(() => {
        expect(request.url).toBe('http://localhost:5000/members/0/')
        expect(request.config.method).toBe('get')
        expect(wrapper.state().name).toBe('kanokwan')
        expect(wrapper.state().createds).toEqual([{
          id: 112, name: 'account', type: 'Database', updatedDate: '2018-03-05T08:39:24+00:00',
        }])
        expect(wrapper.state().teams).toEqual([{ id: 118, name: 'Dataprotal', description: 'Open Data' }])
        done()
      })
    })
  })
})
