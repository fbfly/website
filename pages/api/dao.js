import nextConnect from 'next-connect'
import middleware from '../../middleware/database'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  await req.db
    .collection('daos')
    .find({})
    .toArray(function (err, items) {
      if (err) {
        res.status(401).json(items)
        throw err
      }
      res.status(200).json(items)
    })
})
handler.post(async (req, res) => {
  const { daoName, tokenName, tokenSymbol, fbGroupId, imageHash } = req.body
  await req.db.collection('daos').insert({
    daoName: daoName,
    tokenName: tokenName,
    tokenSymbol: tokenSymbol,
    fbGroupId: fbGroupId,
    imageHash: imageHash,
  })
  res.status(200).json(items)
})

export default handler
