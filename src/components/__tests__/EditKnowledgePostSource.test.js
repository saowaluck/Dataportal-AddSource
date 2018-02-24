import React from 'react'
import moxios from 'moxios'
import { shallow } from 'enzyme'
import EditKnowledgePostSource from './../EditKnowledgePostSource'

describe('<EditKnowledgePostSource />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should render edit form', () => {
    const id = 10
    const name = 'Track Reseller'
    const type = 'Knowledge Post'
    const url = 'https://www.prontotools.io/'
    const tags = ['Reseller', 'Knowledge']

    const wrapper = shallow(<EditKnowledgePostSource
      id={id}
      name={name}
      type={type}
      url={url}
      tags={tags}
    />)
    const form = wrapper.find('form')

    expect(form.length).toBe(1)
    expect(form.find('input[name="name"]').length).toBe(1)
    expect(form.find('input[name="url"]').length).toBe(1)
    expect(form.find('Dropdown[name="tags"]').length).toBe(1)
    expect(form.find('button[type="submit"]').length).toBe(1)
  })


  it('should simulates click submit form when edit data in fields', (done) => {
    const id = 756
    const name = 'Pronto Tools พวกเราทำอะไร?'
    const type = 'Knowledge Post'
    const url = 'https://www.prontotools.io/'
    const tags = ['Reseller']

    const wrapper = shallow(<EditKnowledgePostSource
      id={id}
      name={name}
      type={type}
      url={url}
      tags={tags}
    />)
    const preventDefault = jest.fn()

    wrapper.find('form').simulate('submit', { preventDefault })
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
            dateofcreate: Date('Mon Feb 19 2018 08:00:51'),
          },
        },
      }).then(() => {
        expect(preventDefault).toBeCalled()
        expect(wrapper.state().isSubmit).toBeTruthy()
        expect(request.url).toBe('http://localhost:5000/source/edit/')
        expect(request.config.method).toBe('post')
        expect(wrapper.state().name).toBe('Pronto Tools พวกเราทำอะไร?')
        expect(wrapper.state().url).toBe('https://www.prontotools.io/')
        expect(wrapper.state().tags).toEqual(['Reseller'])
        const expected = ('<div class="ui main container"><div class="ui centered grid"><div class="twelve wide column"><div class="ui segment"><h1>Edit Resource</h1>' +
        '<form class="ui form"><div class="field"><label for="name">Name<input type="text" name="name" placeholder="Name" value="Pronto Tools พวกเราทำอะไร?" required=""/></label></div>' +
        '<div class="field"><label for="url">URL<input type="url" name="url" placeholder="URL" value="https://www.prontotools.io/" required=""/></label></div><div class="field">' +
        '<label for="tag">Tag<div name="tags" role="combobox" aria-expanded="false" class="ui fluid multiple search selection dropdown">' +
        '<a class="ui label" value="Reseller">Reseller<i aria-hidden="true" class="delete icon"></i></a>' +
        '<input type="text" aria-autocomplete="list" autoComplete="off" class="search" tabindex="0" value=""/><span class="sizer"></span>' +
        '<div class="text" role="alert" aria-live="polite"></div><i aria-hidden="true" class="dropdown icon"></i>' +
        '<div aria-multiselectable="true" role="listbox" class="menu transition"><div class="message">No results found.</div></div></div></label></div><hr/>' +
        '<button class="ui primary button" type="submit">Save</button></form></div></div></div></div>')
        expect(wrapper.html()).toEqual(expected)
        done()
      })
    })
  })
})
