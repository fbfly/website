import nextConnect from 'next-connect'
import middleware from '../../middleware/database'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  await req.db
    .collection('daos')
    .findOne({ fbGroupId: req.query.fbGroupId })
    .toArray(function (err, items) {
      if (err) {
        res.status(401).json(items)
        throw err
      }
      res.status(200).json(items)
    })
})

export default handler
