import React from 'react'
import { shallow } from 'enzyme'
import DisplayCreatedResources from './../DisplayCreatedResources'

describe('<DisplayCreatedResources />', () => {
  it('should display list of created to its props', () => {
    const createds = [
      {
        id: 112,
        name: 'account',
        type: 'Database',
        updatedDate: '2018-03-05T08:39:24+00:00',
      },
      {
        id: 113,
        name: 'member',
        type: 'Database',
        updatedDate: '2018-03-05T08:39:24+00:00',
      },
    ]

    const wrapper = shallow(<DisplayCreatedResources createds={createds} />)
    const expected = '<div class="ui basic segment"><table class="ui very basic large table selectable"><thead>' +
    '<tr><th>Resource</th><th>Type</th><th>Updated</th></tr></thead><tbody><tr><td><a href="/resources/112/">account</a></td>' +
    '<td>Database</td><td>Mar 05, 2018</td></tr><tr><td><a href="/resources/113/">member</a></td><td>Database</td>' +
    '<td>Mar 05, 2018</td></tr></tbody></table></div>'
    expect(wrapper.html()).toEqual(expected)
  })
})
