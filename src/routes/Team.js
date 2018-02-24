const express = require('express')
const Team = require('./../models/Team')

const router = express.Router()

router.get('/', async (req, res) => {
  const teams = await Team.getTeam()
  res.status(200).json(teams)
})

router.post('/', async (req, res) => {
  const { name, description, members } = req.body
  const teams = await Promise.all(members.map(async (member) => {
    const result = await Team.createTeamhasMember(name, description, member)
    return result
  }))
  res.status(200).json(teams.records)
})

module.exports = router
