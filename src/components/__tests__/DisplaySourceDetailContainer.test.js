import React from 'react'
import moxios from 'moxios'
import { shallow, mount } from 'enzyme'
import DisplaySourceDetailContainer from './../../containers/DisplaySourceDetail'

describe('< DisplaySourceDetail />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should set state type of database resource when call API properly', (done) => {
    const wrapper = shallow(<DisplaySourceDetailContainer id='0' />)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          source: {
            name: 'Accounts_Account',
            description: 'table in protoworld',
            columns: [
              'id,int,description',
              'Name,string,description',
            ],
            type: 'Database',
            createdDate: '2018-02-19T06:30:34+00:00',
          },
          tags: [
            'Athena',
            'dataportal',
          ],
        },
      }).then(() => {
        expect(request.url).toBe('http://localhost:5000/source/0/')
        expect(request.config.method).toBe('get')
        expect(wrapper.state().name).toBe('Accounts_Account')
        expect(wrapper.state().description).toBe('table in protoworld')
        expect(wrapper.state().columns).toEqual(['id,int,description', 'Name,string,description'])
        expect(wrapper.state().type).toBe('Database')
        expect(wrapper.state().createdDate).toBe('February 19th 2018')
        expect(wrapper.state().tags).toEqual(['Athena', 'dataportal'])
        done()
      })
    })
  })

  it('should set state type of superset resource when call API properly', (done) => {
    const wrapper = mount(<DisplaySourceDetailContainer id='0' />)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          source: {
            name: 'pw_accounts_account',
            type: 'Superset Dashboard',
            url: 'https://www.prontotools.io/',
            createdDate: '2018-02-19T06:30:34+00:00',
          },
          tags: [
            'athena',
            'dashboard',
          ],
        },
      }).then(() => {
        expect(request.url).toBe('http://localhost:5000/source/0/')
        expect(request.config.method).toBe('get')
        expect(wrapper.state().name).toBe('pw_accounts_account')
        expect(wrapper.state().url).toBe('https://www.prontotools.io/')
        expect(wrapper.state().type).toBe('Superset Dashboard')
        expect(wrapper.state().createdDate).toBe('February 19th 2018')
        expect(wrapper.state().tags).toEqual(['athena', 'dashboard'])
        done()
      })
    })
  })

  it('should set state type of knowledge post resource when call API properly', (done) => {
    const wrapper = shallow(<DisplaySourceDetailContainer id='0' />)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          source: {
            name: 'Robot Framework',
            type: 'Knowledge Post',
            url: 'https://www.prontotools.io/robot-framework-101-มาลองใช้กัน/',
            createdDate: '2018-02-19T06:30:34+00:00',
          },
          tags: [
            'prontoworld',
            'athena',
          ],
        },
      }).then(() => {
        expect(request.url).toBe('http://localhost:5000/source/0/')
        expect(request.config.method).toBe('get')
        expect(wrapper.state().name).toBe('Robot Framework')
        expect(wrapper.state().url).toBe('https://www.prontotools.io/robot-framework-101-มาลองใช้กัน/')
        expect(wrapper.state().type).toBe('Knowledge Post')
        expect(wrapper.state().createdDate).toBe('February 19th 2018')
        expect(wrapper.state().tags).toEqual(['prontoworld', 'athena'])
        done()
      })
    })
  })
})
