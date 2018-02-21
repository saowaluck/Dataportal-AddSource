const dotenv = require('dotenv')
const neo4j = require('neo4j-driver').v1

dotenv.config()

module.exports = neo4j.driver(
  'bolt://db:7687',
  neo4j.auth.basic(
    process.env.DB_NAME,
    process.env.DB_PASSWORD,
  ),
)
