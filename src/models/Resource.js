const moment = require('moment')
const db = require('./db')
const elasticsearch = require('elasticsearch')

const session = db.session()
const client = new elasticsearch.Client({
  host: 'elasticsearch:9200',
})

const addIndex = (id, name, type, url) => (
  client.index({
    index: 'dataportal',
    type: 'resource',
    id,
    body: {
      name, type, url, createdDate: moment().format(),
    },
  })
)

const addIndexTypeOfDatabase = (id, name, type, columns, description) => {
  client.index({
    index: 'dataportal',
    type: 'resource',
    id,
    body: {
      name, type, columns, description, createdDate: moment().format(),
    },
  })
}

const Resource = {
  getResource: async () => {
    const result = await session.run('MATCH n= ((m:Member)-[:created]->(r:Resource)) RETURN n ORDER By r.updatedDate DESC')
    const resources = result.records.map(item => ({
      memberID: item._fields[0].start.identity.low,
      member: item._fields[0].start.properties.name,
      resourceID: item._fields[0].end.identity.low,
      name: item._fields[0].end.properties.name,
      type: item._fields[0].end.properties.type,
      createdDate: moment(item._fields[0].end.properties.createdDate).format('MMM DD, YYYY'),
      updatedDate: moment(item._fields[0].end.properties.updatedDate).format('MMM DD, YYYY'),
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
      )
    } else {
      data = {
        name: req.name,
        url: req.url,
        type: req.type,
        createdDate: moment().format(),
      }
      const check = await session.run('MATCH (r:Resource) WHERE r.type = {type} and r.url = {url} RETURN r', {
        type: data.type,
        url: data.url,
      })
      if (check.records.length === 0) {
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
      memberID: item._fields[0].start.identity.low,
      member: item._fields[0].start.properties.name,
      resourceID: item._fields[0].end.identity.low,
      name: item._fields[0].end.properties.name,
      type: item._fields[0].end.properties.type,
      createdDate: moment(item._fields[0].end.properties.createdDate).format('MMM DD, YYYY'),
      updatedDate: moment(item._fields[0].end.properties.updatedDate).format('MMM DD, YYYY'),
    }))
    return resources
  },

  getTypeResourceById: async (id) => {
    const resource = await session.run('MATCH (s:Resource) WHERE ID(s) = {id} RETURN s.type', { id })
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
      )
    } else {
      data = {
        id,
        name: req.name,
        url: req.url,
        type: req.type,
        createdDate: req.createdDate,
        updatedDate: moment().format(),
      }
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
      )
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

}
session.close()
db.close()
module.exports = Resource
