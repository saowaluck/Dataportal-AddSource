const express = require('express')
const Team = require('./../models/Team')

const router = express.Router()

router.get('/', async (req, res) => {
  const teams = await Team.getTeam()
  res.status(200).json(teams)
})

router.post('/', async (req, res) => {
  const { name, description, members } = req.body
  const teamId = await Team.createTeam(name, description)
  const team = await Promise.all(members.map(async memberId => {
    const result = await Team.createTeamhasMember(teamId, memberId)
    return result
  }))
  res.status(200).json(team)
})

module.exports = router
