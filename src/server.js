const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const elasticsearch = require('elasticsearch')
const { CronJob } = require('cron')
const Resource = require('./models/Resource')
const Tag = require('./models/Tag')
const ResourceRoute = require('./routes/Resource')
const TeamRoute = require('./routes/Team')
const MemberRoute = require('./routes/Member')
const TagRoute = require('./routes/Tag')


const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/resources', ResourceRoute)
app.use('/teams', TeamRoute)
app.use('/members', MemberRoute)
app.use('/tags', TagRoute)

const client = new elasticsearch.Client({
  host: 'elasticsearch:9200',
})

const getTags = async (id) => {
  let tags = ['']
  const hasTags = await Resource.hasTags(id)
  if (hasTags) {
    tags = await Tag.getTagsByResourceId(id)
  }
  return tags
}

const rebuildIndex = resources => (
  Promise.all(resources.map(async resource => {
    const { type } = resource
    const tag = await getTags(resource.resourceId)
    if (type === 'Database') {
      return client.index({
        index: 'dataportal',
        type: 'resource',
        id: resource.resourceId,
        body: {
          name: resource.name,
          type: resource.type,
          columns: resource.columns,
          description: resource.description,
          tag,
        },
      })
    }
    return client.index({
      index: 'dataportal',
      type: 'resource',
      id: resource.resourceId,
      body: {
        name: resource.name,
        type: resource.type,
        url: resource.url,
        tag,
      },
    })
  }))
)

const job = new CronJob({
  cronTime: '2 * * * * *',
  onTick: async () => {
    const resources = await Resource.getResource()
    return rebuildIndex(resources)
  },
  start: false,
  timeZone: 'UTC',
})
job.start()

app.listen(5000)
