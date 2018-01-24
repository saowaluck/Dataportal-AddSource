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

  it('should display source when change state', () => {
    const name = 'Track Reseller'
    const type = 'Superset Dashboard'
    const url = 'https://www.prontotools.io/'
    const tag = 'Reseller'
    const dateofCreate = '24, 01, 2018'
    const creator = 'kan ouivirus'

    const wrapper = shallow(<DisplaySourceDetail name={name} type={type} url={url} tag={tag} dateofCreate={dateofCreate} creator={creator} />)

    expect(wrapper.html()).toEqual('<div class="ui main container">' +
    '<div class="ui stackable grid">' +
    '<div class="eleven wide column">' +
    '<div class="ui segment">' +
    '<iframe src="https://www.prontotools.io/" title="Track Reseller" frame-ancestors="none" width="100%" height="580px"></iframe>' +
    '</div>' +
    '</div>' +
    '<div class="five wide column">' +
    '<div class="ui segment">' +
    '<h2 class="ui header">Track Reseller</h2>' +
    '<div class="meta">' +
    '<span class="ui left floated label">Reseller</span>' +
    '</div>' +
    '<div class="ui list meta">' +
    '<div class="item">' +
    '<i class="user circle outline big icon"></i>' +
    '<div class="content">' +
    '<div class="ui sub header">kan ouivirus</div>' +
    '</div>' +
    '</div>' +
    '<b>created</b> ' +
    '24, 01, 2018' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>')
  })
})
