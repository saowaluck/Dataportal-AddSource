import React from 'react'
import { shallow } from 'enzyme'
import TeamList from './../TeamList'

describe('<TeamList />', () => {
  it('should display list of attend to its props', () => {
    const teams = [
      {
        id: 118,
        name: 'Dataprotal',
        description: 'Open Data',
      },
      {
        id: 119,
        name: 'Simpleset',
        description: 'Open Data',
      },
    ]
    const wrapper = shallow(<TeamList teams={teams} />)
    const expected = '<div class="ui basic segment"><div class="ui three column grid"><div class="column">' +
    '<div class="ui card"><div class="content"><div class="header"><a href="/teams/118/">' +
    '<div class="center aligned">Dataprotal</div></a></div></div><div class="content"><div class="ui small feed">' +
    '<div class="event"><div class="content"><div class="description">Open Data</div></div></div></div></div></div></div><' +
    'div class="column"><div class="ui card"><div class="content"><div class="header"><a href="/teams/119/">' +
    '<div class="center aligned">Simpleset</div></a></div></div><div class="content"><div class="ui small feed">' +
    '<div class="event"><div class="content"><div class="description">Open Data</div></div></div></div></div></div></div></div></div>'
    expect(wrapper.html()).toEqual(expected)
  })
})
