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
          },
          {
            id: 1,
            name: 'How to use checkbox of semantic-ui',
            type: 'Superset Chart',
            url: 'https://semantic-ui.com/modules/checkbox.html',
          },
        ],
      }).then(() => {
        const name = wrapper.state().resource.map(node => node.name)
        const url = wrapper.state().resource.map(node => node.url)
        const type = wrapper.state().resource.map(node => node.type)
        expect(request.url).toBe('http://localhost:5000/api/source/')
        expect(request.config.method).toBe('get')
        expect(name).toEqual(['Track Reseller', 'How to use checkbox of semantic-ui'])
        expect(url).toEqual(['https://www.prontotools.io/', 'https://semantic-ui.com/modules/checkbox.html'])
        expect(type).toEqual(['Superset Dashboard', 'Superset Chart'])
        done()
      })
    })
  })
})
