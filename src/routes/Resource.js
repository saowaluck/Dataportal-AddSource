const express = require('express')
const elasticsearch = require('elasticsearch')

const Resource = require('../models/Resource')
const Tag = require('../models/Tags')
const Member = require('../models/Member')

const router = express.Router()

const client = new elasticsearch.Client({
  host: 'elasticsearch:9200',
})

const cleanTags = (tags) => {
  const result = tags.map((tag) => {
    let cleanTag = tag.trim()
    cleanTag = cleanTag.replace(/ /g, '_')
    cleanTag = cleanTag.toLowerCase()
    return cleanTag
  })
  return result
}

router.post('/:id/favorites/', async (req, res) => {
  const { id } = req.params
  const email = req.body.memberEmail
  let isFavorite = await Resource.isRelationFavorite(id, email)
  if (isFavorite) {
    await Resource.deleteRelationFavorite(id, email)
    isFavorite = false
  } else {
    await Resource.addRelationFavorite(id, email)
    isFavorite = true
  }
  const members = await Resource.getFavoriteByResourceId(id)
  res.json({ isFavorite, members })
})

router.get('/:id/favorites/', async (req, res) => {
  const { id } = req.params
  const email = req.query.memberEmail
  const isFavorite = await Resource.isRelationFavorite(id, email)
  const members = await Resource.getFavoriteByResourceId(id)
  res.json({ isFavorite, members })
})

router.get('/search/:text/', async (req, res) => {
  const { text } = req.params
  const result = await client.search({ q: text })
  const data = await Promise.all(result.hits.hits.map(async (item) => {
    const results = await Resource.getResourceById(item._id)
    return results
  }))
  const resources = await Promise.all(data.map(async (item) => {
    const favorites = await Resource.getFavoriteByResourceId(item[0].resourceID)
    return { resource: item[0], favorite: favorites.length }
  }))
  res.status(200).json({ resources })
})

router.get('/', async (req, res) => {
  const result = await Resource.getResource()
  const resources = await Promise.all(result.map(async (item) => {
    const favorites = await Resource.getFavoriteByResourceId(item.resourceID)
    return { resource: item, favorite: favorites.length }
  }))
  res.status(200).json({ resources })
})

router.post('/', async (req, res) => {
  let resources
  let resourceId = 'undefined'
  const member = await Member.getMemberByEmail(req.body.email)
  resources = await Resource.createResource(req.body)
  if (resources.length !== 0) {
    resourceId = Number(resources.id)
    const memberId = Number(member.id)
    resources = await Resource.memberCreatedResource(resourceId, memberId)
    const { tags } = req.body
    if (tags !== '') {
      const tagsCleaned = cleanTags(tags)
      resources = await Promise.all(tagsCleaned.map(async (tag) => {
        let result = await Tag.getTagsByName(tag)
        if (result.records.length === 0) {
          result = await Resource.createResourceHasTag(resourceId, tag)
        } else {
          const tagId = result.records[0]._fields[0].identity.low
          result = await Resource.createResourceHasTagDuplicate(resourceId, tagId)
        }
        return result
      }))
    }
  }
  res.json({ id: resourceId })
})

router.get('/:id/', async (req, res) => {
  const id = Number(req.params.id)
  let resource = ''
  let tags = []
  let relatedResources = []
  const type = await Resource.getTypeResourceById(id)
  const status = await Resource.hasTags(id)
  resource = await Resource.getResourceByType(id, type)

  if (status) {
    tags = await Tag.getTagsByResourceId(id)
  }
  const text = resource.name
  const result = await client.search({ q: text, size: 5 })
  const related = result.hits.hits.filter(item => Number(item._id) !== Number(id))
  relatedResources = related.map(item => ({
    id: item._id,
    name: item._source.name,
    type: item._source.type,
  }))
  res.json({ resource, tags, relatedResources })
})

router.post('/:id/edit/', async (req, res) => {
  const id = Number(req.params.id)
  const { tags } = req.body
  const resource = await Resource.editResource(id, req.body)
  await Resource.clearRelationchip(id)
  if (tags !== '') {
    const tagsCleaned = cleanTags(tags)
    await Promise.all(tagsCleaned.map(async (tag) => {
      let result = await Tag.getTagsByName(tag)
      if (result.records.length === 0) {
        result = await Resource.createResourceHasTag(id, tag)
      } else {
        const tagId = result.records[0]._fields[0].identity.low
        result = await Resource.createResourceHasTagDuplicate(id, tagId)
      }
      return result
    }))
  }
  res.json({ id: resource.id })
})

module.exports = router

