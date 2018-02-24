const db = require('./db')

const session = db.session()

const Member = {
  getMember: async () => {
    const member = session.run('MATCH (m:Member) RETURN m')
    return member
  },
}

module.exports = Member
