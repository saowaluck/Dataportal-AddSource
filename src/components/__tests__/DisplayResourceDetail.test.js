import React from 'react'
import moxios from 'moxios'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import DisplayResourceDetail from './../DisplayResourceDetail'

const mockStore = configureMockStore([thunk])
const storeStateMock = {
  thisResource: {
    isFavorite: false,
    members: [{
      id: 0,
      name: 'test',
      position: 'prontoTools',
      slack: 'testSlack',
      avatar: 'test.jpg',
    }],
  },
}
const store = mockStore(storeStateMock)

describe('< DisplayResourceDetail />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should display superset source correctly', () => {
    const data = {
      id: 0,
      name: 'Track Reseller',
      type: 'Superset Dashboard',
      url: 'https://www.prontotools.io/',
      createdDate: 'Thu Feb 15 2018 04:25:41',
      tags: ['prontotool', 'athena'],
      relatedResources: [
        {
          id: '58',
          name: 'test 1',
          type: 'Database',
        },
        {
          id: '52',
          name: 'test test table',
          type: 'Database',
        },
      ],
      creator: {
        id: 105,
        name: 'kanokwan',
        position: 'Intern',
        email: 'test@pronto.com',
      },
      auth: { getEmail: () => 'TestEmail@prontomarketing.com' },
    }
    const wrapper = mount(<Provider store={store}><DisplayResourceDetail data={data} /></Provider>)
    const expected = '<div class="ui main container"><div class="ui stackable grid"><div class="eleven wide column">' +
    '<div class="ui segment"><iframe src="https://www.prontotools.io/" title="Track Reseller" frame-ancestors="none" ' +
    'width="100%" height="580px"></iframe></div></div><div class="five wide column"><div class="ui segment">' +
    '<h3 class="ui header">Track Reseller<i aria-hidden="true" class="icon ui heart outline icon large"></i></h3>' +
    '<span class="meta"><i class="tags large icon"></i><span class="ui left floated label">prontotool</span>' +
    '<span class="ui left floated label">athena</span></span><h5></h5><hr><div class="ui list meta">' +
    '<div class="item"><img class="ui mini circular image" alt=""><div class="content"><a href="/members/105/">' +
    '<div class="ui sub header">kanokwan</div></a>Intern</div></div><div class="item"><b>Created:</b> Feb 15, 2018</div>' +
    '<div class="item"><a href="https://www.prontotools.io/"><i class="external share icon"></i> View Original</a></div>' +
    '<div class="accordion ui"><div class="title"><i aria-hidden="true" class="icon ui heart icon"></i>' +
    'favorited by 1 proton<i aria-hidden="true" class="icon angle down icon"></i></div><div class="content">' +
    '<div class="ui horizontal list"><div class="item"><a href="/members/0/"><img class="ui mini circular image" src="test.jpg" alt="">' +
    '</a></div></div></div></div><div class="accordion ui"><div class="title"><i aria-hidden="true" class="icon user icon people"></i>' +
    'recently comsumed by 0 proton</div><div class="content"><div class="ui horizontal list"></div></div></div></div>' +
    '<div class="ui row vertical segment"><h4 class="ui header"><b>Related Content</b></h4><div class="ui middle aligned divided list">' +
    '<div class="item"><div class="header"><a class="content" href="/resources/58/">test 1</a><span class="ui mini right floated">' +
    '<i class="database icon"></i></span></div></div><div class="item"><div class="header">' +
    '<a class="content" href="/resources/52/">test test table</a><span class="ui mini right floated">' +
    '<i class="database icon"></i></span></div></div></div></div></div></div></div></div>'
    expect(wrapper.html()).toEqual(expected)
  })

  it('should display knowledge post source correctly', () => {
    const data = {
      id: 0,
      name: 'Robot Framework',
      type: 'Knowledge Post',
      url: 'https://www.prontotools.io/robot-framework-101-มาลองใช้กัน/',
      createdDate: 'Thu Feb 15 2018 04:25:41',
      tags: ['prontotool', 'athena'],
      relatedResources: [
        {
          id: '58',
          name: 'test 1',
          type: 'Database',
        },
        {
          id: '52',
          name: 'test test table',
          type: 'Database',
        },
      ],
      creator: {
        id: 105,
        name: 'kanokwan',
        position: 'Intern',
        email: 'test@pronto.com',
      },
      auth: { getEmail: () => 'TestEmail@prontomarketing.com' },
    }
    const wrapper = mount(<Provider store={store}><DisplayResourceDetail data={data} /></Provider>)
    const expected = '<div class="ui main container"><div class="ui stackable grid"><div class="eleven wide column"><div class="ui segment"><iframe src="https://www.prontotools.io/robot-framework-101-มาลองใช้กัน/" title="Robot Framework" frame-ancestors="none" width="100%" height="580px"></iframe></div></div><div class="five wide column"><div class="ui segment"><h3 class="ui header">Robot Framework<i aria-hidden="true" class="icon ui heart outline icon large"></i></h3><span class="meta"><i class="tags large icon"></i><span class="ui left floated label">prontotool</span><span class="ui left floated label">athena</span></span><h5></h5><hr><div class="ui list meta"><div class="item"><img class="ui mini circular image" alt=""><div class="content"><a href="/members/105/"><div class="ui sub header">kanokwan</div></a>Intern</div></div><div class="item"><b>Created:</b> Feb 15, 2018</div><div class="item"><a href="https://www.prontotools.io/robot-framework-101-มาลองใช้กัน/"><i class="external share icon"></i> View Original</a></div><div class="accordion ui"><div class="title"><i aria-hidden="true" class="icon ui heart icon"></i>favorited by 1 proton<i aria-hidden="true" class="icon angle down icon"></i></div><div class="content"><div class="ui horizontal list"><div class="item"><a href="/members/0/"><img class="ui mini circular image" src="test.jpg" alt=""></a></div></div></div></div><div class="accordion ui"><div class="title"><i aria-hidden="true" class="icon user icon people"></i>recently comsumed by 0 proton</div><div class="content"><div class="ui horizontal list"></div></div></div></div><div class="ui row vertical segment"><h4 class="ui header"><b>Related Content</b></h4><div class="ui middle aligned divided list"><div class="item"><div class="header"><a class="content" href="/resources/58/">test 1</a><span class="ui mini right floated"><i class="database icon"></i></span></div></div><div class="item"><div class="header"><a class="content" href="/resources/52/">test test table</a><span class="ui mini right floated"><i class="database icon"></i></span></div></div></div></div></div></div></div></div>'
    expect(wrapper.html()).toEqual(expected)
  })
})
