import nextConnect from 'next-connect'
import middleware from '../../../middleware/database'

const handler = nextConnect()

handler.use(middleware)

// A GET request with fbGroupId as query param returns the DAO metadata.
handler.get(async (req, res) => {
  const group = await req.db
    .collection('daos')
    .findOne({ fbGroupId: req.query.fbGroupId })
  if (!group) {
    console.log('group not found')
    return res.status(404).json({ error: 'Not Found' })
  }
  res.status(200).json(group)
})

export default handler
