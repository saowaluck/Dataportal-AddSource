const express = require('express')
const Tag = require('../models/Tag')

const router = express.Router()

router.get('/', async (req, res) => {
  const tags = await Tag.getTags()
  res.json({ tags })
})

module.exports = router
