import React from 'react'
import { shallow } from 'enzyme'
import DisplayDatabaseSource from './../DisplayDatabaseSource'

describe('< DisplayDatabaseSource />', () => {
  it('should display database resource when send props properly', () => {
    const name = 'Track Reseller'
    const type = 'Database'
    const columns = [
      'id,int',
      'name,string',
    ]

    const wrapper = shallow(<DisplayDatabaseSource name={name} type={type} columns={columns} />)
    expect(wrapper.html()).toEqual('<div class="ui main container">' +
      '<div class="ui stackable grid">' +
      '<div class="eleven wide column">' +
      '<h2 class="ui dividing header">Columns Details</h2>' +
      '<table class="ui very basic table segment">' +
      '<thead>' +
      '<tr><th>Name</th><th>Type</th></tr>' +
      '</thead>' +
      '<tbody>' +
      '<tr><td>id</td><td>int</td></tr>' +
      '<tr><td>name</td><td>string</td></tr>' +
      '</tbody>' +
      '</table>' +
      '</div><div class="five wide column">' +
      '<div class="ui segment">' +
      '<h3 class="ui header"><a href="/">Track Reseller</a>' +
      '</h3></div></div></div></div>')
  })
})
