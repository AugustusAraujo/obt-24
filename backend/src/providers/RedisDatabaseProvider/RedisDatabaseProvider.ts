import { createClient, RedisClientType } from 'redis'
import logger from '../LoggerProvider/logger'

export class RedisDatabaseProvider {
    async connect() {
        const client = createClient({
            url: process.env.REDIS_URL,
            password: process.env.REDIS_PASSWORD,
        })

        client.on('error', (err) => logger.warn('Redis Client Error', err))

        await client.connect()

        return client
    }
}
