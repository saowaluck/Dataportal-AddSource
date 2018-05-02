import React from 'react'
import moxios from 'moxios'
import { shallow } from 'enzyme'
import EditResource from './../EditResource'

describe('<EditResource />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should render edit form when resource type Knowledge Post', () => {
    const id = 10
    const name = 'Track Reseller'
    const type = 'Knowledge Post'
    const url = 'https://www.prontotools.io/'
    const tags = ['Reseller', 'Knowledge']
    const createdDate = '2018-03-05T08:39:24+00:00'

    const wrapper = shallow(<EditResource
      id={id}
      name={name}
      type={type}
      url={url}
      tags={tags}
      createdDate={createdDate}
    />)
    const form = wrapper.find('form')

    expect(form.length).toBe(1)
    expect(form.find('input[name="name"]').length).toBe(1)
    expect(form.find('input[name="url"]').length).toBe(1)
    expect(form.find('Dropdown[name="tags"]').length).toBe(1)
  })

  it('should render edit form when resource type Superset Dashboard', () => {
    const id = 1
    const name = 'Track Reseller'
    const type = 'Superset Dashboard'
    const url = 'https://www.prontotools.io/'
    const tags = ['Athena']
    const createdDate = '2018-03-05T08:39:24+00:00'

    const wrapper = shallow(<EditResource
      id={id}
      name={name}
      type={type}
      url={url}
      tags={tags}
      createdDate={createdDate}
    />)
    const form = wrapper.find('form')

    expect(form.length).toBe(1)
    expect(form.find('input[name="name"]').length).toBe(1)
    expect(form.find('input[name="url"]').length).toBe(1)
    expect(form.find('Dropdown[name="tags"]').length).toBe(1)
  })

  it('should simulates click submit form when edit resource type Knowledge Post in fields', (done) => {
    const id = 756
    const name = 'Pronto Tools พวกเราทำอะไร?'
    const type = 'Knowledge Post'
    const url = 'https://www.prontotools.io/'
    const tags = ['Reseller']
    const createdDate = '2018-03-05T08:39:24+00:00'

    const wrapper = shallow(<EditResource
      id={id}
      name={name}
      type={type}
      url={url}
      tags={tags}
      createdDate={createdDate}
    />)
    const preventDefault = jest.fn()

    wrapper.find('button[name="submit"]').simulate('click', { preventDefault })
    wrapper.setState({
      id,
      name,
      type,
      url,
      tags,
    })

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          identity: {
            low: 756,
            high: 0,
          },
          labels: ['Type', 'Source'],
          properties: {
            name: 'Pronto Tools พวกเราทำอะไร?',
            url: 'https://www.prontotools.io/',
            tags: ['Reseller'],
            type: 'Knowledge Post',
            createdDate: Date('Mon Feb 19 2018 16:00:01'),
          },
        },
      }).then(() => {
        expect(preventDefault).toBeCalled()
        expect(request.url).toBe('http://localhost:5000/resources/756/edit/')
        expect(request.config.method).toBe('post')
        expect(wrapper.state().name).toBe('Pronto Tools พวกเราทำอะไร?')
        expect(wrapper.state().url).toBe('https://www.prontotools.io/')
        expect(wrapper.state().tags).toEqual(['Reseller'])
        const expected = ('<div class="ui main container"><div class="ui centered grid"><div class="twelve wide column"><div class="ui segment"><h1>Edit Resource</h1><form class="ui form"><div class="required field"><label for="name">Name</label><input type="text" name="name" placeholder="Name" value="Pronto Tools พวกเราทำอะไร?" required=""/></div><div class="required field"><label for="url">URL</label><input type="url" name="url" placeholder="URL" value="https://www.prontotools.io/" required=""/></div><div class="field"><label for="name">Tags<div name="tags" role="combobox" aria-expanded="false" class="ui fluid multiple search selection dropdown"><a class="ui label" value="Reseller">Reseller<i aria-hidden="true" class="delete icon"></i></a><input type="text" aria-autocomplete="list" autoComplete="off" class="search" tabindex="0" value=""/><span class="sizer"></span><div class="text" role="alert" aria-live="polite"></div><i aria-hidden="true" class="dropdown icon"></i><div aria-multiselectable="true" role="listbox" class="menu transition"><div class="message">No results found.</div></div></div></label></div><hr/></form><button name="submit" class="ui primary button" type="submit">Save</button><button name="delete" class="ui negative button" type="submit">Delete</button></div></div></div></div>')
        expect(wrapper.html()).toEqual(expected)
        done()
      })
    })
  })

  it('should simulates click submit form when edit resource type Superset Dashboard in fields', (done) => {
    const id = 1
    const name = 'Track Reseller'
    const type = 'Superset Dashboard'
    const url = 'https://www.prontotools.io/'
    const tags = ['Athena']
    const createdDate = '2018-03-05T08:39:24+00:00'

    const wrapper = shallow(<EditResource
      id={id}
      name={name}
      type={type}
      url={url}
      tags={tags}
      createdDate={createdDate}
    />)
    const preventDefault = jest.fn()

    wrapper.find('button[name="submit"]').simulate('click', { preventDefault })
    wrapper.setState({
      id,
      name,
      type,
      url,
      tags,
    })

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          identity: {
            low: 500,
            high: 0,
          },
          labels: ['Type', 'Source'],
          properties: {
            name: 'Track Reseller',
            url: 'https://www.prontotools.io/',
            tags: ['Athena'],
            type: 'Superset Dashboard',
            createdDate: Date('Mon Feb 19 2018 16:00:01'),
          },
        },
      }).then(() => {
        expect(preventDefault).toBeCalled()
        expect(request.url).toBe('http://localhost:5000/resources/1/edit/')
        expect(request.config.method).toBe('post')
        expect(wrapper.state().name).toBe('Track Reseller')
        expect(wrapper.state().url).toBe('https://www.prontotools.io/')
        expect(wrapper.state().tags).toEqual(['Athena'])
        const expected = '<div class="ui main container"><div class="ui centered grid"><div class="twelve wide column"><div class="ui segment"><h1>Edit Resource</h1><form class="ui form"><div class="required field"><label for="name">Name</label><input type="text" name="name" placeholder="Name" value="Track Reseller" required=""/></div><div class="required field"><label for="url">URL</label><input type="url" name="url" placeholder="URL" value="https://www.prontotools.io/" required=""/></div><div class="field"><label for="name">Tags<div name="tags" role="combobox" aria-expanded="false" class="ui fluid multiple search selection dropdown"><a class="ui label" value="Athena">Athena<i aria-hidden="true" class="delete icon"></i></a><input type="text" aria-autocomplete="list" autoComplete="off" class="search" tabindex="0" value=""/><span class="sizer"></span><div class="text" role="alert" aria-live="polite"></div><i aria-hidden="true" class="dropdown icon"></i><div aria-multiselectable="true" role="listbox" class="menu transition"><div class="message">No results found.</div></div></div></label></div><hr/></form><button name="submit" class="ui primary button" type="submit">Save</button><button name="delete" class="ui negative button" type="submit">Delete</button></div></div></div></div>'
        expect(wrapper.html()).toEqual(expected)
        done()
      })
    })
  })
})
