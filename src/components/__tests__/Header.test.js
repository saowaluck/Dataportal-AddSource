import React from 'react'
import { shallow } from 'enzyme'
import Header from './../Header'

describe('<Header />', () => {
  it('should render header', () => {
    let auth = jest.fn()

    auth = {
      getEmail: jest.fn(),
      getName: jest.fn(),
      getAvatar: jest.fn(),
      isAuthenticated: jest.fn(),
    }

    const wrapper = shallow(<Header auth={auth} />)
    const expected = '<div class="ui stackable menu">' +
    '<div class="ui container">' +
    '<a href="/" class="header item">' +
    '<img class="ui mini image" src="logo-mark.png" alt=""/>Dataportal</a>' +
    '<div class="right menu"><div class="ui simple right item">' +
    '<a href="/resources/add/">Add New Resource</a></div>' +
    '<div class="ui active centered inline loader"></div>' +
    '</div></div></div>'

    expect(wrapper.html()).toEqual(expected)
  })
})
