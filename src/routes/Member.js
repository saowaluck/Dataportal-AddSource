const express = require('express')

const router = express.Router()

const Member = require('../models/Member')

router.get('/', async (req, res) => {
  const email = req.query.memberEmail
  const members = await Member.getMemberByEmail(email)
  res.json(members)
})

router.get('/all/', async (req, res) => {
  const members = await Member.getAllMember()
  res.json(members)
})

router.get('/resources/', async (req, res) => {
  const email = req.query.memberEmail
  const members = await Member.getMemberByEmail(email)
  const resources = await Member.getResourceByMember(members.id)
  res.status(200).json({ members, resources })
})

router.get('/search/:text/', async (req, res) => {
  const { text } = req.params
  const members = await Member.searchMember(text)
  res.status(200).json(members)
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

router.get('/search/:text/', async (req, res) => {
  const { text } = req.params
  const members = await Member.searchMember(text)
  res.status(200).json(members)
})

router.get('/', async (req, res) => {
  const email = req.query.memberEmail
  const members = await Member.getMemberByEmail(email)
  res.json(members)
})

module.exports = router
