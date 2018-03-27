import React from 'react'
import { shallow } from 'enzyme'
import moxios from 'moxios'
import DisplayDatabaseResource from './../DisplayDatabaseResource'

describe('< DisplayDatabaseResource />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should display database resource when send props properly', (done) => {
    const id = 0
    const name = 'Track Reseller'
    const description = 'Description'
    const type = 'Database'
    const columns = [
      'id,int,descriptionID',
      'name,string,descriptionName',
    ]
    const createdDate = 'Thu Feb 15 2018 04:25:41'
    const tags = ['prontotool', 'athena']
    const relatedResources = [
      {
        id: '58',
        name: 'test 1',
        type: 'Database',
      },
      {
        id: '52',
        name: 'test test table',
        type: 'Database',
      },
    ]
    const creator = {
      id: 105,
      name: 'kanokwan',
      position: 'Intern',
    }
    let auth = jest.fn()
    auth = {
      getEmail: () => 'test@pronto.com',
    }

    const wrapper = shallow(<DisplayDatabaseResource
      id={id}
      name={name}
      description={description}
      type={type}
      columns={columns}
      createdDate={createdDate}
      tags={tags}
      relatedResources={relatedResources}
      creator={creator}
      auth={auth}
    />)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          resource: {
            name: 'Account',
          },
        },
      }).then(() => {
        expect(request.url).toBe('http://localhost:5000/resources/0/favorites/?memberEmail=test@pronto.com')
        expect(wrapper.state().activeClassName).toBe('ui large heart outline icon')
        expect(wrapper.html()).toBe('<div class="ui main container">' +
          '<div class="ui stackable grid"><div class="eleven wide column">' +
          '<h2 class="ui dividing header">Columns Details</h2>' +
          '<table class="ui very basic table segment"><thead>' +
          '<tr><th>Name</th><th>Type</th><th>Description</th></tr>' +
          '</thead><tbody><tr><td>id</td><td>int</td><td>descriptionID</td>' +
          '</tr><tr><td>name</td><td>string</td><td>descriptionName</td></tr>' +
          '</tbody></table></div><div class="five wide column">' +
          '<div class="ui segment">' +
          '<h3 class="ui header">Track Reseller<a href="/resources/0/edit/"> <i class="edit icon"></i>' +
          '</a></h3><div class="meta"><span class="ui left floated label">prontotool</span>' +
          '<span class="ui left floated label">athena</span><i aria-hidden="true" class="icon"></i>' +
          '</div><p>Description</p><hr/><div class="ui list meta"><div class="item">' +
          '<img class="ui mini circular image" alt=""/><div class="content">' +
          '<a href="/members/105/"><h3><div class="ui sub header">kanokwan</div></h3></a>Intern</div></div>' +
          '<b>Created:</b> Thu Feb 15 2018 04:25:41<div class="accordion ui"><div class="title">' +
          '<i aria-hidden="true" class="icon large heart icon"></i>favorited by 0 protons' +
          '<i aria-hidden="true" class="icon angle down icon"></i></div><div class="content">' +
          '<div class="ui horizontal list"></div></div></div></div><div class="ui row vertical segment">' +
          '<h4 class="ui header"><b>Related Content</b></h4><div class="ui middle aligned divided list">' +
          '<div class="item"><div class="header"><a class="content" href="/resources/58/">test 1</a>' +
          '<span class="ui right floated label">Database</span></div></div><div class="item">' +
          '<div class="header"><a class="content" href="/resources/52/">test test table</a>' +
          '<span class="ui right floated label">Database</span></div></div></div></div></div></div></div></div>')
        done()
      })
    })
  })
})

