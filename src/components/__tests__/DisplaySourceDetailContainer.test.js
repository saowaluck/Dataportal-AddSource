import React from 'react'
import moxios from 'moxios'
import { shallow } from 'enzyme'
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
          name: 'AccountName',
          type: 'Database',
          columns: [
            'accountName,String',
            'status,string',
          ],
        },
      }).then(() => {
        expect(request.url).toBe('http://localhost:5000/source/0/')
        expect(request.config.method).toBe('get')
        expect(wrapper.state().name).toBe('AccountName')
        expect(wrapper.state().columns).toEqual(['accountName,String', 'status,string'])
        expect(wrapper.state().type).toBe('Database')
        done()
      })
    })
  })

  it('should set state type of superset resource when call API properly', (done) => {
    const wrapper = shallow(<DisplaySourceDetailContainer id='0' />)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          name: 'pw_accounts_account',
          type: 'Superset Dashboard',
          url: 'https://www.prontotools.io/',
          tag: 'athena',
        },
      }).then(() => {
        expect(request.url).toBe('http://localhost:5000/source/0/')
        expect(request.config.method).toBe('get')
        expect(wrapper.state().name).toBe('pw_accounts_account')
        expect(wrapper.state().url).toBe('https://www.prontotools.io/')
        expect(wrapper.state().type).toBe('Superset Dashboard')
        expect(wrapper.state().tag).toBe('athena')
        done()
      })
    })
  })
})
