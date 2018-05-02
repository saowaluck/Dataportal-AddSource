const moment = require('moment')
const db = require('./db')

const session = db.session()

const Team = {
  createTeams: async (name, description, members) => {
    const createdDate = moment().format()
    const team = await session
      .run('CREATE (team:Team{name:{name}, description:{description}, createdDate:{createdDate}}) ' +
      'WITH {members} As memberAttends,team ' +
      'MATCH (member:Member) WHERE member.name IN memberAttends ' +
      'CREATE p = (member)-[:attend]->(team) ' +
      'RETURN p', {
        name, description, createdDate, members,
      })
    return team
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

  addAttendTeam: async (id, email, selected) => {
    const result = await session.run('MATCH (m:Member),(t:Team) WHERE ID(t) = {id}' +
    'AND m.email = {email} CREATE result=(m)-[attend:attend { selectedResource: {selected} }]->(t)' +
    'RETURN attend', {
      id: Number(id),
      email,
      selected,
    })
    const results = result.records.map(req => ({
      relationId: req._fields[0].identity.low,
      resourceId: req._fields[0].properties.selectedResource,
    }))
    const data = await Promise.all(results.map(async (item) => {
      const cql = `MATCH (r:Resource) WHERE ID(r) = ${item.resourceId[0]} RETURN r`
      const res = await session.run(cql)
      const resource = res.records.map(element => ({
        id: element._fields[0].identity.low,
        name: element._fields[0].properties.name,
        type: element._fields[0].properties.type,
      }))
      return { selectedResource: resource, relationId: item.relationId }
    }))
    return data
  },

  deleteAttendTeam: async (id, email) => {
    const result = await session.run('MATCH n = (m:Member)-[a:attend]->(t:Team)' +
    'WHERE ID(t) = {id} AND m.email = {email} DELETE a', {
      id: Number(id),
      email,
    })
    return result
  },

  manageResource: async (id, email, selectedId) => {
    const cql = 'MATCH (m:Member)-[a:attend]->(t:Team)' +
      ` WHERE m.email = "${email}" and ID(t) = ${id} SET a.selectedResource = [${selectedId}] RETURN m`
    const result = await session.run(cql)
    return result
  },

  getResourceSelectedByMember: async (id, email) => {
    const getSelectedResourceId = `MATCH (m:Member)-[attend:attend]->(t:Team) WHERE m.email = "${email}" and ID(t) = ${id} RETURN attend`
    const result = await session.run(getSelectedResourceId)
    const resourceId = result.records[0]._fields[0].properties.selectedResource
    const data = await Promise.all(resourceId.map(async (item) => {
      const getSelectedResource = `MATCH (r:Resource) WHERE ID(r) = ${item} RETURN r`
      const res = await session.run(getSelectedResource)
      const resource = res.records.map(element => ({
        id: element._fields[0].identity.low,
        name: element._fields[0].properties.name,
        type: element._fields[0].properties.type,
      }))
      return resource
    }))
    return data
  },

  getResourceBySelected: async id => {
    const result = await session.run('MATCH (member:Member)-[attend:attend]->(team:Team)' +
    'WHERE ID(team) = {id} RETURN {id :attend.selectedResource}', { id: Number(id) })
    const resourcesId = result.records.map(item => item._fields[0].id)
    const selectedResourceId = [].concat(...resourcesId)
    const selectedResource = await Promise.all(selectedResourceId.map(async (item) => {
      const cql = `MATCH (r:Resource) WHERE ID(r) = ${item} RETURN r`
      const results = await session.run(cql)
      console.log(result)
      const data = results.records.map(req => ({
        id: req._fields[0].identity.low,
        name: req._fields[0].properties.name,
        type: req._fields[0].properties.type,
        url: req._fields[0].properties.url,
      }))
      return data
    }))
    console.log(selectedResource[0].map(item => item.id))
    const data = await Promise.all(selectedResource[0].map(async (item) => {
      const results = await session.run('MATCH (t:Team)-[:pin]-(r:Resource) WHERE ID(r) = {resourceId} and ID(t) = {teamId} RETURN r', {
        teamId: Number(id),
        resourceId: Number(item.id),
      })
      if (results.records.length !== 0) {
        return { selectedResource: item, isPinned: true }
      } return { selectedResource: item, isPinned: false }
    }))
    return data
  },

  isPinResource: async id => {
    const isPinResource = await session
      .run('MATCH n = (t:Team)-[:pin]->(r:Resource) WHERE ID(t) = {id} AND ID(r) ={id} RETURN n', {
        id: Number(id),
      })
    if (isPinResource.records.length > 0) {
      return true
    }
    return false
  },

  pinResource: async (teamId, resourceId) => {
    const cql = `MATCH (t:Team),(r:Resource) WHERE ID(t) = ${teamId} AND ID(r)= ${resourceId} CREATE p=(t)-[:pin]->(r) RETURN p`
    const result = await session
      .run(cql)
    return result
  },

  unPinResource: async (teamId, resourceId) => {
    const result = await session
      .run('MATCH (t:Team)-[p:pin]->(r:Resource) WHERE ID(r) = {resourceId} AND ID(t) = {teamId} DELETE p', {
        teamId: Number(teamId),
        resourceId: Number(resourceId),
      })
    return result
  },

  getResourceByPin: async id => {
    const result = await session.run('MATCH n= ((t:Team)-[:pin]->(r:Resource)) WHERE ID(t) = {id} RETURN n', { id: Number(id) })
    const pinnedResources = result.records.map(item => ({
      id: item._fields[0].end.identity.low,
      name: item._fields[0].end.properties.name,
      type: item._fields[0].end.properties.type,
      url: item._fields[0].end.properties.url,
    }))
    return pinnedResources
  },

  searchTeams: async (text) => {
    const searchText = `.*(?i)${text}.*`
    const result = await session.run('MATCH (team:Team) WHERE team.name =~ {searchText} RETURN team ' +
    'UNION MATCH (team:Team) WHERE team.description =~ {searchText} RETURN team', { searchText })
    const teams = result.records.map(item => ({
      id: item._fields[0].identity.low,
      name: item._fields[0].properties.name,
      description: item._fields[0].properties.description,
    }))
    return teams
  },

  clearRelationchipWithMember: async (id) => {
    await session.run('MATCH (member:Member)-[attend:attend]->(team:Team) WHERE ID(team) = {id} ' +
  'DELETE attend', { id })
  },

  editTeam: async (data) => {
    const team = await session.run('MATCH (team:Team) WHERE ID(team) = {id} ' +
    'SET team = {name:{name}, description:{description}} ' +
    'WITH team ' +
    'UNWIND {members} AS memberInTeam ' +
    'MATCH (n:Member{name:memberInTeam}) ' +
    'CREATE p = (n)-[:attend]->(team) ' +
    'RETURN p', {
      id: data.id,
      name: data.name,
      description: data.description,
      members: data.members,
    })
    return team
  },

  deleteTeam: async (id) => {
    const result = await session
      .run('MATCH (t:Team) WHERE ID(t) = {id} DETACH DELETE t', { id })
    if (result.records.length === 0) {
      return true
    }
    return false
  },
}


session.close()
db.close()
module.exports = Team
