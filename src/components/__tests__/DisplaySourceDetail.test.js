import React from 'react'
import moxios from 'moxios'
import { shallow } from 'enzyme'
import DisplaySourceDetail from './../DisplaySourceDetail'

describe('< DisplaySourceDetail />', () => {
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

    const wrapper = shallow(<DisplaySourceDetail
      id={id}
      name={name}
      type={type}
      url={url}
      createdDate={createdDate}
      tags={tags}
    />)
    const expected = ('<div class="ui main container"><div class="ui stackable grid"><div class="eleven wide column">' +
    '<div class="ui segment"><iframe src="https://www.prontotools.io/" title="Track Reseller" frame-ancestors="none" width="100%" height="580px"></iframe></div></div>' +
    '<div class="five wide column"><div class="ui segment"><h3 class="ui header">Track Reseller<a href="/resources/edit/0/"> <i class="edit icon"></i></a></h3>' +
    '<div class="meta"><span class="ui left floated label">prontotool</span><span class="ui left floated label">athena</span></div><div class="ui row vertical segment">' +
    '<div class="ui list meta"><div class="item"></div><b>created : </b>Thu Feb 15 2018 04:25:41</div></div></div></div></div></div>')
    expect(wrapper.html()).toEqual(expected)
  })

  it('should display knowledge post source when change state', () => {
    const id = 0
    const name = 'Robot Framework'
    const type = 'Knowledge Post'
    const url = 'https://www.prontotools.io/robot-framework-101-มาลองใช้กัน/'
    const createdDate = 'Thu Feb 15 2018 04:25:41'
    const tags = ['prontotool', 'athena']

    const wrapper = shallow(<DisplaySourceDetail
      id={id}
      name={name}
      type={type}
      url={url}
      createdDate={createdDate}
      tags={tags}
    />)

    const expected = ('<div class="ui main container"><div class="ui stackable grid"><div class="eleven wide column"><div class="ui segment">' +
    '<iframe src="https://www.prontotools.io/robot-framework-101-มาลองใช้กัน/" title="Robot Framework" frame-ancestors="none" width="100%" height="580px"></iframe></div></div>' +
    '<div class="five wide column"><div class="ui segment"><h3 class="ui header">Robot Framework<a href="/resources/edit/0/"> <i class="edit icon"></i></a></h3>' +
    '<div class="meta"><span class="ui left floated label">prontotool</span><span class="ui left floated label">athena</span></div><div class="ui row vertical segment">' +
    '<div class="ui list meta"><div class="item"></div><b>created : </b>Thu Feb 15 2018 04:25:41</div></div></div></div></div></div>')
    expect(wrapper.html()).toEqual(expected)
  })
})
