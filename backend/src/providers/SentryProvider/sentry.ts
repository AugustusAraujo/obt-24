import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

import { Express } from 'express'

const sentry = (app: Express) => {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [
            new Sentry.Integrations.Http({ tracing: true }),
            new Tracing.Integrations.Express({ app }),
        ],
        tracesSampleRate: 1.0,
    })
    app.use(Sentry.Handlers.requestHandler())
    app.use(Sentry.Handlers.tracingHandler())
}

export default sentry
