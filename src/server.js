const dotenv = require('dotenv')
const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const neo4j = require('neo4j-driver').v1

dotenv.config()
app.listen(process.env.API_PORT)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const db = neo4j.driver(
  'bolt://db:7687',
  neo4j.auth.basic(
    process.env.DB_NAME,
    process.env.DB_PASSWORD,
  ),
)
const session = db.session()

app.get('/api/types/', (req, res) => {
  const getType = session.run('MATCH (n:Source) RETURN distinct(n.type)')
  getType.then((result) => {
    session.close()
    const types = result.records.map(item => ({
      type: item._fields[0],
    }))
    res.json(types)
    db.close()
  })
})

app.get('/api/source/', (req, res) => {
  const getAllSource = session.run('MATCH (s:Source) RETURN s')
  getAllSource.then((result) => {
    session.close()
    const data = result.records.map(item => ({
      id: item._fields[0].identity.low,
      name: item._fields[0].properties.name,
      type: item._fields[0].properties.type,
      url: item._fields[0].properties.url,
    }))
    res.json(data)
    db.close()
  })
})

app.get('/source/:id/', (req, res) => {
  const getSource = session.run('MATCH (n :Source) WHERE ID(n) = {id} RETURN n', { id: Number(req.params.id) })
  getSource.then((result) => {
    session.close()
    const data = result.records.map(item => ({
      name: item._fields[0].properties.name,
      type: item._fields[0].properties.type,
      url: item._fields[0].properties.url,
    }))
    res.json(data)
    db.close()
  })
})

app.post('/source/', (req, res) => {
  const getSource = session.run(
    'CREATE n = (source:Source:Type {name:{name}, url:{url}, type:{type}, tag:{tag}}) RETURN n',
    {
      name: req.body.name,
      url: req.body.url,
      type: req.body.type,
      tag: req.body.tag,
    },
  )
  getSource.then((result) => {
    session.close()
    res.json(result.records[0]._fields[0].start)
    db.close()
  })
})
