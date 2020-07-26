import nextConnect from 'next-connect'
import middleware from '../../middleware/database'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  await req.db
    .collection('users')
    .find({})
    .toArray(function(err, items) {
      if (err) {
        res.status(401).json(items)
        throw err
      }
      res.status(200).json(items)
    })
})

handler.post(async (req, res) => {
  // This grabs user data to render it on our UI given an eth address.
  const { name, profileImage, address } = req.body
  await req.db
    .collection('users')
    .updateOne(
      { address: address.toLowerCase() },
      {
        $set: {
          name: name,
          profileImage: profileImage,
          address: address.toLowerCase(),
        },
      },
      {
        upsert: true,
      },
    )
    .then(() => res.status(200).json({ message: 'user created successfully' }))
    .catch(() => {
      res.status(500).json({ message: 'there was a problem saving your user' })
      throw new Error('')
    })
})

export default handler
