const express = require('express')
const app = express()
import prisma from './infra/prisma'
const cors = require('cors')
import * as bodyParser from 'body-parser'
import Routes from './routes'
import * as Sentry from '@sentry/node'
import sentry from './providers/SentryProvider/sentry'
import { logger } from '@sentry/utils'
require('dotenv').config()

app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    }),
)
app.use(bodyParser.json())

prisma
    .$connect()
    .then(() => {
        console.log('DATABASE: Conexão concluida.')
        logger.info('DATABASE: Conexão concluida.')
    })
    .catch(() => {
        console.warn('DATABASE: Não foi possível se conectar.')
        logger.warn('DATABASE: Não foi possível se conectar.')
    })

// SENTRY MIDDLEWARE
sentry(app)

// ROUTES
Routes(app)

// SENTRY
app.use(Sentry.Handlers.errorHandler())

// API LISTEN
const PORT = process.env.PORT

// @ts-ignore
app.listen(PORT || 80, (error: Error) => {
    if (error) throw error
    console.log(`API: Listening on port ${process.env.PORT}`)
})

export default app
