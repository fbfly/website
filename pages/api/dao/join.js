import nextConnect from 'next-connect'
import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'
import middleware from '../../../middleware/database'
import joinDao from '../../../lib/joinDao'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
)

const handler = nextConnect()

handler.use(middleware)

handler.post(async (req, res) => {
  await cors(req, res)
  const { torusAccount, daoAddress } = req.body
  await joinDao(daoAddress, torusAccount)
})

export default handler
