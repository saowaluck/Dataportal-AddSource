import React from 'react'
import { shallow } from 'enzyme'
import Header from './../Header'

describe('<Header />', () => {
  it('should render header', () => {
    const wrapper = shallow(<Header />)

    expect(wrapper.html()).toEqual('<div class="ui fixed menu">' +
    '<div class="ui container">' +
    '<a href="/" class="header item">' +
    '<img class="logo" src="logo-mark.png" alt=""/>Dataportal</a>' +
    '<div class="right menu"><div class="ui simple right item">' +
    '<a href="/AddSourceForm">Add New Resource</a></div>' +
    '<div class="ui simple right dropdown item">' +
    'Kan Ouivirach <i class="dropdown icon"></i>' +
    '<div class="menu"><a class="item" href="/">' +
    'Edit Profile</a><div class="divider">' +
    '</div><a class="item" href="/">' +
    'Log Out</a>' +
    '</div></div></div></div></div>')
  })
})
