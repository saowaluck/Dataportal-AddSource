import React from 'react'
import { shallow } from 'enzyme'
import MemberList from './../MemberList'

describe('<MemberList />', () => {
  it('should display list of attend to its props', () => {
    const members = [
      {
        id: 1,
        name: 'saowaluck',
        position: 'intern',
        email: 'saowaluck@prontomarketing.com',
        slack: 'saowaluck',
        avatar: 'https://lh4.googleusercontent.com/photo.jpg',
      },
      {
        id: 2,
        name: 'kanokwan',
        position: 'intern',
        email: 'kanokwan@prontomarketing.com',
        slack: 'kanokwan',
        avatar: 'https://lh4.googleusercontent.com/photo.jpg',
      },
    ]
    const wrapper = shallow(<MemberList members={members} />)
    const expected = '<div class="ui basic segment"><div class="ui five column grid"><div class="column"><div class="ui fluid card">' +
    '<img class="ui image" src="https://lh4.googleusercontent.com/photo.jpg" alt=""/><div class="content"><a href="/members/1/">' +
    '<h3 class="header">saowaluck</h3></a></div></div></div><div class="column"><div class="ui fluid card">' +
    '<img class="ui image" src="https://lh4.googleusercontent.com/photo.jpg" alt=""/><div class="content"><a href="/members/2/">' +
    '<h3 class="header">kanokwan</h3></a></div></div></div></div></div>'
    expect(wrapper.html()).toEqual(expected)
  })
})
