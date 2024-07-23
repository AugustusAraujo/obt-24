import { Express, Request, Response } from 'express'

function Routes(app: Express) {
    app.use('/user', require('./http/routes/User'))
    app.all('*', NotFoundRoute)
}

function NotFoundRoute(_req: Request, res: Response) {
    res.set({ 'Cache-Control': 'max-age=600' })
    return res.status(404).json({ code: 404, message: 'Invalid route.' })
}

export default Routes
