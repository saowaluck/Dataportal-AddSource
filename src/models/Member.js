const db = require('./db')

const session = db.session()

const Member = {
  getMemberById: async (id) => {
    const cql = `MATCH (n :Member) WHERE ID(n) = ${id} RETURN n`
    const result = await session.run(cql)
    const member = {
      id: result.records[0]._fields[0].identity.low,
      name: result.records[0]._fields[0].properties.name,
      position: result.records[0]._fields[0].properties.position,
      email: result.records[0]._fields[0].properties.email,
      slack: result.records[0]._fields[0].properties.slack,
      avatar: result.records[0]._fields[0].properties.avatar,
      role: result.records[0]._fields[0].properties.role,
    }
    return member
  },

  getAllMember: async () => {
    const cql = 'MATCH (m:Member) RETURN m'
    const result = await session.run(cql)
    const member = result.records.map(item => ({
      id: item._fields[0].identity.low,
      name: item._fields[0].properties.name,
      position: item._fields[0].properties.position,
      email: item._fields[0].properties.email,
      slack: item._fields[0].properties.slack,
      avatar: item._fields[0].properties.avatar,
      role: item._fields[0].properties.role,
    }))
    return member
  },

  getFavoriteByMember: async (id) => {
    const cql = `MATCH p=(m:Member)-[f:favorite]->(r:Resource) WHERE ID(m)=${id} RETURN r`
    const result = await session.run(cql)
    const favorites = result.records.map(item => ({
      id: item._fields[0].identity.low,
      name: item._fields[0].properties.name,
      type: item._fields[0].properties.type,
      updatedDate: item._fields[0].properties.updatedDate,
      role: item._fields[0].properties.role,

    }))
    return favorites
  },

  getMemberByEmail: async (email) => {
    const cql = `MATCH (n :Member) WHERE n.email = "${email}" RETURN n`
    const result = await session.run(cql)
    const member = {
      id: result.records[0]._fields[0].identity.low,
      name: result.records[0]._fields[0].properties.name,
      position: result.records[0]._fields[0].properties.position,
      email: result.records[0]._fields[0].properties.email,
      slack: result.records[0]._fields[0].properties.slack,
      avatar: result.records[0]._fields[0].properties.avatar,
      role: result.records[0]._fields[0].properties.role,
    }
    return member
  },

  getTeamsByMember: async (id) => {
    const cql = `MATCH (member:Member)-[:attend]->(team:Team) WHERE ID(member) = ${id} RETURN team`
    const result = await session.run(cql)
    const teams = result.records.map(item => ({
      id: item._fields[0].identity.low,
      name: item._fields[0].properties.name,
      type: item._fields[0].properties.type,
      description: item._fields[0].properties.description,
    }))
    return teams
  },

  getResourceByMember: async (id) => {
    const cql = `MATCH (member:Member)-[r:created]->(resource:Resource) WHERE ID(member) = ${id} RETURN resource`
    const result = await session.run(cql)
    const createds = result.records.map(item => ({
      id: item._fields[0].identity.low,
      name: item._fields[0].properties.name,
      type: item._fields[0].properties.type,
      updatedDate: item._fields[0].properties.updatedDate,
    }))
    return createds
  },

  createMember: async (data) => {
    const cql = `CREATE n = (member:Member {name:"${data.name}", position:"${data.position}", email:"${data.email}", slack:"${data.slack}", avatar:"${data.avatar}", role:"${data.role}"}) RETURN n`
    const result = await session.run(cql)
    const member = {
      id: result.records[0]._fields[0].start.identity.low,
      name: result.records[0]._fields[0].start.properties.name,
      position: result.records[0]._fields[0].start.properties.position,
      email: result.records[0]._fields[0].start.properties.email,
      slack: result.records[0]._fields[0].start.properties.slack,
      avatar: result.records[0]._fields[0].start.properties.avatar,
      role: result.records[0]._fields[0].start.properties.role,
    }
    return member
  },

  memberAttendTeam: async () => {
    const cql = 'MATCH (member:Member),(team:Team) ' +
    'WHERE ID(member) = {memberId} and ID(team) = {teamId} ' +
    'CREATE (member)-[:attend]->(team) ' +
    'WITH team as t  ' +
    'MATCH n=(member)-[:attend]->(team) RETURN n'
    await session.run(cql)
  },

  isMember: async (email) => {
    const cql = `MATCH (member:Member) WHERE member.email = "${email}" RETURN member`
    const member = await session.run(cql)
    if (member.records.length === 0) {
      return false
    }
    return true
  },

  editMember: async (id, req) => {
    const data = {
      id,
      name: req.name,
      slack: req.slack,
      position: req.position,
      email: req.email,
      avatar: req.avatar,
    }
    const cql = `MATCH (m :Member) WHERE ID(m) = ${data.id} ` +
    `SET m = { name:"${data.name}", slack:"${data.slack}", position:"${data.position}", ` +
    `email:"${data.email}", avatar:"${data.avatar}" } RETURN m`
    const result = await session.run(cql)
    const member = {
      id: result.records[0]._fields[0].identity.low,
    }
    return member
  },

  searchMember: async (text) => {
    const searchText = `.*(?i)${text}.*`
    const result = await session.run('MATCH (member:Member) WHERE member.name =~ {searchText} RETURN member', { searchText })
    const members = result.records.map(item => ({
      id: item._fields[0].identity.low,
      name: item._fields[0].properties.name,
      avatar: item._fields[0].properties.avatar,
    }))
    return members
  },
}

session.close()
db.close()
module.exports = Member
