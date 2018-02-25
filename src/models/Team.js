const db = require('./db')

const session = db.session()

const Team = {
  createTeam: async (name, description) => {
    const team = await session.run('Create n=(t:Team{name:{name},description:{description}}) RETURN n', {
      name,
      description,
    })
    const teamId = team.records[0]._fields[0].start.identity.low
    return teamId
  },

  createTeamhasMember: async (teamId, memberId) => {
    const teamHasMember = await session.run('MATCH (a:Team),(b:Member) ' +
    'WHERE ID(a) = {team}  AND ID(b) = {member} ' +
    'CREATE n=(a)-[r:hasMember]->(b) ' +
    'RETURN n', {
      team: Number(teamId),
      member: Number(memberId),
    })
    return teamHasMember
  },

  getTeam: async () => {
    const teams = await session.run('MATCH (t:Team) RETURN t')
    const data = await Promise.all(teams.records.map(async (team) => {
      const id = team._fields[0].identity.low
      const members = await session.run('MATCH (t:Team)-[r:hasMember]->(m:Member) WHERE ID(t)= {id} RETURN m', { id })
      const member = members.records.map((item) => ({
        id: item._fields[0].identity.low,
        name: item._fields[0].properties.name,
      }))
      return {
        id: team._fields[0].identity.low,
        name: team._fields[0].properties.name,
        description: team._fields[0].properties.description,
        member,
      }
    }))
    return data
  },

  getMemberOfTeam: async (id) => {
    const members = await session.run('MATCH (t:Team)-[r:hasMember]->(m:Member) WHERE ID(t)= {id} RETURN m', { id })
    const member = members.records.map((item) => ({
      id: item._fields[0].identity.low,
      name: item._fields[0].properties.name,
    }))
    return member
  },

  deleteTeam: async (teamId) => {
    await session.run('MATCH p=(t:Team)-[r:hasMember]->(m:Member) ' +
    'WHERE ID(t) = {teamId} DELETE r', {
      teamId,
    })
    await session.run('MATCH (t:Team) WHERE ID(t) = 13 DELETE t')
  },

  setTeam: async (teamId, name, description, memberId) => {
    await session.run('MATCH p=(t:Team)-[r:hasMember]->(m:Member) ' +
    'WHERE ID(t) = {teamId} DELETE r', {
      teamId,
    })
    const team = await session.run('MATCH (m:Member) WHERE ID(m) = {memberId} ' +
    'MATCH (t:Team) WHERE ID(t) = {teamId} ' +
    'CREATE n=(t)-[r:hasMember]->(m) RETURN n', {
      memberId,
      teamId,
    })
    return team
  },


}

module.exports = Team
