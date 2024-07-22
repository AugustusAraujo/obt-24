import { Express, Request, Response } from 'express'

function Routes(app: Express) {
    app.use('/checktoken', require('./http/routes/Checktoken'))
    app.use('/admin', require('./http/routes/Admin'))
    app.use('/usuarios', require('./http/routes/Usuarios'))
    app.use('/artigos', require('./http/routes/Artigos'))
    app.use('/olimpiadas', require('./http/routes/Olimpiadas'))
    app.all('*', NotFoundRoute)
}

function NotFoundRoute(_req: Request, res: Response) {
    res.set({ 'Cache-Control': 'max-age=600' })
    return res.status(404).json({ code: 404, message: 'Rota inválida.' })
}

export default Routes
