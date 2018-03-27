const express = require('express')

const app = express()
const supertest = require('supertest')
const request = require('supertest')

supertest.agent('https://localhost:5000')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

describe('server', () => {
  it('should call Get /types', (done) => {
    request(app.listen())
      .get('/api/getType/')
      .expect(200)
      .end(() => {
        done()
      })
  })

  it('should call Get /resource', (done) => {
    request(app.listen())
      .get('/api/getAllResource/')
      .expect(200)
      .end(() => {
        done()
      })
  })

  it('should call Get /resource/:id', (done) => {
    request(app.listen())
      .get('/DisplayResourceDetail/582/')
      .expect(200)
      .end(() => {
        done()
      })
  })

  it('should call Post /resource', (done) => {
    const data = {
      properties: {
        name: 'pronto dashboard',
        type: 'Superset Chart',
        url: 'http://www.prontomarketing.com',
        tag: 'pronto dashboard',
      },
    }
    request(app.listen())
      .post('/addResource/')
      .send(data)
      .expect(200)
      .end(() => {
        done()
      })
  })
})
