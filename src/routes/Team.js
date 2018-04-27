const express = require('express')

const router = express.Router()

const Team = require('./../models/Team')

router.post('/:id/leave/', async (req, res) => {
  const id = Number(req.params.id)
  const email = req.body.memberEmail
  const deleteRelationTeam = await Team.deleteAttendTeam(id, email)
  res.json({ deleteRelationTeam })
})

router.post('/:id/join/', async (req, res) => {
  const id = Number(req.params.id)
  const email = req.body.memberEmail
  const joinRelationTeam = await Team.addAttendTeam(id, email)
  res.json({ joinRelationTeam })
})

router.get('/:id/pinned/', async (req, res) => {
  const id = Number(req.params.id)
  const pinnedResources = await Team.getResourceByPin(id)
  res.json({ pinnedResources })
})

router.post('/:id/resources/:resourceId/pinned/', async (req, res) => {
  const teamId = Number(req.params.id)
  const resourceId = Number(req.params.resourceId)
  await Team.pinResource(teamId, resourceId)
  const resourceByCreated = await Team.getResourceByCreated(teamId)
  const pinnedResources = await Team.getResourceByPin(teamId)
  res.json({
    resourceByCreated, pinnedResources,
  })
})

router.post('/:id/resources/:resourceId/unpinned/', async (req, res) => {
  const teamId = Number(req.params.id)
  const resourceId = Number(req.params.resourceId)
  await Team.unPinResource(teamId, resourceId)
  const resourceByCreated = await Team.getResourceByCreated(teamId)
  const pinnedResources = await Team.getResourceByPin(teamId)
  res.json({
    resourceByCreated, pinnedResources,
  })
})

router.get('/:id/resources/', async (req, res) => {
  const id = Number(req.params.id)
  const resourceByCreated = await Team.getResourceByCreated(id)
  const pinnedResources = await Team.getResourceByPin(id)
  res.json({
    resourceByCreated, pinnedResources,
  })
})

router.get('/:id/', async (req, res) => {
  const id = Number(req.params.id)
  const email = req.query.memberEmail
  const team = await Team.getTeamById(id)
  const members = await Team.getMembersOfTeam(id)
  const isRelationTeam = await Team.isRelationTeam(id, email)
  res.json({
    isRelationTeam, team, members,
  })
})

router.post('/', async (req, res) => {
  const { name, description } = req.body
  const team = await Team.createTeams(name, description)
  res.json({ team })
})

router.get('/', async (req, res) => {
  let members = [{ name: '' }]
  const teams = await Team.getTeam()
  const result = await Promise.all(teams.map(async team => {
    members = await Team.getMembersOfTeam(team.id)
    return { team, members }
  }))
  res.json(result)
})

router.get('/search/:text/', async (req, res) => {
  const { text } = req.params
  const teams = await Team.searchTeams(text)
  res.status(200).json(teams)
})

module.exports = router
