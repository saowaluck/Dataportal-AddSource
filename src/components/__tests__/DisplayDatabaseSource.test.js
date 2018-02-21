import React from 'react'
import { mount } from 'enzyme'
import DisplayDatabaseSource from './../DisplayDatabaseSource'

describe('< DisplayDatabaseSource />', () => {
  it('should display database resource when send props properly', () => {
    const name = 'Track Reseller'
    const description = 'Description'
    const type = 'Database'
    const columns = [
      'id,int,descriptionID',
      'name,string,descriptionName',
    ]
    const createdDate = 'Thu Feb 15 2018 04:25:41'
    const tags = ['prontotool', 'athena']

    const wrapper = mount(<DisplayDatabaseSource
      name={name}
      description={description}
      type={type}
      columns={columns}
      createdDate={createdDate}
      tags={tags}
    />)

    const expected = '<div class="ui main container">' +
      '<div class="ui stackable grid"><div class="eleven wide column">' +
      '<h2 class="ui dividing header">Columns Details</h2>' +
      '<table class="ui very basic table segment"><thead>' +
      '<tr><th>Name</th><th>Type</th><th>Description</th></tr></thead>' +
      '<tbody><tr><td>id</td><td>int</td><td>descriptionID</td></tr>' +
      '<tr><td>name</td><td>string</td><td>descriptionName</td></tr>' +
      '</tbody></table></div><div class="five wide column">' +
      '<div class="ui segment">' +
      '<h3 class="ui header">Track Reseller<a href="/">&nbsp;<i class="edit icon"></i></a></h3>' +
      '<span class="ui left floated label">prontotool</span>' +
      '<span class="ui left floated label">athena</span>' +
      '<p>Description</p><p>Thu Feb 15 2018 04:25:41</p><hr></div>' +
      '</div></div></div>'
    expect(wrapper.html()).toEqual(expected)
  })
})
