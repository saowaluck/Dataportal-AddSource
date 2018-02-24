const express = require('express')
const elasticsearch = require('elasticsearch')
const Source = require('../models/Source')
const Tag = require('../models/Tags')

const router = express.Router()

const client = new elasticsearch.Client({
  host: 'elasticsearch:9200',
})

const addToIndex = (sources) => (
  sources.records.map(source => (
    client.index({
      index: 'dataportal',
      type: 'source',
      id: source._fields[0].identity.low,
      body: {
        name: source._fields[0].properties.name,
        type: source._fields[0].properties.type,
        url: source._fields[0].properties.url,
        createdDate: source._fields[0].properties.createdDate,
      },
    })
  ))
)

const cleanTags = (tags) => {
  const result = tags.map((tag) => {
    let cleanTag = tag.trim()
    cleanTag = cleanTag.replace(/ /g, '_')
    cleanTag = cleanTag.toLowerCase()
    return cleanTag
  })
  return result
}

router.get('/search/:text/', async (req, res) => {
  const { text } = req.params
  let sources = await Source.getSource()
  addToIndex(sources)

  sources = await client.search({ q: text })
  const data = sources.hits.hits.map(source => ({
    id: source._id,
    name: source._source.name,
    type: source._source.type,
    url: source._source.url,
    createdDate: source._source.createdDate,
  }))
  res.status(200).json(data)
})

router.get('/', async (req, res) => {
  const sources = await Source.getSource()
  const data = sources.records.map(source => ({
    id: source._fields[0].identity.low,
    name: source._fields[0].properties.name,
    type: source._fields[0].properties.type,
    url: source._fields[0].properties.url,
    createdDate: source._fields[0].properties.createdDate,
  }))
  res.status(200).json(data)
})

router.post('/', async (req, res) => {
  const { type, tags } = req.body
  let sources = []
  if (type === 'Superset Dashboard') {
    const { name, url } = req.body
    sources = await Source.createSourceTypeOfSuperset(name, url, type)
  } else if (type === 'Database') {
    const columns = req.body.columns.map(row => `${row[0]},${row[1]},${row[2]}`)
    const { name, description } = req.body
    sources = await Source.createSourceTypeOfDataBase(name, description, type, columns)
  } else if (type === 'Knowledge Post') {
    const { name, url } = req.body
    sources = await Source.createSourceTypeOfKnowledgePost(name, url, type)
  }

  const sourceId = Number(sources.records[0]._fields[0].start.identity.low)

  if (tags !== '') {
    const tagsCleaned = cleanTags(tags)
    sources = await Promise.all(tagsCleaned.map(async (tag) => {
      let result = await Tag.getTagsByName(tag)
      if (result.records.length === 0) {
        result = await Source.createSourceHasTag(sourceId, tag)
      } else {
        const tagId = result.records[0]._fields[0].identity.low
        result = await Source.createSourceHasTagDuplicate(sourceId, tagId)
      }
      return result
    }))
  }
  res.json({ id: sourceId })
})

router.get('/:id/', async (req, res) => {
  const id = Number(req.params.id)
  let source = ''
  let tags = []
  const type = await Source.getTypeSourceById(id)
  const status = await Source.hasTags(id)
  if (type === 'Superset Dashboard') {
    source = await Source.getSourceByType(id, type)
  } else if (type === 'Knowledge Post') {
    source = await Source.getSourceByType(id, type)
  } else {
    source = await Source.getSourceByType(id, type)
  }

  if (status) {
    tags = await Tag.getTagsBySourceId(id)
  }
  res.json({ source, tags })
})

router.post('/edit/', async (req, res) => {
  const { type, tags } = req.body
  let sources = []
  if (type === 'Superset Dashboard') {
    const { id, name, url } = req.body
    sources = await Source.editSourceTypeOfSuperset(id, name, url, type)
  } else if (type === 'Database') {
    const columns = req.body.columns.map(row => `${row[0]},${row[1]},${row[2]}`)
    const { id, name, description } = req.body
    sources = await Source.editSourceTypeOfDataBase(id, name, columns, type, description)
  } else if (type === 'Knowledge Post') {
    const { id, name, url } = req.body
    sources = await Source.editSourceTypeOfKnowledgePost(id, name, url, type)
  }

  const sourceId = Number(sources.records[0]._fields[0].identity.low)

  if (tags !== '') {
    const tagsCleaned = cleanTags(tags)
    sources = await Promise.all(tagsCleaned.map(async (tag) => {
      let result = await Tag.getTagsByName(tag)
      const id = await Source.clearRelationchip(sourceId)
      if (result.records.length === 0) {
        result = await Source.createSourceHasTag(id, tag)
      } else {
        const tagId = result.records[0]._fields[0].identity.low
        result = await Source.createSourceHasTagDuplicate(id, tagId)
      }
      return result
    }))
  }
  res.json({ id: sourceId })
})

module.exports = router
