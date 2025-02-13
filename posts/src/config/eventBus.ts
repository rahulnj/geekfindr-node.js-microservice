import { natsWrapper } from '../natsWrapper'
import { UserCreatedListener } from '../listeners/userCreatedListener'

export const connectEventBus = async () => {
  try {
    await natsWrapper.connect(
      'geekfindr',
      process.env.NATS_CLIENT_ID!,
      'http://nats-srv:4222'
    )
    new UserCreatedListener(natsWrapper.client).listen()
  } catch (error: any) {
    console.error(error.message)
  }
}
