import React from 'react'
import { shallow } from 'enzyme'
import ConsumerList from './../ConsumerList'

describe('<ConsumersList />', () => {
  it('should display list of consumers to its props', () => {
    const consumed = [
      {
        id: 1,
        avatar: 'test1.jpg',
      },
      {
        id: 2,
        avatar: 'test2.jpg',
      },
    ]

    const wrapper = shallow(<ConsumerList id={10} consumed={consumed} />)
    const expected = '<div class="accordion ui"><div class="title">' +
    '<i aria-hidden="true" class="icon user icon people">' +
    '</i>recently comsumed by 0 proton</div><div class="content">' +
    '<div class="ui horizontal list"></div></div></div>'
    expect(wrapper.html()).toEqual(expected)
  })
})
