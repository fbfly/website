import nextConnect from 'next-connect'
import middleware from '../../middleware/database'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  // After getting the session you may want to fetch for the user instead
  // of sending the session's payload directly, this example doesn't have a DB
  // let doc = await req.db.collection('daily').findOne()
  // so it won't matter in this case
  res.status(200).json({ user: session || null })
  res.json(doc)
})

export default handler
