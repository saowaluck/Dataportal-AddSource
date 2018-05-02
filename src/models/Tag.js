const db = require('./db')

const session = db.session()

const Tags = {
  getTagsByName: async (name) => {
    const tags = await session.run('MATCH (tag:Tag) WHERE tag.name = {name} Return tag', { name })
    return tags
  },

  getTagsByResourceId: async (id) => {
    let tags = await session.run(`MATCH (s:Resource)-[:hasTag]->(t:Tag) WHERE ID(s) = ${id} RETURN t`)
    tags = tags.records.map(item => item._fields[0].properties.name)
    return tags
  },

  getTags: async () => {
    let tags = await session.run('MATCH (n:Tag) RETURN n')
    tags = tags.records.map(item => item._fields[0].properties.name)
    return tags
  },
}

module.exports = Tags
