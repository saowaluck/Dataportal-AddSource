import React from 'react'
import moxios from 'moxios'
import mockDate from 'mockdate'
import { mount } from 'enzyme'
import NewsFeed from './../NewsFeed'

describe('<NewsFeed />', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should return days and create action', (done) => {
    const wrapper = mount(<NewsFeed />)
    mockDate.set('2017-12-31T08:15:07.000Z')

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          resources: [
            {
              resource: {
                memberId: 48,
                member: 'kanokwan',
                memberAvatar: 'photo.jpg',
                resourceId: 49,
                name: 'Knokwan',
                type: 'Database',
                createdDate: '2018-01-02T08:15:07+00:00',
                updatedDate: '2018-01-02T08:15:07+00:00',
              },
              favorite: 0,
            },
          ],

        },
      }).then(() => {
        expect(wrapper.html()).toEqual('<div class="ui segments"><div class="ui segment">' +
        '<h3 class="ui header">News Feed</h3></div><div class="ui segment"><div class="ui feed">' +
        '<div class="event"><div class="label"><a href="/members/48"><img src="photo.jpg" alt=""></a></div>' +
        '<div class="content"><div class="date">2 days</div><div class="summary"> create ' +
        '<a href="/resources/49">Knokwan</a></div></div></div></div></div></div>')
        expect(request.url).toBe('http://localhost:5000/resources/')
        expect(request.config.method).toBe('get')
        done()
      })
    })
  })

  it('should return minutes and update action', (done) => {
    const wrapper = mount(<NewsFeed />)
    mockDate.set('2017-12-31T08:15:07.000')

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          resources: [
            {
              resource: {
                memberId: 48,
                member: 'kanokwan',
                memberAvatar: 'photo.jpg',
                resourceId: 49,
                name: 'Knokwan',
                type: 'Database',
                createdDate: '2018-01-30T08:15:07.000',
                updatedDate: '2018-01-31T08:15:07.000',
              },
              favorite: 0,
            },
          ],
        },
      }).then(() => {
        expect(wrapper.html()).toEqual('<div class="ui segments"><div class="ui segment">' +
        '<h3 class="ui header">News Feed</h3></div><div class="ui segment"><div class="ui feed">' +
        '<div class="event"><div class="label"><a href="/members/48"><img src="photo.jpg" alt=""></a></div>' +
        '<div class="content"><div class="date">a month</div><div class="summary"> update ' +
        '<a href="/resources/49">Knokwan</a></div></div></div></div></div></div>')
        expect(request.url).toBe('http://localhost:5000/resources/')
        expect(request.config.method).toBe('get')
        done()
      })
    })
  })

  it('should return hours', (done) => {
    const wrapper = mount(<NewsFeed />)
    mockDate.set('2018-04-04T08:15:07.000Z')

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          resources: [
            {
              resource: {
                memberId: 48,
                member: 'kanokwan',
                memberAvatar: 'photo.jpg',
                resourceId: 49,
                name: 'Knokwan',
                type: 'Database',
                createdDate: '2018-04-04T07:15:07+00:00',
                updatedDate: '2018-04-04T07:15:07+00:00',
              },
              favorite: 0,
            },
          ],
        },
      }).then(() => {
        const expected = '<div class="ui segments"><div class="ui segment">' +
        '<h3 class="ui header">News Feed</h3></div><div class="ui segment"><div class="ui feed">' +
        '<div class="event"><div class="label"><a href="/members/48"><img src="photo.jpg" alt=""></a></div>' +
        '<div class="content"><div class="date">an hour</div><div class="summary"> create ' +
        '<a href="/resources/49">Knokwan</a></div></div></div></div></div></div>'
        expect(wrapper.html()).toEqual(expected)
        expect(request.url).toBe('http://localhost:5000/resources/')
        expect(request.config.method).toBe('get')
        done()
      })
    })
  })

  it('should return months', (done) => {
    const wrapper = mount(<NewsFeed />)
    mockDate.set('2018-04-04T08:15:07.000Z')

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          resources: [
            {
              resource: {
                memberId: 48,
                member: 'kanokwan',
                memberAvatar: 'photo.jpg',
                resourceId: 49,
                name: 'Knokwan',
                type: 'Database',
                createdDate: '2018-02-04T07:15:07+00:00',
                updatedDate: '2018-02-04T07:15:07+00:00',
              },
              favorite: 0,
            },
          ],
        },
      }).then(() => {
        const expected = '<div class="ui segments"><div class="ui segment">' +
        '<h3 class="ui header">News Feed</h3></div><div class="ui segment"><div class="ui feed">' +
        '<div class="event"><div class="label"><a href="/members/48"><img src="photo.jpg" alt=""></a></div>' +
        '<div class="content"><div class="date">2 months</div><div class="summary"> create ' +
        '<a href="/resources/49">Knokwan</a></div></div></div></div></div></div>'
        expect(wrapper.html()).toEqual(expected)
        expect(request.config.method).toBe('get')
        done()
      })
    })
  })

  it('should return years', (done) => {
    const wrapper = mount(<NewsFeed />)
    mockDate.set('2018-04-04T08:15:07.000Z')

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          resources: [
            {
              resource: {
                memberId: 48,
                member: 'kanokwan',
                memberAvatar: 'photo.jpg',
                resourceId: 49,
                name: 'Knokwan',
                type: 'Database',
                createdDate: '2017-02-04T07:15:07+00:00',
                updatedDate: '2017-02-04T07:15:07+00:00',
              },
              favorite: 0,
            },
          ],
        },
      }).then(() => {
        expect(wrapper.html()).toEqual('<div class="ui segments"><div class="ui segment">' +
        '<h3 class="ui header">News Feed</h3></div><div class="ui segment"><div class="ui feed">' +
        '<div class="event"><div class="label"><a href="/members/48"><img src="photo.jpg" alt=""></a></div>' +
        '<div class="content"><div class="date">a year</div><div class="summary"> create ' +
        '<a href="/resources/49">Knokwan</a></div></div></div></div></div></div>')
        expect(request.url).toBe('http://localhost:5000/resources/')
        expect(request.config.method).toBe('get')
        done()
      })
    })
  })
})

