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
  const getAllSource = session.run('MATCH p=()-[r:Add]->() RETURN p')
  getAllSource.then((result) => {
    session.close()
    const data = result.records.map(item => ({
      id: item._fields[0].end.identity.low,
      name: item._fields[0].end.properties.name,
      type: item._fields[0].end.properties.type,
      url: item._fields[0].end.properties.url,
      dateofCreate: item._fields[0].end.properties.dateofCreate,
      dateofUpdate: item._fields[0].end.properties.dateofUpdate,
      creator:item._fields[0].start.properties.name
    }))
    res.json(data)
    db.close()
  })
})

app.get('/source/:id/', (req, res) => {
  const getSource = session.run('MATCH p=()-[r:Add]->() WHERE ID(r) = {id} RETURN p', { id: Number(req.params.id) })
  getSource.then((result) => {
    session.close()
    const data = result.records.map(item => ({
      id: item._fields[0].end.identity.low,
      name: item._fields[0].end.properties.name,
      type: item._fields[0].end.properties.type,
      url: item._fields[0].end.properties.url,
      dateofCreate: item._fields[0].end.properties.dateofCreate,
      dateofUpdate: item._fields[0].end.properties.dateofUpdate,
      creator:item._fields[0].start.properties.name
    }))
    res.json(data)
    db.close()
  })
})

app.post('/source/', (req, res) => {
  const getSource = session.run(
    'CREATE n = (user:User{name:{creator}})-[:Add]->(source:Source:Type {name:{name}, url:{url}, type:{type}, tag:{tag}, dateofCreate:{dateofCreate}, dateofUpdate:{dateofUpdate}}) RETURN n',
    {
      creator: req.body.creator,
      name: req.body.name,
      url: req.body.url,
      type: req.body.type,
      tag: req.body.tag,
      dateofCreate: req.body.dateofCreate,
      dateofUpdate: req.body.dateofUpdate
    },
  )
  getSource.then((result) => {
    session.close()
    res.json(result.records[0]._fields[0].end.identity.low)
    db.close()
  })
})
