import React from 'react'
import moxios from 'moxios'
import { shallow, mount } from 'enzyme'
import EditDatabaseSource from './../EditDatabaseSource'

describe('<EditDatabaseSource />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should initial of type', () => {
    const wrapper = mount(<EditDatabaseSource id={200} name='ProntoWorld Teams' description='Description ProntoWorld Teams' columns={['TeamName, string, Description']} type='Database' />)
    expect(wrapper.props().type).toBe('Database')
  })

  it('should initial state of Columntype', () => {
    const wrapper = shallow(<EditDatabaseSource id={200} name='ProntoWorld Teams' description='Description ProntoWorld Teams' columns={['TeamName, string, Description']} type='Database' />)
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
    const wrapper = shallow(<EditDatabaseSource id={200} name='ProntoWorld Teams' description='Description ProntoWorld Teams' columns={['TeamName, string, Description']} type='Database' />)
    const form = wrapper.find('form')

    expect(form.length).toBe(2)
    expect(form.find('input[name="name"]').length).toBe(1)
    expect(form.find('textarea[name="description"]').length).toBe(1)
    expect(form.find('input[name="tags"]').length).toBe(1)
    expect(form.find('input[name="columnName"]').length).toBe(3)
    expect(form.find('Dropdown').length).toBe(2)
  })

  it('should change state when set data in feilds', () => {
    const wrapper = shallow(<EditDatabaseSource id={200} name='ProntoWorld Teams' description='Description ProntoWorld Teams' columns={['TeamName, string, Description']} type='Database' />)
    wrapper.setState({
      name: 'ProntoWorld Teams',
      description: 'Description ProntoWorld Teams',
      columns: ['TeamName, string, Description'],
      tags: 'prontoworld, servey',
      type: 'Database',
    })
    expect(wrapper.state().name).toBe('ProntoWorld Teams')
    expect(wrapper.state().description).toBe('Description ProntoWorld Teams')
    expect(wrapper.state().columns).toEqual(['TeamName, string, Description'])
    expect(wrapper.state().tags).toEqual('prontoworld, servey')
  })

  it('should simulates click submit form', (done) => {
    const wrapper = shallow(<EditDatabaseSource id={200} name='ProntoWorld Teams' description='Description ProntoWorld Teams' columns={['TeamName, string, Description']} type='Database' />)
    const preventDefault = jest.fn()
    wrapper.find('form[name="table"]').simulate('submit', { preventDefault })
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          id: 200,
        },
      }).then(() => {
        expect(preventDefault).toBeCalled()
        expect(wrapper.state().isSubmit)
        expect(request.url).toBe('http://localhost:5000/source/edit/')
        expect(request.config.method).toBe('post')
        done()
      })
    })
  })
})
