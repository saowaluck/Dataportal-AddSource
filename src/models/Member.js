const db = require('./db')

const session = db.session()

const Member = {
  getMemberById: async (id) => {
    const result = await session.run('MATCH (n :Member) WHERE ID(n) = {id} RETURN n', { id })
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

  getFavoriteByMember: async (id) => {
    const result = await session.run('MATCH p=(m:Member)-[f:favorite]->(r:Resource) WHERE ID(m)={id}  RETURN r', { id: Number(id) })
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
    const result = await session.run('MATCH (n :Member) WHERE n.email = {email} RETURN n', { email })
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
    const result = await session.run('MATCH (member:Member)-[:attend]->(team:Team) WHERE ID(member) = {id} RETURN team', { id })
    const teams = result.records.map(item => ({
      id: item._fields[0].identity.low,
      name: item._fields[0].properties.name,
      type: item._fields[0].properties.type,
      description: item._fields[0].properties.description,
    }))
    return teams
  },

  getResourceByMember: async (id) => {
    const result = await session.run('MATCH (member:Member)-[r:created]->(resource:Resource) WHERE ID(member) = {id} RETURN resource', { id })
    const createds = result.records.map(item => ({
      id: item._fields[0].identity.low,
      name: item._fields[0].properties.name,
      type: item._fields[0].properties.type,
      updatedDate: item._fields[0].properties.updatedDate,
    }))
    return createds
  },

  createMember: async (data) => {
    const result = await session
      .run('CREATE n = (member:Member {name:{name}, position:{position}, email:{email}, slack:{slack}, avatar:{avatar}, role:{role}}) RETURN n', {
        name: data.name,
        position: data.position,
        email: data.email,
        slack: data.slack,
        avatar: data.avatar,
        role: data.role,
      })
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
    await session.run('MATCH (member:Member),(team:Team) ' +
    'WHERE ID(member) = {memberId} and ID(team) = {teamId} ' +
    'CREATE (member)-[:attend]->(team) ' +
    'WITH team as t  ' +
    'MATCH n=(member)-[:attend]->(team) RETURN n')
  },

  isMember: async (email) => {
    const member = await session.run('MATCH (member:Member) WHERE member.email = {email} RETURN member', {
      email,
    })
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
    const result = await session
      .run('MATCH (m :Member) WHERE ID(m) = {id} ' +
    'SET m = {' +
      'name:{name},' +
      'slack:{slack},' +
      'position:{position},' +
      'email:{email},' +
      'avatar:{avatar}}' +
    'RETURN m', {
        id: data.id,
        name: data.name,
        slack: data.slack,
        position: data.position,
        email: data.email,
        avatar: data.avatar,
      })
    const member = {
      id: result.records[0]._fields[0].identity.low,
    }
    return member
  },
}

session.close()
db.close()
module.exports = Member
