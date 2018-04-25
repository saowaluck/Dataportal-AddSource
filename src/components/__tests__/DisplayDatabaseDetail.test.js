import React from 'react'
import moxios from 'moxios'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import DisplayDatabaseDetail from './../DisplayDatabaseDetail'

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

describe('< DisplayDatabaseDetail />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should display database resource when send props properly', () => {
    const data = {
      id: 0,
      name: 'Track Reseller',
      description: 'Description',
      type: 'Database',
      columns: [
        'id,int,descriptionId',
        'name,string,descriptionName',
      ],
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
      },
      auth: {
        getEmail: () => 'test@pronto.com',
      },
    }

    const wrapper = mount(<Provider store={store}><DisplayDatabaseDetail data={data} /></Provider>)
    const expected = '<div class="ui main container"><div class="ui stackable grid">' +
    '<div class="eleven wide column"><h2 class="ui dividing header">Columns Details</h2>' +
    '<table class="ui very basic table segment"><thead><tr><th>Name</th><th>Type</th><th>' +
    'Description</th></tr></thead><tbody><tr><td>id</td><td>int</td><td>descriptionId</td></tr>' +
    '<tr><td>name</td><td>string</td><td>descriptionName</td></tr></tbody></table></div>' +
    '<div class="five wide column"><div class="ui segment"><h3 class="ui header">Track Reseller</h3>' +
    '<div class="meta"><span class="ui left floated label">prontotool</span><span class="ui left floated label">athena</span>' +
    '<i aria-hidden="true" class="icon ui heart outline icon large"></i></div><p>Description</p><hr><div class="ui list meta">' +
    '<div class="item"><img class="ui mini circular image" alt=""><div class="content"><a href="/members/105/"><h3>' +
    '<div class="ui sub header">kanokwan</div></h3></a>Intern</div></div><b>Created:</b> Feb 15, 2018<div class="accordion ui">' +
    '<div class="title"><i aria-hidden="true" class="icon ui heart icon"></i>favorited by 1 protons<i aria-hidden="true" class="icon angle down icon">' +
    '</i></div><div class="content"><div class="ui horizontal list"><div class="item"><a href="/members/0/"><img class="ui mini circular image" src="test.jpg" alt="">' +
    '</a></div></div></div></div><div class="accordion ui"><div class="title"><i aria-hidden="true" class="icon user icon people">' +
    '</i>recently comsumed by 0 protons<i aria-hidden="true" class="icon angle down icon"></i></div><div class="content"><div class="ui horizontal list">' +
    '</div></div></div></div><div class="ui row vertical segment"><h4 class="ui header"><b>Related Content</b></h4><div class="ui middle aligned divided list">' +
    '<div class="item"><div class="header"><a class="content" href="/resources/58/">test 1</a><span class="ui right floated database label">Database</span></div>' +
    '</div><div class="item"><div class="header"><a class="content" href="/resources/52/">test test table</a><span class="ui right floated database label">Database</span>' +
    '</div></div></div></div></div></div></div></div>'
    expect(wrapper.html()).toEqual(expected)
  })
})

