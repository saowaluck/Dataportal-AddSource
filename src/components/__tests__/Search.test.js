import React from 'react'
import moxios from 'moxios'
import { shallow } from 'enzyme'
import Search from './../Search'

describe('< Search />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should have text box to do search', () => {
    const wrapper = shallow(<Search />)
    const inputSearch = wrapper.find('input[name="search"]')

    expect(inputSearch.length).toBe(1)
  })

  it('should change search text when change value', () => {
    const wrapper = shallow(<Search />)
    wrapper.find('input[name="search"]').simulate('change', { target: { value: 'Pronto' } })
    expect(wrapper.state().searchText).toBe('Pronto')
  })

  it('should default resource when call API properly', (done) => {
    const wrapper = shallow(<Search />)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          resources: [{
            resource: {
              memberId: 129,
              member: 'kanokwan',
              resourceId: 139,
              name: 'Track Reseller',
              type: 'Knowledge Post',
              createdDate: 'Mar 27, 2018',
              updatedDate: 'Mar 27, 2018',
            },
            favorite: 0,
          }],
        },
      }).then(() => {
        const name = wrapper.state().resources.map(node => node.resource.name)
        const member = wrapper.state().resources.map(node => node.resource.member)
        const type = wrapper.state().resources.map(node => node.resource.type)
        expect(request.url).toBe('http://localhost:5000/resources/')
        expect(request.config.method).toBe('get')
        expect(name).toEqual(['Track Reseller'])
        expect(member).toEqual(['kanokwan'])
        expect(type).toEqual(['Knowledge Post'])
        done()
      })
    })
  })

  it('should have data when the search is found value', (done) => {
    const wrapper = shallow(<Search />)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          resources: [{
            resource: {
              memberId: 129,
              member: 'saowalak',
              resourceId: 139,
              name: 'Athena',
              type: 'Superset Dashboard',
              createdDate: 'Mar 27, 2018',
              updatedDate: 'Mar 27, 2018',
            },
            favorite: 0,
          }],
        },
      }).then(() => {
        const name = wrapper.state().resources.map(node => node.resource.name)
        const member = wrapper.state().resources.map(node => node.resource.member)
        const type = wrapper.state().resources.map(node => node.resource.type)
        expect(request.url).toBe('http://localhost:5000/resources/')
        expect(request.config.method).toBe('get')
        expect(name).toEqual(['Athena'])
        expect(member).toEqual(['saowalak'])
        expect(type).toEqual(['Superset Dashboard'])
        done()
      })
    })
  })

  it('should not have data when the search is not found value', (done) => {
    const wrapper = shallow(<Search />)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          resources: [{
            resource: {
              memberId: 129,
              member: 'saowalak',
              resourceId: 139,
              name: 'Athena',
              type: 'Superset Dashboard',
              createdDate: 'Mar 27, 2018',
              updatedDate: 'Mar 27, 2018',
            },
            favorite: 0,
          }],
        },
      }).then(() => {
        expect(wrapper.find('Athena').length).toBe(0)
        expect(wrapper.find('prontotools').length).toBe(0)
        done()
      })
    })
  })
})
