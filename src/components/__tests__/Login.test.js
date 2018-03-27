import React from 'react'
import { shallow } from 'enzyme'

describe('<Login />', () => {
  it('should render google button', () => {
    const wrapper = shallow(<Google-Button />)
    expect(wrapper.length).toBe(1)
  })
})
