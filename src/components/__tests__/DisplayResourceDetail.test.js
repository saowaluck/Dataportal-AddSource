import React from 'react'
import moxios from 'moxios'
import { shallow } from 'enzyme'
import DisplayResourceDetail from './../DisplayResourceDetail'

describe('< DisplayResourceDetail />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should display superset source when change state', () => {
    const id = 0
    const name = 'Track Reseller'
    const type = 'Superset Dashboard'
    const url = 'https://www.prontotools.io/'
    const createdDate = 'Thu Feb 15 2018 04:25:41'
    const tags = ['prontotool', 'athena']
    const relatedResources = [
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
    ]
    const creator = {
      id: 105,
      name: 'kanokwan',
      position: 'Intern',
    }
    let auth = jest.fn()
    auth = {
      getEmail: jest.fn(),
    }
    const wrapper = shallow(<DisplayResourceDetail
      id={id}
      name={name}
      type={type}
      url={url}
      createdDate={createdDate}
      tags={tags}
      relatedResources={relatedResources}
      creator={creator}
      auth={auth}
    />)
    const expected = ('<div class="ui main container">' +
    '<div class="ui stackable grid">' +
    '<div class="eleven wide column"><div class="ui segment">' +
    '<iframe src="https://www.prontotools.io/" title="Track Reseller" frame-ancestors="none" width="100%" height="580px"></iframe>' +
    '</div></div><div class="five wide column">' +
    '<div class="ui segment"><h3 class="ui header">Track Reseller' +
    '<a href="/resources/0/edit/"> <i class="edit icon"></i></a></h3><div class="meta">' +
    '<span class="ui left floated label">prontotool</span>' +
    '<span class="ui left floated label">athena</span><i aria-hidden="true" class="icon"></i></div>' +
    '<hr/><div class="ui list meta"><div class="item"><img class="ui mini circular image" alt=""/>' +
    '<div class="content"><a href="/members/105/"><div class="ui sub header">kanokwan</div></a>Intern</div>' +
    '</div><b>Created:</b> Thu Feb 15 2018 04:25:41<div class="accordion ui"><div class="title">' +
    '<i aria-hidden="true" class="icon large heart icon"></i>favorited by 0 protons' +
    '<i aria-hidden="true" class="icon angle down icon"></i></div><div class="content">' +
    '<div class="ui horizontal list"></div></div></div></div><div class="ui row vertical segment">' +
    '<h4 class="ui header"><b>Related Content</b></h4><div class="ui middle aligned divided list">' +
    '<div class="item"><div class="header"><a class="content" href="/resources/58/">test 1</a>' +
    '<span class="ui right floated label">Database</span></div></div><div class="item"><div class="header">' +
    '<a class="content" href="/resources/52/">test test table</a><span class="ui right floated label">Database</span>' +
    '</div></div></div></div></div></div></div></div>')
    expect(wrapper.html()).toEqual(expected)
  })

  it('should display knowledge post source when change state', () => {
    const id = 0
    const name = 'Robot Framework'
    const type = 'Knowledge Post'
    const url = 'https://www.prontotools.io/robot-framework-101-มาลองใช้กัน/'
    const createdDate = 'Thu Feb 15 2018 04:25:41'
    const tags = ['prontotool', 'athena']
    let auth = jest.fn()
    auth = {
      getEmail: jest.fn(),
    }
    const relatedResources = [
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
    ]
    const creator = {
      id: 105,
      name: 'kanokwan',
      position: 'Intern',
    }

    const wrapper = shallow(<DisplayResourceDetail
      id={id}
      name={name}
      type={type}
      url={url}
      createdDate={createdDate}
      tags={tags}
      relatedResources={relatedResources}
      creator={creator}
      auth={auth}
    />)
    const expected = ('<div class="ui main container">' +
    '<div class="ui stackable grid">' +
    '<div class="eleven wide column"><div class="ui segment">' +
    '<iframe src="https://www.prontotools.io/robot-framework-101-มาลองใช้กัน/" title="Robot Framework" frame-ancestors="none" width="100%" height="580px"></iframe>' +
    '</div></div><div class="five wide column"><div class="ui segment">' +
    '<h3 class="ui header">Robot Framework<a href="/resources/0/edit/"> <i class="edit icon"></i></a></h3>' +
    '<div class="meta"><span class="ui left floated label">prontotool</span>' +
    '<span class="ui left floated label">athena</span><i aria-hidden="true" class="icon"></i></div><hr/>' +
    '<div class="ui list meta"><div class="item"><img class="ui mini circular image" alt=""/><div class="content">' +
    '<a href="/members/105/"><div class="ui sub header">kanokwan</div></a>Intern</div></div>' +
    '<b>Created:</b> Thu Feb 15 2018 04:25:41<div class="accordion ui">' +
    '<div class="title"><i aria-hidden="true" class="icon large heart icon"></i>favorited by 0 protons' +
    '<i aria-hidden="true" class="icon angle down icon"></i></div><div class="content">' +
    '<div class="ui horizontal list"></div></div></div></div><div class="ui row vertical segment">' +
    '<h4 class="ui header"><b>Related Content</b></h4><div class="ui middle aligned divided list">' +
    '<div class="item"><div class="header"><a class="content" href="/resources/58/">test 1</a>' +
    '<span class="ui right floated label">Database</span>' +
    '</div></div><div class="item"><div class="header">' +
    '<a class="content" href="/resources/52/">test test table</a>' +
    '<span class="ui right floated label">Database</span></div></div></div></div></div></div></div></div>')
    expect(wrapper.html()).toEqual(expected)
  })
})
