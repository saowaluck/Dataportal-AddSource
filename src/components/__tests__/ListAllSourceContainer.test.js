import React from 'react'
import moxios from 'moxios'
import { shallow } from 'enzyme'
import ListAllSourceContainer from './../../containers/ListAllSource'

describe('< ListAllSource />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should set state to resource when call API properly', (done) => {
    const wrapper = shallow(<ListAllSourceContainer />)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: [
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
        ],
      }).then(() => {
        const name = wrapper.state().resource.map(node => node.name)
        const url = wrapper.state().resource.map(node => node.url)
        const type = wrapper.state().resource.map(node => node.type)
        const creator = wrapper.state().resource.map(node => node.creator)
        const dateofCreate = wrapper.state().resource.map(node => node.dateofCreate)
        const dateofUpdate = wrapper.state().resource.map(node => node.dateofUpdate)

        expect(request.url).toBe('http://localhost:5000/api/source/')
        expect(request.config.method).toBe('get')
        expect(name).toEqual(['Track Reseller', 'How to use checkbox of semantic-ui'])
        expect(url).toEqual(['https://www.prontotools.io/', 'https://semantic-ui.com/modules/checkbox.html'])
        expect(type).toEqual(['Superset Dashboard', 'Superset Chart'])
        expect(creator).toEqual(['kan ouivirus', 'saowalak'])
        expect(dateofCreate).toEqual(['24, 01, 2018', '20, 01, 2018'])
        expect(dateofUpdate).toEqual(['25, 01, 2018', '24, 01, 2018'])
        done()
      })
    })
  })
})
