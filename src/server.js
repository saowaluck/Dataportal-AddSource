const express = require('express')
const bodyParser = require('body-parser')
const sourceRoute = require('./routes/Source')
const teamRoute = require('./routes/Team')

const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/source', sourceRoute)
app.use('/team', teamRoute)

app.listen(5000)
