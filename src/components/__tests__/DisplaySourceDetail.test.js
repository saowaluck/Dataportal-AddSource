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

    const wrapper = shallow(<DisplaySourceDetail name={name} type={type} url={url} />)
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
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>')
  })
})
