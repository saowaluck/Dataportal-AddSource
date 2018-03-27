import React from 'react'
import moxios from 'moxios'
import { shallow } from 'enzyme'
import DisplayListOfMemberFavoriteResource from './../DisplayListOfMemberFavoriteResource'

describe('< DisplayListOfMemberFavoriteResource />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should set state type of database resource when call API properly', () => {
    const members = [
      {
        id: 0,
        name: 'testA',
        position: '',
        slack: '',
        avatar: 'photoA.jpg',
      },
      {
        id: 1,
        name: 'testB',
        position: 'Deverloper',
        slack: 'http://slack.io',
        avatar: 'photoB.jpg',
      },
    ]
    const wrapper = shallow(<DisplayListOfMemberFavoriteResource members={members} />)
    expect(wrapper.html()).toEqual('<div class="accordion ui">' +
    '<div class="title"><i aria-hidden="true" class="icon large heart icon"></i>' +
    'favorited by 2 protons<i aria-hidden="true" class="icon angle down icon"></i></div>' +
    '<div class="content"><div class="ui horizontal list"><div class="item"><a href="/members/0/">' +
    '<img class="ui mini circular image" src="photoA.jpg" alt=""/></a></div><div class="item">' +
    '<a href="/members/1/"><img class="ui mini circular image" src="photoB.jpg" alt=""/></a></div>' +
    '</div></div></div>')
  })
})
