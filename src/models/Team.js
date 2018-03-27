const moment = require('moment')
const db = require('./db')

const session = db.session()

const Team = {
  createTeams: async (name, description) => {
    const createdDate = moment().format()
    const team = await session
      .run('CREATE n = (teams:Team {name:{name}, ' +
      'description:{description}, ' +
      'createdDate:{createdDate}}) RETURN n', {
        name, description, createdDate,
      })
    const result = {
      id: team.records[0]._fields[0].start.identity.low,
      name: team.records[0]._fields[0].start.properties.name,
      description: team.records[0]._fields[0].start.properties.description,
    }
    return result
  },

  getTeamById: async id => {
    const result = await session.run('MATCH (n :Team) WHERE ID(n) = {id} RETURN n', { id })
    const team = {
      id: result.records[0]._fields[0].identity.low,
      name: result.records[0]._fields[0].properties.name,
      description: result.records[0]._fields[0].properties.description,
    }
    return team
  },

  getMembersOfTeam: async id => {
    const result = await session.run('MATCH (member:Member)-[:attend]->(team:Team) WHERE ID(team) = {id} RETURN member', { id })
    const members = result.records.map(item => ({
      id: item._fields[0].identity.low,
      name: item._fields[0].properties.name,
      position: item._fields[0].properties.position,
      email: item._fields[0].properties.email,
      slack: item._fields[0].properties.slack,
      avatar: item._fields[0].properties.avatar,
    }))
    return members
  },

  getTeam: async () => {
    const result = await session.run('MATCH (n:Team) RETURN n')
    const teams = result.records.map(item => ({
      id: item._fields[0].identity.low,
      name: item._fields[0].properties.name,
      description: item._fields[0].properties.description,
    }))
    return teams
  },

  isRelationTeam: async (id, email) => {
    const result = await session.run('MATCH n = (m:Member)-[:attend]->(t:Team)' +
    'WHERE ID(t) = {id} AND m.email = {email} RETURN n', {
      id: Number(id),
      email,
    })
    if (result.records.length > 0) {
      return true
    }
    return false
  },

  addAttendTeam: async (id, email) => {
    const result = await session.run('MATCH (m:Member),(t:Team) WHERE ID(t) = {id}' +
    'AND m.email = {email} CREATE result=(m)-[:attend]->(t)' +
    'RETURN result', {
      id: Number(id),
      email,
    })
    return result
  },

  deleteAttendTeam: async (id, email) => {
    const result = await session.run('MATCH n = (m:Member)-[a:attend]->(t:Team)' +
    'WHERE ID(t) = {id} AND m.email = {email} DELETE a', {
      id: Number(id),
      email,
    })
    return result
  },
}

session.close()
db.close()
module.exports = Team
