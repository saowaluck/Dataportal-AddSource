import React from 'react'
import moxios from 'moxios'
import { shallow, mount } from 'enzyme'
import AddDatabaseSource from './../AddDatabaseSource'

describe('<AddDatabaseSource />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should initial of type', () => {
    const wrapper = mount(<AddDatabaseSource type='Database' />)
    expect(wrapper.props().type).toBe('Database')
  })

  it('should initial state of Columntype', () => {
    const wrapper = shallow(<AddDatabaseSource type='' />)
    wrapper.setState({
      type: [
        'int',
        'double',
        'float',
        'bigint',
        'string',
        'boolean',
        'timestamp',
        'date',
      ],
    })
    expect(wrapper.state().type).toEqual([
      'int',
      'double',
      'float',
      'bigint',
      'string',
      'boolean',
      'timestamp',
      'date',
    ])
  })

  it('should render form', () => {
    const wrapper = shallow(<AddDatabaseSource type='' />)
    const form = wrapper.find('form')

    expect(form.length).toBe(1)
    expect(form.find('input[name="tableName"]').length).toBe(1)
    expect(form.find('input[name="columnName"]').length).toBe(1)
    expect(form.find('Dropdown').length).toBe(1)
  })

  it('should change state when set data in feilds', () => {
    const wrapper = shallow(<AddDatabaseSource type='' />)

    wrapper.setState({
      tableName: 'ProntoWorld Teams',
      column: ['TeamName, string'],
    })
    expect(wrapper.state().tableName).toBe('ProntoWorld Teams')
    expect(wrapper.state().column).toEqual(['TeamName, string'])
  })

  it('should simulates click submit form', (done) => {
    const wrapper = shallow(<AddDatabaseSource type='' />)

    const preventDefault = jest.fn()
    wrapper.find('form').simulate('submit', { preventDefault })
    wrapper.setState({
      tableName: 'ProntoWorld Teams',
      column: ['TeamName, string'],
    })

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          identity: {
            low: 56,
            high: 0,
          },
          labels: ['Source'],
          properties: {
            name: 'ProntoWorld Teams',
            type: 'Database',
            columns: ['TeamName,string'],
          },
        },
      }).then(() => {
        expect(preventDefault).toBeCalled()
        expect(wrapper.state().isSubmit).toBeTruthy()
        expect(request.url).toBe('http://localhost:5000/source/')
        expect(request.config.method).toBe('post')
        expect(wrapper.state().tableName).toBe('ProntoWorld Teams')
        expect(wrapper.state().column).toEqual(['TeamName, string'])
        done()
      })
    })
  })
})
