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

router.get('/:id/', async (req, res) => {
  const id = Number(req.params.id)
  const email = req.query.memberEmail
  const team = await Team.getTeamById(id)
  const members = await Team.getMembersOfTeam(id)
  const isRelationTeam = await Team.isRelationTeam(id, email)
  res.json({ isRelationTeam, team, members })
})

router.post('/', async (req, res) => {
  const { name, description } = req.body
  const team = await Team.createTeams(name, description)
  res.json({ team })
})

router.get('/', async (req, res) => {
  const teams = await Team.getTeam()
  res.json({ teams })
})

module.exports = router
