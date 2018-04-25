import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ListResourceByCreated from './../ListResourceByCreated'

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

describe('<ListResourceByCreated />', () => {
  it('should display list of resources according to its props', () => {
    const id = 0
    const actionsDisplay = true
    const component = <ListResourceByCreated id={id} actionsDisplay={actionsDisplay} />
    const wrapper = mount(<Provider store={store}>{component}</Provider>)
    const expected = '<div class="ui row vertical segment"><div class="ui three cards link"><div class="ui fluid card">' +
    '<iframe src="www.prontotools.io" frame-ancestors="none" width="100%" height="170px" frameborder="0" title="test pin"></iframe>' +
    '<div class="content"><div class="meta"><span class="ui knowledge label">Knowlege post</span><i class="icons">' +
    '<i class="pin blue icon" id="1"></i></i></div><div class="header"><a href="/resources/1/"><h3>test pin</h3>' +
    '</a></div></div></div></div><div class="ui row vertical segment"><div class="ui basic accordion">' +
    '<div class="accordion ui"><div class="ui divider item"></div><div class="title"><div class="active title">' +
    '<h3 class="ui header">All Resources<i position="right" class="icons"><i aria-hidden="true" class="angle down icon"></i></i></h3>' +
    '</div><div class="content active"><div class="ui three cards link"><div class="ui fluid card"><div class="content">' +
    '<div class="meta"><span class="ui database label">Database</span><i class="icons"><i class="pin blue icon" id="0">' +
    '</i></i></div><div class="header"><a href="/resources/0/"><h3>test</h3></a></div></div></div></div></div>' +
    '<div class="ui divider item"></div></div></div></div></div></div>'
    expect(wrapper.html()).toEqual(expected)
  })
})
