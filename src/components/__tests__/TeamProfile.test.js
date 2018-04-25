import React from 'react'
import moxios from 'moxios'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import TeamProfile from './../TeamProfile'

const mockStore = configureMockStore([thunk])
const storeStateMock = {
  thisResourceByTeam: {
    resourceByCreated: [
      {
        createdResource: {
          id: '0',
          name: 'test',
          type: 'Database',
          url: '',
        },
        isPinned: true,
      },
    ],
    pinnedResources: [
      {
        id: '1',
        name: 'test pin',
        type: 'Knowlege post',
        url: 'www.prontotools.io',
      },
    ],
  },
}
const store = mockStore(storeStateMock)

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
    const thisResourceByTeam = {
      resourceByCreated: [
        {
          createdResource: {
            id: '0',
            name: 'test',
            type: 'Database',
            url: '',
          },
          isPinned: true,
        },
      ],
      pinnedResources: [
        {
          id: '1',
          name: 'test pin',
          type: 'Knowlege post',
          url: 'www.prontotools.io',
        },
      ],
    }
    const actionsDisplay = true
    const component = (<TeamProfile
      id={0}
      match={match}
      auth={auth}
      thisResourceByTeam={thisResourceByTeam}
      actionsDisplay={actionsDisplay}
    />)
    const wrapper = mount(<Provider store={store} >{component}</Provider>)
    wrapper.setState({
      match,
      auth,
      name,
      description,
      members,
    })
    expect(wrapper.state().name).toBe('Simpleset')
    expect(wrapper.state().description).toBe('The best satisfaction system')
    const expected = '<div class="ui container grid segment"><div class="ui five wide column"><div class="ui basic row segment">' +
    '<div class="ui header"><h1></h1></div><div class="sub header"></div></div><div class="ui basic row segment">' +
    '<div class="ui header"><h1>Members</h1><div class="ui img"></div></div></div><div class="ui basic row segment">' +
    '<div class="ui header"><h1>Actions</h1><div class="ui item"><a href="/teams/10/join"><i class="icons">' +
    '<i aria-hidden="true" class="user plus icon"></i>Join group</i></a></div></div></div></div><div class="ui eleven wide column">' +
    '<div class="ui row"><div><div class="ui pointing secondary menu"><a class="active item">Pinned</a>' +
    '<a class="item">Members</a></div><div class="ui row vertical segment"><div class="ui three cards link">' +
    '<div class="ui fluid card"><iframe src="www.prontotools.io" frame-ancestors="none" width="100%" ' +
    'height="170px" frameborder="0" title="test pin"></iframe><div class="content"><div class="meta">' +
    '<span class="ui knowledge label">Knowlege post</span></div><div class="header">' +
    '<a href="/resources/1/"><h3>test pin</h3></a></div></div></div></div><div class="ui row vertical segment">' +
    '<div class="ui basic accordion"><div class="accordion ui"><div class="ui divider item"></div>' +
    '<div class="title"><div class="active title"><h3 class="ui header">All Resources<i position="right" class="icons">' +
    '<i aria-hidden="true" class="angle down icon"></i></i></h3></div><div class="content active">' +
    '<div class="ui three cards link"><div class="ui fluid card"><div class="content"><div class="meta">' +
    '<span class="ui database label">Database</span></div><div class="header"><a href="/resources/0/">' +
    '<h3>test</h3></a></div></div></div></div></div><div class="ui divider item"></div></div></div></div>' +
    '</div></div></div></div></div></div>'
    expect(wrapper.html()).toEqual(expected)
  })
})
