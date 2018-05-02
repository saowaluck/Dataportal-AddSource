import React from 'react'
import { shallow } from 'enzyme'
import KnowledgePostList from './../KnowledgePostList'

describe('<KnowledgePostList />', () => {
  it('should display list of resources type knowledge post', () => {
    const resources = [
      {
        resource: {
          memberId: 136,
          member: 'saowaluck',
          resourceId: 137,
          name: 'Track Reseller',
          type: 'Knowledge Post',
          createdDate: 'Mar 23, 2018',
          updatedDate: 'Mar 23, 2018',
        },
        favorite: 1,
      },
    ]
    const searchText = 'Track Reseller'

    const wrapper = shallow(<KnowledgePostList resources={resources} searchText={searchText} />)
    const expected = '<div><div class="ui row vertical segment"><p>1 results found for Track Reseller</p>' +
    '<div class="ui divided items"><div class="item"><div class="content"><div class="ui row vertical">' +
    '<h3 class="ui header"><a href="/resources/137/">Track Reseller</a></h3></div><br/><p><span>' +
    '<i class="heart icon"></i>1</span>  <span><a href="/members/136/"><i class="user icon people">' +
    '</i>saowaluck</a></span>  <span><i class="wait icon"></i>Mar 23, 2018</span>  <span>' +
    '<i class="history icon"></i>Mar 23, 2018</span>  </p></div></div></div></div>' +
    '<div class="ui center aligned basic segment"><div aria-label="Pagination Navigation" role="navigation"' +
    'class="ui pagination menu"><a value="1" aria-current="false" aria-label="First item" tabindex="0" ' +
    'class="item">«</a><a value="1" aria-current="false" aria-label="Previous item" tabindex="0" class="item">' +
    '⟨</a><a value="1" aria-current="true" tabindex="0" class="active item">1</a><a value="1" aria-current="false" ' +
    'aria-label="Next item" tabindex="0" class="item">⟩</a><a value="1" aria-current="false" aria-label="Last item" ' +
    'tabindex="0" class="item">»</a></div></div></div>'
    expect(wrapper.html()).toEqual(expected)
  })
})
