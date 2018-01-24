import React from 'react'
import { shallow } from 'enzyme'
import ListAllSource from './../ListAllSource'

describe('< ListAllSource />', () => {
  it('should display list of resources according to its props', () => {
    const resource = [
      {
        id: 0,
        name: 'Track Reseller',
        type: 'Superset Dashboard',
        url: 'https://www.prontotools.io/',
        creator: 'kan ouivirus',
        dateofCreate: '24, 01, 2018',
        dateofUpdate: '25, 01, 2018',
      },
      {
        id: 1,
        name: 'How to use checkbox of semantic-ui',
        type: 'Superset Chart',
        url: 'https://semantic-ui.com/modules/checkbox.html',
        creator: 'saowalak',
        dateofCreate: '20, 01, 2018',
        dateofUpdate: '24, 01, 2018',
      },
    ]

    const wrapper = shallow(<ListAllSource resource={resource} />)

    expect(wrapper.html()).toEqual('<div class="ui main container">' +
    '<div class="ui stackable grid">' +
    '<div class="eleven wide column">' +
    '<div class="ui segment">' +
    '<div class="ui row vertical segment">' +
    '<div class="ui item">' +
    '<h3 class="ui header">' +
    '<a href="/DisplaySourceDetail/0/">Track Reseller</a>' +
    '<div class="ui right floated button disabled">' +
    '<div class="visible content">Superset Dashboard</div>' +
    '</div>' +
    '</h3>' +
    '<br/>' +
    '<p>' +
    '<span><a href="member"><i class="spy icon people"></i>kan ouivirus</a></span>' +
    '<span><i class="wait icon"></i>24, 01, 2018</span>' +
    '<span><i class="history icon"></i>25, 01, 2018</span>' +
    '</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="ui segment">' +
    '<div class="ui row vertical segment">' +
    '<div class="ui item">' +
    '<h3 class="ui header">' +
    '<a href="/DisplaySourceDetail/1/">How to use checkbox of semantic-ui</a>' +
    '<div class="ui right floated button disabled">' +
    '<div class="visible content">Superset Chart</div>' +
    '</div>' +
    '</h3>' +
    '<br/>' +
    '<p>' +
    '<span><a href="member"><i class="spy icon people"></i>saowalak</a></span>' +
    '<span><i class="wait icon"></i>20, 01, 2018</span>' +
    '<span><i class="history icon"></i>24, 01, 2018</span>' +
    '</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>')
  })
})
