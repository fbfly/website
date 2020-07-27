import nextConnect from 'next-connect'
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import middleware from '../../middleware/database'
import createDao from '../../lib/createDao'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: '*',
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
)

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  await cors(req, res)
  await req.db
    .collection('daos')
    .find({})
    .toArray(function (err, items) {
      if (err) {
        res.status(401).json(items)
        throw err
      }
      return res.status(200).json(items)
    })
})

handler.post(async (req, res) => {
  req.setTimeout(0)
  await cors(req, res)
  const {
    daoName,
    description,
    tokenName,
    tokenSymbol,
    fbGroupId,
    fbGroulURL,
    imageHash,
    torusAccount,
  } = req.body
  try {
    const orgAddress = await createDao(tokenName, tokenSymbol, torusAccount)
    if (orgAddress) {
      await req.db.collection('daos').insertOne({
        daoName: daoName,
        daoAddress: orgAddress,
        description: description,
        tokenName: tokenName,
        tokenSymbol: tokenSymbol,
        fbGroulURL: fbGroulURL,
        fbGroupId: fbGroupId,
        imageHash: imageHash,
      })
      res.status(200).json({
        orgAddress: orgAddress,
        message: 'DAO has been created successfully',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('500 ERROR')
  }
})

export default handler
