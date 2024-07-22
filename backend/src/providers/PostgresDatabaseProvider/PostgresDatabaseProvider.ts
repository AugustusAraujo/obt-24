import { Pool, PoolClient } from 'pg'
import dotenv = require('dotenv');

dotenv.config();

export default class PostgresDatabaseProvider {
    private pool: Pool

    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URI,
            max: 5,
        })
    }

    async getClient(): Promise<PoolClient> {
        return this.pool.connect()
    }

    async query(query: string, params: any[] = []) {
        return this.pool.query(query, params)
    }
}
