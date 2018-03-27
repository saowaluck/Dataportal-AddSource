import React from 'react'
import { shallow } from 'enzyme'
import ListAllResource from './../ListAllResource'

describe('< ListAllResource />', () => {
  it('should display list of resources according to its props', () => {
    const resource = [
      {
        resource: {
          memberID: 136,
          member: 'saowaluck',
          resourceID: 137,
          name: 'Track Reseller',
          type: 'Knowledge Post',
          createdDate: 'Mar 23, 2018',
          updatedDate: 'Mar 23, 2018',
        },
        favorite: 1,
      },
    ]

    const wrapper = shallow(<ListAllResource resource={resource} />)
    const expected = '<div class="ui row vertical segment"><div class="ui divided items">' +
    '<div class="item"><div class="content"><div class="ui row vertical"><h3 class="ui header">' +
    '<a href="/resources/137/">Track Reseller</a><div class="ui right floated green large button disabled">' +
    '<div class="visible content">Knowledge Post</div></div></h3></div><br/><p><span>' +
    '<i class="empty heart icon"></i>1</span>  <span><a href="/members/136/"><i class="user icon people"></i>' +
    'saowaluck</a></span>  <span><i class="wait icon"></i>Mar 23, 2018</span>  <span>' +
    '<i class="history icon"></i>Mar 23, 2018</span>  </p></div></div></div></div>'
    expect(wrapper.html()).toEqual(expected)
  })
})

