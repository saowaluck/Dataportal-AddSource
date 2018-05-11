const express = require('express')
const elasticsearch = require('elasticsearch')

const Resource = require('../models/Resource')
const Tag = require('../models/Tag')
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

router.get('/recomment/', async (req, res) => {
  let resources = []
  const email = req.query.memberEmail
  const resourcesId = await Resource.getResourceIdByRecomment(email)
  const tagsName = await Resource.getTagByRecomentId(resourcesId)
  resources = await Resource.getResourceByTagsName(tagsName, email)
  if (resources.length === 0) {
    resources = await Resource.getTopFavorite(email)
  }
  res.json(resources)
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
  const related = await Resource.getRelatedResource(tags)
  relatedResources = related.filter(item => Number(item.id) !== Number(id))
  res.json({
    resource, tags, relatedResources,
  })
})

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

router.get('/:id/relation/', async (req, res) => {
  const id = Number(req.params.id)
  const relation = await Resource.getRelation(id)
  res.json(relation)
})

router.get('/:id/favorites/', async (req, res) => {
  const { id } = req.params
  const email = req.query.memberEmail
  const isFavorite = await Resource.isRelationFavorite(id, email)
  const members = await Resource.getFavoriteByResourceId(id)
  res.json({ isFavorite, members })
})

router.get('/:id/consumers/', async (req, res) => {
  const id = Number(req.params.id)
  const consumed = await Resource.getConsumersByResourceId(id)
  res.json({ consumed })
})

router.post('/:id/edit/', async (req, res) => {
  const id = Number(req.params.id)
  const { tags } = req.body
  const resources = await Resource.editResource(id, req.body)
  if (resources !== undefined) {
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
    res.json({ id: resources.id })
  } else {
    res.json({ id: resources })
  }
})

router.post('/:id/delete/', async (req, res) => {
  const id = Number(req.params.id)
  const deleted = await Resource.deleteResource(id)
  res.json({ deleted })
})

router.post('/:id/consumers/', async req => {
  const { id } = req.params
  const email = req.query.memberEmail
  await Resource.isConsumedByMember(id, email)
})

router.get('/search/:text/', async (req, res) => {
  const { text } = req.params
  let data = []
  if (req.query.checked) {
    const result = await Resource.searchResource(text)
    data = await Promise.all(result.map(async (item) => {
      const results = await Resource.getResourceById(item.id)
      return results
    }))
  } else {
    const result = await client.search({ q: text })
    data = await Promise.all(result.hits.hits.map(async (item) => {
      const results = await Resource.getResourceById(item._id)
      return results
    }))
  }
  const resources = await Promise.all(data.map(async (item) => {
    const favorites = await Resource.getFavoriteByResourceId(Number(item[0].resourceId))
    return { resource: item[0], favorite: favorites.length }
  }))
  res.status(200).json({ resources })
})

router.get('/', async (req, res) => {
  const result = await Resource.getResource()
  const resources = await Promise.all(result.map(async (item) => {
    const favorites = await Resource.getFavoriteByResourceId(Number(item.resourceId))
    return { resource: item, favorite: favorites.length }
  }))
  res.status(200).json({ resources })
})

router.post('/', async (req, res) => {
  let resources
  const member = await Member.getMemberByEmail(req.body.email)
  resources = await Resource.createResource(req.body)
  if (resources.isDuplicate !== true) {
    const resourceId = Number(resources.id)
    await Resource.addRelationFavorite(resourceId, req.body.email)
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
    res.json({ id: resourceId })
  } else {
    res.json(resources)
  }
})

module.exports = router
