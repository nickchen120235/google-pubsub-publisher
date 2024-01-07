import type { HttpFunction } from '@google-cloud/functions-framework/build/src/functions'
import { PubSub } from '@google-cloud/pubsub'

const pubsub = new PubSub()

export const main: HttpFunction = async (req, res) => {
  const data = {
    method: req.method,
    path: req.path
  }
  try {
    const messageId = await pubsub.topic('test-topic').publishMessage({ attributes: data })
    res.status(200).json({ message: `Message ${messageId} published.` })
  }
  catch (err) {
    res.status(500).json({ err })
  }
}
