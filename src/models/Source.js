const moment = require('moment')
const db = require('./db')

const session = db.session()
const Source = {
  getSource: async () => {
    const sources = await session.run('MATCH (s:Source) RETURN s ORDER By s.createdDate DESC')
    return sources
  },

  createSourceTypeOfSuperset: async (name, url, type) => {
    const createdDate = moment().format()
    const source = await session
      .run('CREATE n = (source:Source {name:{name}, ' +
      'url:{url}, type:{type}, createdDate:{createdDate}}) RETURN n', {
        name, url, type, createdDate,
      })
    return source
  },

  createSourceTypeOfDataBase: async (name, description, type, columns) => {
    const createdDate = moment().format()
    const source = await session
      .run('CREATE n = (:Source{name:{name}, ' +
      'description:{description}, type:{type}, ' +
      'columns:{columns}, createdDate:{createdDate}}) RETURN n', {
        name, description, type, columns, createdDate,
      })
    return source
  },

  createSourceTypeOfKnowledgePost: async (name, url, type) => {
    const createdDate = moment().format()
    const source = await session
      .run('CREATE n = (source:Source {name:{name}, ' +
      'url:{url}, type:{type}, createdDate:{createdDate}}) ' +
      'RETURN n', {
        name, url, type, createdDate,
      })
    return source
  },

  createSourceHasTag: async (id, tag) => {
    const source = await session
      .run('MATCH (source:Source) WHERE ID(source) = {id} ' +
      'CREATE (source)-[:hasTag]->(:Tag{name:{tag}}) ' +
      'WITH source as s MATCH n=()-[:hasTag]->() RETURN n', { id, tag })
    return source
  },

  createSourceHasTagDuplicate: async (idSource, idTag) => {
    const source = await session
      .run('MATCH (source:Source) WHERE ID(source) = {idSource} ' +
        'MATCH (tag:Tag) WHERE ID(tag) = {idTag} ' +
        'CREATE (source)-[:hasTag]->(tag) ' +
        'WITH source AS s ' +
        'MATCH n = (s)-[:hasTag]->(tag)  RETURN n', { idSource, idTag })
    return source
  },

  getSourceById: async (id) => {
    const source = await session.run('MATCH (n :Source) WHERE ID(n) = {id} RETURN n', { id })
    return source
  },

  getTypeSourceById: async (id) => {
    const source = await session.run('MATCH (s:Source) WHERE ID(s) = {id} RETURN s.type', { id })
    const type = source.records[0]._fields[0]
    return type
  },

  getSourceByType: async (id, type) => {
    if (type === 'Database') {
      const source = await session.run('MATCH (s:Source) ' +
      'WHERE ID(s) = {id} ' +
      'RETURN s', { id })
      const {
        name, columns, description, createdDate,
      } = source.records[0]._fields[0].properties
      return {
        name, columns, description, createdDate, type,
      }
    }
    const source = await session.run('MATCH (s:Source) ' +
    'WHERE ID(s) = {id} ' +
    'RETURN s', { id })
    const {
      name, createdDate, url,
    } = source.records[0]._fields[0].properties
    return {
      name, createdDate, type, url,
    }
  },

  hasTags: async (id) => {
    const source = await session.run('MATCH (s:Source)-[r:hasTag]->(t:Tag) ' +
    'WHERE ID(s) = {id} RETURN t.name', { id })
    if (source.records.length !== 0) {
      return true
    }
    return false
  },

  editSourceTypeOfSuperset: async (id, name, url, type) => {
    const createdDate = moment().format()
    const source = await session
      .run('MATCH (n :Source) WHERE ID(n) = {id} ' +
      'SET n = {' +
        'name:{name},' +
        'url:{url},' +
        'type:{type},' +
        'createdDate:{createdDate}}' +
      'RETURN n', {
        id, name, url, type, createdDate,
      })
    return source
  },

  editSourceTypeOfDataBase: async (id, name, columns, type, description) => {
    const createdDate = moment().format()
    const source = await session
      .run('MATCH (n :Source) WHERE ID(n) = {id} ' +
      'SET n = {' +
        'name:{name},' +
        'columns:{columns},' +
        'type:{type},' +
        'description:{description},' +
        'createdDate:{createdDate}}' +
      'RETURN n', {
        id, name, columns, type, description, createdDate,
      })
    return source
  },

  editSourceTypeOfKnowledgePost: async (id, name, url, type) => {
    const createdDate = moment().format()
    const source = await session
      .run('MATCH (n :Source) WHERE ID(n) = {id} ' +
      'SET n = {' +
        'name:{name},' +
        'url:{url},' +
        'type:{type},' +
        'createdDate:{createdDate}}' +
      'RETURN n', {
        id, name, url, type, createdDate,
      })
    return source
  },

  clearRelationchip: async (id) => {
    await session
      .run('MATCH (source:Source)-[r:hasTag]->() ' +
      'WHERE ID(source) = {id} DELETE r ' +
      'RETURN ID(source)', {
        id,
      })
    return id
  },

}
session.close()
db.close()
module.exports = Source
