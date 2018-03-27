const express = require('express')

const router = express.Router()

const Member = require('../models/Member')

router.get('/', async (req, res) => {
  const email = req.query.memberEmail
  const member = await Member.getMemberByEmail(email)
  res.json(member)
})

router.get('/:id/', async (req, res) => {
  const id = Number(req.params.id)
  const member = await Member.getMemberById(id)
  const createds = await Member.getResourceByMember(id)
  const teams = await Member.getTeamsByMember(id)
  const favorites = await Member.getFavoriteByMember(id)
  res.status(200).json({
    member, createds, teams, favorites,
  })
})

router.post('/:id/', async (req, res) => {
  const id = Number(req.params.id)
  const member = await Member.editMember(id, req.body)
  res.json(member)
})

router.post('/', async (req, res) => {
  let member = ''
  const isMember = await Member.isMember(req.body.email)
  if (!isMember) {
    member = await Member.createMember(req.body)
  }
  res.json(member)
})

module.exports = router
