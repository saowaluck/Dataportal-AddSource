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

  it('should call Get /source', (done) => {
    request(app.listen())
      .get('/api/getAllSource/')
      .expect(200)
      .end(() => {
        done()
      })
  })

  it('should call Get /source/:id', (done) => {
    request(app.listen())
      .get('/DisplaySourceDetail/582/')
      .expect(200)
      .end(() => {
        done()
      })
  })

  it('should call Post /source', (done) => {
    const data = {
      properties: {
        name: 'pronto dashboard',
        type: 'Superset Chart',
        url: 'http://www.prontomarketing.com',
        tag: 'pronto dashboard',
      },
    }
    request(app.listen())
      .post('/addSource/')
      .send(data)
      .expect(200)
      .end(() => {
        done()
      })
  })
})
