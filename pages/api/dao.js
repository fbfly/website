import nextConnect from 'next-connect'
import middleware from '../../middleware/database'
import createDao from '../../lib/createDao'

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
  await createDao(tokenName, tokenSymbol)
    .then(
      async orgAddress =>
        await req.db.collection('daos').insert({
          daoName: daoName,
          daoAddress: orgAddress,
          tokenName: tokenName,
          tokenSymbol: tokenSymbol,
          fbGroupId: fbGroupId,
          imageHash: imageHash,
        }),
      await res.status(200).json('DAO has been created successfully'),
    )
    .catch(() => res.status(401).json('There was an error creating your DAO.'))
})

export default handler
