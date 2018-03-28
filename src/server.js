const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const elasticsearch = require('elasticsearch')
// const { CronJob } = require('cron')
// const Resource = require('./models/Resource')
const ResourceRoute = require('./routes/Resource')
const TeamRoute = require('./routes/Team')
const MemberRoute = require('./routes/Member')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/resources', ResourceRoute)
app.use('/teams', TeamRoute)
app.use('/members', MemberRoute)

// const client = new elasticsearch.Client({
//   host: 'elasticsearch:9200',
// })

// const rebuildIndex = resources => (
//   resources.records.map(resource => {
//     const { type } = resource._fields[0].properties
//     if (type === 'Database') {
//       return client.index({
//         index: 'dataportal',
//         type: 'resource',
//         id: resource._fields[0].identity.low,
//         body: {
//           name: resource._fields[0].properties.name,
//           type: resource._fields[0].properties.type,
//           columns: resource._fields[0].properties.columns,
//           description: resource._fields[0].properties.description,
//           createdDate: resource._fields[0].properties.createdDate,
//         },
//       })
//     }
//     return client.index({
//       index: 'dataportal',
//       type: 'resource',
//       id: resource._fields[0].identity.low,
//       body: {
//         name: resource._fields[0].properties.name,
//         type: resource._fields[0].properties.type,
//         url: resource._fields[0].properties.url,
//         createdDate: resource._fields[0].properties.createdDate,
//       },
//     })
//   })
// )

// const job = new CronJob({
//   cronTime: '2 * * * * *',
//   onTick: async () => {
//     const resources = await Resource.getResource()
//     return rebuildIndex(resources)
//   },
//   start: false,
//   timeZone: 'UTC',
// })
// job.start()

app.listen(5000)
