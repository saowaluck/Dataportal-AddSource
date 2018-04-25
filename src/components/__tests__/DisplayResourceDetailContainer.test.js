import React from 'react'
import moxios from 'moxios'
import { shallow } from 'enzyme'
import DisplayResourceDetailContainer from './../../containers/DisplayResourceDetail'

describe('< DisplayResourceDetail />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should set state type of database resource when call API properly', (done) => {
    const match = {
      params: { id: 0 },
    }
    let auth = jest.fn()
    auth = {
      getEmail: () => 'test@pronto.com',
    }
    const wrapper = shallow(<DisplayResourceDetailContainer match={match} auth={auth} />)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          resource: {
            name: 'Accounts_Account',
            description: 'table in protoworld',
            columns: [
              'id,int,description',
              'Name,string,description',
            ],
            type: 'Database',
            createdDate: '2018-02-19T06:30:34+00:00',
            creator: {
              id: 105,
              name: 'kanokwan',
              position: 'Intern',
            },
          },
          tags: [
            'Athena',
            'dataportal',
          ],
          relatedResources: [
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
          ],
        },
      }).then(() => {
        expect(request.url).toBe('http://localhost:5000/resources/0/?memberEmail=test@pronto.com')
        expect(request.config.method).toBe('get')
        expect(wrapper.state().name).toBe('Accounts_Account')
        expect(wrapper.state().description).toBe('table in protoworld')
        expect(wrapper.state().columns).toEqual(['id,int,description', 'Name,string,description'])
        expect(wrapper.state().type).toBe('Database')
        expect(wrapper.state().createdDate).toBe('Feb 19, 2018')
        expect(wrapper.state().tags).toEqual(['Athena', 'dataportal'])
        expect(wrapper.state().creator.id).toEqual(105)
        expect(wrapper.state().creator.name).toEqual('kanokwan')
        expect(wrapper.state().creator.position).toEqual('Intern')
        expect(wrapper.state().relatedResources).toEqual([
          { id: '58', name: 'test 1', type: 'Database' },
          { id: '52', name: 'test test table', type: 'Database' },
        ])
        done()
      })
    })
  })

  it('should set state type of superset resource when call API properly', (done) => {
    const match = {
      params: { id: 0 },
    }
    let auth = jest.fn()
    auth = {
      getEmail: () => 'test@pronto.com',
    }
    const wrapper = shallow(<DisplayResourceDetailContainer match={match} auth={auth} />)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          resource: {
            name: 'pw_accounts_account',
            type: 'Superset Dashboard',
            url: 'https://www.prontotools.io/',
            createdDate: '2018-02-19T06:30:34+00:00',
            creator: {
              id: 105,
              name: 'kanokwan',
              position: 'Intern',
            },
          },
          tags: [
            'athena',
            'dashboard',
          ],
          relatedResources: [
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
          ],
        },
      }).then(() => {
        expect(request.url).toBe('http://localhost:5000/resources/0/?memberEmail=test@pronto.com')
        expect(request.config.method).toBe('get')
        expect(wrapper.state().name).toBe('pw_accounts_account')
        expect(wrapper.state().url).toBe('https://www.prontotools.io/')
        expect(wrapper.state().type).toBe('Superset Dashboard')
        expect(wrapper.state().createdDate).toBe('Feb 19, 2018')
        expect(wrapper.state().tags).toEqual(['athena', 'dashboard'])
        expect(wrapper.state().relatedResources).toEqual([
          { id: '58', name: 'test 1', type: 'Database' },
          { id: '52', name: 'test test table', type: 'Database' },
        ])
        done()
      })
    })
  })

  it('should set state type of knowledge post resource when call API properly', (done) => {
    const match = {
      params: { id: 0 },
    }
    let auth = jest.fn()
    auth = {
      getEmail: () => 'test@pronto.com',
    }
    const wrapper = shallow(<DisplayResourceDetailContainer match={match} auth={auth} />)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          resource: {
            name: 'Robot Framework',
            type: 'Knowledge Post',
            url: 'https://www.prontotools.io/robot-framework-101-มาลองใช้กัน/',
            createdDate: '2018-02-19T06:30:34+00:00',
            creator: {
              id: 105,
              name: 'kanokwan',
              position: 'Intern',
            },
          },
          tags: [
            'prontoworld',
            'athena',
          ],
          relatedResources: [
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
          ],
        },
      }).then(() => {
        expect(request.url).toBe('http://localhost:5000/resources/0/?memberEmail=test@pronto.com')
        expect(request.config.method).toBe('get')
        expect(wrapper.state().name).toBe('Robot Framework')
        expect(wrapper.state().url).toBe('https://www.prontotools.io/robot-framework-101-มาลองใช้กัน/')
        expect(wrapper.state().type).toBe('Knowledge Post')
        expect(wrapper.state().createdDate).toBe('Feb 19, 2018')
        expect(wrapper.state().tags).toEqual(['prontoworld', 'athena'])
        expect(wrapper.state().creator.id).toEqual(105)
        expect(wrapper.state().creator.name).toEqual('kanokwan')
        expect(wrapper.state().creator.position).toEqual('Intern')
        expect(wrapper.state().relatedResources).toEqual([
          { id: '58', name: 'test 1', type: 'Database' },
          { id: '52', name: 'test test table', type: 'Database' },
        ])
        done()
      })
    })
  })
})
