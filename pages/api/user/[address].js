import nextConnect from 'next-connect'
import middleware from '../../../middleware/database'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  const user = await req.db
    .collection('users')
    .findOne({ address: req.query.address.toLowerCase() })
  if (!user) {
    console.log('user not found')
    return res.status(404).json({ error: 'Not Found' })
  }
  res.status(200).json(user)
})

export default handler
