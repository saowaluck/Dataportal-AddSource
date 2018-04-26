const moment = require('moment')
const db = require('./db')
const elasticsearch = require('elasticsearch')

const session = db.session()
const client = new elasticsearch.Client({
  host: 'elasticsearch:9200',
})

const addIndex = (id, name, type, url, tags) => (
  client.index({
    index: 'dataportal',
    type: 'resource',
    id,
    body: {
      name, type, url, tags,
    },
  })
)

const addIndexTypeOfDatabase = (id, name, type, columns, description, tags) => {
  client.index({
    index: 'dataportal',
    type: 'resource',
    id,
    body: {
      name, type, columns, description, tags,
    },
  })
}

const Resource = {
  getResource: async () => {
    const result = await session.run('MATCH n= ((m:Member)-[:created]->(r:Resource)) RETURN n ORDER By r.updatedDate DESC')
    const resources = result.records.map(item => ({
      memberId: item._fields[0].start.identity.low,
      member: item._fields[0].start.properties.name,
      memberAvatar: item._fields[0].start.properties.avatar,
      resourceId: item._fields[0].end.identity.low,
      resourceName: item._fields[0].end.properties.name,
      name: item._fields[0].end.properties.name,
      type: item._fields[0].end.properties.type,
      createdDate: item._fields[0].end.properties.createdDate,
      updatedDate: item._fields[0].end.properties.updatedDate,
    }))
    return resources
  },

  getCreatedResource: async () => {
    const created = await session.run('MATCH (s:Resource) RETURN s ORDER By s.updatedDate DESC')
    return created
  },

  memberCreatedResource: async (resourceId, memberId) => {
    await session.run('MATCH (resource:Resource),(member:Member) ' +
    'WHERE ID(resource) = {resourceId} and ID(member) = {memberId} ' +
    'CREATE (member)-[:created]->(resource) ' +
    'WITH resource as s MATCH n=()-[:created]->() RETURN n', { resourceId, memberId })
  },

  createResource: async (req) => {
    let data
    let resources = []
    if (req.type === 'Database') {
      data = {
        name: req.name,
        description: req.description,
        columns: req.columns.map(row => `${row[0]},${row[1]},${row[2]}`),
        type: req.type,
        createdDate: moment().format(),
      }
      const result = await session
        .run('CREATE n = (:Resource{name:{name}, ' +
        'description:{description}, type:{type}, ' +
        'columns:{columns}, createdDate:{createdDate}, ' +
        'updatedDate:{createdDate}}) RETURN n', {
          name: data.name,
          columns: data.columns,
          type: data.type,
          description: data.description,
          createdDate: data.createdDate,
          updatedDate: data.updatedDate,
        })
      resources = {
        id: Number(result.records[0]._fields[0].start.identity.low),
        name: result.records[0]._fields[0].start.properties.name,
        description: result.records[0]._fields[0].start.properties.description,
        columns: result.records[0]._fields[0].start.properties.columns,
        type: result.records[0]._fields[0].start.properties.type,
        createdDate: result.records[0]._fields[0].start.properties.createdDate,
        updatedDate: result.records[0]._fields[0].start.properties.updatedDate,
      }
      addIndexTypeOfDatabase(
        resources.id,
        resources.name,
        resources.type,
        resources.columns,
        resources.description,
        req.tags,
      )
    } else {
      data = {
        name: req.name,
        url: req.url,
        type: req.type,
        createdDate: moment().format(),
      }
      const isDuplicate = await session.run('MATCH (r:Resource) WHERE r.type = {type} and r.url = {url} RETURN r', {
        type: data.type,
        url: data.url,
      })
      if (isDuplicate.records.length === 0) {
        const result = await session
          .run('CREATE n = (resource:Resource {name:{name}, ' +
        'url:{url}, type:{type}, createdDate:{createdDate}, ' +
        'updatedDate:{createdDate}}) RETURN n', {
            name: data.name,
            url: data.url,
            type: data.type,
            createdDate: data.createdDate,
            updatedDate: data.updatedDate,
          })
        resources = {
          id: Number(result.records[0]._fields[0].start.identity.low),
          name: result.records[0]._fields[0].start.properties.name,
          type: result.records[0]._fields[0].start.properties.type,
          url: result.records[0]._fields[0].start.properties.url,
          createdDate: result.records[0]._fields[0].start.properties.createdDate,
          updatedDate: result.records[0]._fields[0].start.properties.updatedDate,
        }
        addIndex(
          resources.id,
          resources.name,
          resources.type,
          resources.url,
          req.tags,
        )
      }
    }
    return resources
  },

  createResourceHasTag: async (id, tag) => {
    const resource = await session
      .run('MATCH (resource:Resource) WHERE ID(resource) = {id} ' +
      'CREATE (resource)-[:hasTag]->(:Tag{name:{tag}}) ' +
      'WITH resource as s MATCH n=()-[:hasTag]->() RETURN n', { id, tag })
    return resource
  },

  createResourceHasTagDuplicate: async (idresource, idTag) => {
    const resource = await session
      .run('MATCH (resource:Resource) WHERE ID(resource) = {idresource} ' +
        'MATCH (tag:Tag) WHERE ID(tag) = {idTag} ' +
        'CREATE (resource)-[:hasTag]->(tag) ' +
        'WITH resource AS s ' +
        'MATCH n = (s)-[:hasTag]->(tag)  RETURN n', { idresource, idTag })
    return resource
  },

  getResourceById: async (id) => {
    const idResource = Number(id)
    const result = await session.run('MATCH n= ((m:Member)-[:created]->(r:Resource)) WHERE ID(r) = {idResource} RETURN n', { idResource })
    const resources = result.records.map(item => ({
      memberId: item._fields[0].start.identity.low,
      member: item._fields[0].start.properties.name,
      resourceId: item._fields[0].end.identity.low,
      name: item._fields[0].end.properties.name,
      type: item._fields[0].end.properties.type,
      createdDate: moment(item._fields[0].end.properties.createdDate).format('MMM DD, YYYY'),
      updatedDate: moment(item._fields[0].end.properties.updatedDate).format('MMM DD, YYYY'),
    }))
    return resources
  },

  getTypeResourceById: async (id) => {
    const resource = await session.run('MATCH (s:Resource) WHERE ID(s) = {id} RETURN s.type', { id: Number(id) })
    const type = resource.records[0]._fields[0]
    return type
  },

  getResourceByType: async (id, type) => {
    const resource = await session.run('MATCH (s:Resource) WHERE ID(s) = {id} RETURN s', { id })
    const result = await session.run('MATCH (member:Member)-[r:created]->(resource:Resource) WHERE ID(resource) = {id} RETURN member', { id })
    const creator = {
      id: result.records[0]._fields[0].identity.low,
      name: result.records[0]._fields[0].properties.name,
      position: result.records[0]._fields[0].properties.position,
      avatar: result.records[0]._fields[0].properties.avatar,
      email: result.records[0]._fields[0].properties.email,
    }
    if (type === 'Database') {
      const {
        name, columns, description, createdDate, updatedDate,
      } = resource.records[0]._fields[0].properties
      return {
        name, columns, description, type, createdDate, updatedDate, creator,
      }
    }
    const {
      name, url, createdDate, updatedDate,
    } = resource.records[0]._fields[0].properties
    return {
      name, type, url, createdDate, updatedDate, creator,
    }
  },

  hasTags: async (id) => {
    const resource = await session.run('MATCH (s:Resource)-[r:hasTag]->(t:Tag) ' +
    'WHERE ID(s) = {id} RETURN t.name', { id })
    if (resource.records.length !== 0) {
      return true
    }
    return false
  },

  editResource: async (id, req) => {
    let data
    let resources
    if (req.type === 'Database') {
      data = {
        id,
        name: req.name,
        description: req.description,
        columns: req.columns.map(row => `${row[0]},${row[1]},${row[2]}`),
        type: req.type,
        createdDate: req.createdDate,
        updatedDate: moment().format(),
        check_url: req.check_url,
      }
      const result = await session
        .run('MATCH (n :Resource) WHERE ID(n) = {id} ' +
      'SET n = {' +
        'name:{name},' +
        'columns:{columns},' +
        'type:{type},' +
        'description:{description},' +
        'createdDate:{createdDate},' +
        'updatedDate:{updatedDate}}' +
      'RETURN n', {
          id: data.id,
          name: data.name,
          columns: data.columns,
          type: data.type,
          description: data.description,
          createdDate: data.createdDate,
          updatedDate: data.updatedDate,
        })
      resources = {
        id: Number(result.records[0]._fields[0].identity.low),
        name: result.records[0]._fields[0].properties.name,
        description: result.records[0]._fields[0].properties.description,
        columns: result.records[0]._fields[0].properties.columns,
        type: result.records[0]._fields[0].properties.type,
        createdDate: result.records[0]._fields[0].properties.createdDate,
        updatedDate: result.records[0]._fields[0].properties.updatedDate,
      }
      addIndexTypeOfDatabase(
        resources.id,
        resources.name,
        resources.type,
        resources.columns,
        resources.description,
        req.tags,
      )
    } else {
      data = {
        id,
        name: req.name,
        url: req.url,
        type: req.type,
        createdDate: req.createdDate,
        updatedDate: moment().format(),
        check_url: req.check_url,
      }
      const isDuplicate = await session.run('MATCH (r:Resource) WHERE NOT (r.type =~ {type}) OR NOT (r.url =~ {check_url})' +
      'WITH r as resource MATCH (resource) WHERE resource.type = {type} AND resource.url = {url}  RETURN resource', {
        check_url: data.check_url,
        type: data.type,
        url: data.url,
      })
      if (isDuplicate.records.length === 0) {
        const result = await session
          .run('MATCH (n :Resource) WHERE ID(n) = {id} ' +
        'SET n = {' +
          'name:{name},' +
          'url:{url},' +
          'type:{type},' +
          'createdDate:{createdDate},' +
          'updatedDate:{updatedDate}}' +
        'RETURN n', {
            id: data.id,
            name: data.name,
            url: data.url,
            type: data.type,
            createdDate: data.createdDate,
            updatedDate: data.updatedDate,
          })
        resources = {
          id: Number(result.records[0]._fields[0].identity.low),
          name: result.records[0]._fields[0].properties.name,
          type: result.records[0]._fields[0].properties.type,
          url: result.records[0]._fields[0].properties.url,
          createdDate: result.records[0]._fields[0].properties.createdDate,
          updatedDate: result.records[0]._fields[0].properties.updatedDate,
        }
        addIndex(
          resources.id,
          resources.name,
          resources.type,
          resources.url,
          req.tags,
        )
      }
    }
    return resources
  },

  clearRelationchip: async (id) => {
    await session
      .run('MATCH (resource:Resource)-[r:hasTag]->() ' +
      'WHERE ID(resource) = {id} DELETE r ' +
      'RETURN ID(resource)', {
        id,
      })
    return id
  },

  isRelationFavorite: async (id, email) => {
    const result = await session
      .run('MATCH n = (m:Member)-[:favorite]->(r:Resource) WHERE ID(r) = {id} AND m.email = {email} RETURN n', {
        id: Number(id),
        email,
      })
    if (result.records.length > 0) {
      return true
    }
    return false
  },

  addRelationFavorite: async (id, email) => {
    await session
      .run('MATCH  (m:Member),(r:Resource) WHERE ID(r) = {id} AND m.email = {email} ' +
      'CREATE p=(m)-[:favorite]->(r) RETURN p', {
        id: Number(id),
        email,
      })
  },

  deleteRelationFavorite: async (id, email) => {
    await session
      .run('MATCH (m:Member)-[f:favorite]->(r:Resource) ' +
      'WHERE ID(r) = {id} AND m.email = {email} DELETE f', {
        id: Number(id),
        email,
      })
  },

  getFavoriteByResourceId: async (id) => {
    const members = await session
      .run('MATCH (m:Member)-[f:favorite]->(r:Resource) WHERE ID(r)= {id} RETURN m', {
        id: Number(id),
      })
    const data = members.records.map(member => ({
      id: member._fields[0].identity.low,
      name: member._fields[0].properties.name,
      position: member._fields[0].properties.position,
      slack: member._fields[0].properties.slack,
      avatar: member._fields[0].properties.avatar,
    }))
    return data
  },

  deleteResource: async (id) => {
    const result = await session
      .run('MATCH (r:Resource) WHERE ID(r) = {id} DETACH DELETE r', { id })
    if (result.records.length === 0) {
      return true
    }
    return false
  },

  isConsumedByMember: async (id, email) => {
    const consumedDate = moment().format()
    const result = await session
      .run('MATCH n = (m:Member)-[:consumer]->(r:Resource) WHERE ID(r) = {id} AND m.email = {email}' +
      'RETURN n', {
        id: Number(id),
        email,
      })
    if (result.records.length > 0) {
      await session
        .run('MATCH n = (m:Member)-[c:consumer]->(r:Resource) WHERE ID(r) =  {id} AND m.email = {email}' +
        'SET c.consumedDate = {consumedDate} RETURN m', {
          id: Number(id),
          email,
          consumedDate,
        })
    } else {
      await session
        .run('MATCH  (m:Member),(r:Resource) WHERE ID(r) = {id} AND m.email = {email}' +
        'CREATE p=(m)-[:consumer {consumedDate: {consumedDate}}]->(r) RETURN p', {
          id: Number(id),
          email,
          consumedDate,
        })
    }
  },

  getConsumersByResourceId: async (id) => {
    const members = await session
      .run('MATCH (m:Member)-[c:consumer]->(r:Resource) WHERE ID(r)= {id}  RETURN m', {
        id: Number(id),
      })
    const result = members.records.map(member => ({
      id: member._fields[0].identity.low,
      avatar: member._fields[0].properties.avatar,
    }))
    return result
  },

  getResourceIdByRecomment: async (email) => {
    const result = await session
      .run('MATCH (member:Member)-[:favorite]->(resource:Resource)-[:hasTag]->(tag:Tag) ' +
      'WHERE member.email = {email}' +
      'RETURN resource ' +
      'UNION ALL ' +
      'MATCH (member:Member)-[:attend]->(team:Team)-[:pin]->(resource:Resource)-[:hasTag]->(tag:Tag) ' +
      'WHERE member.email = {email} ' +
      'RETURN resource', { email })
    let resourceId = result.records.map(item => item._fields[0].identity.low)
    resourceId = Array.from(new Set(resourceId))
    return resourceId
  },

  getTagByRecomentId: async (resourcesId) => {
    const tags = await session.run('WITH {resourcesId} AS resourceId ' +
      'MATCH (resource:Resource)-[:hasTag]->(tag:Tag) ' +
      'WHERE ID(resource) IN resourceId ' +
      'RETURN tag.name, Count(*) As TagRecomment ' +
      'ORDER BY TagRecomment DESC LIMIT 1', { resourcesId })
    return tags.records.map(item => (
      item._fields[0]
    ))
  },

  getResourceByTagsName: async (tagsName, email) => {
    const result = await session.run('WITH {tagsName} AS tags ' +
    'MATCH (member:Member)-->(resource:Resource)-[:hasTag]->(tag:Tag) ' +
    'WHERE tag.name IN tags ' +
    'AND member.email <> {email} ' +
    'AND (member)-[:created]->(resource) ' +
    'RETURN DISTINCT(resource), Count(*) As RecommentCount ORDER BY resource.updatedDate DESC LIMIT 5', { tagsName, email })
    const resources = result.records.map(item => ({
      id: item._fields[0].identity.low,
      name: item._fields[0].properties.name,
      type: item._fields[0].properties.type,
    }))
    return resources
  },

  getTopFavorite: async (email) => {
    const result = await session.run('MATCH (m:Member)-[f:favorite]-(r:Resource) ' +
    'WHERE m.email <> {email} ' +
    'RETURN r, Count(*) As FavCount ORDER BY FavCount DESC LIMIT 3', { email })
    const resources = result.records.map(item => ({
      id: item._fields[0].identity.low,
      name: item._fields[0].properties.name,
      type: item._fields[0].properties.type,
    }))
    return resources
  },

  searchResource: async (text) => {
    const searchText = `.*(?i)${text}.*`
    const result = await session.run('MATCH (resource:Resource) WHERE resource.name =~ {searchText} RETURN resource ' +
    'UNION MATCH (resource:Resource)-[:hasTag]->(tag:Tag) WHERE tag.name =~ {searchText} RETURN resource ' +
    'UNION MATCH (resource:Resource) WHERE resource.description =~ {searchText} RETURN resource ' +
    'UNION MATCH (resource:Resource) WHERE resource.url =~ {searchText} RETURN resource ' +
    'UNION MATCH (resource:Resource) WHERE resource.columns =~ {searchText} RETURN resource', { searchText })
    const resources = result.records.map(item => ({
      id: item._fields[0].identity.low,
    }))
    return resources
  },

}
session.close()
db.close()
module.exports = Resource
