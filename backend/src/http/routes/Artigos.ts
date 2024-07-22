import { Router } from 'express'
import { ArtigosController } from '../controllers/ArtigosController'
let artigosRouter = Router()

const artigosController = new ArtigosController()

artigosRouter.get(
    '/featured/:page?',
    artigosController.handleGetArtigosWithHighViews,
)

artigosRouter.get('/uuid/:uuid', artigosController.handleGetArtigoByUUID)

module.exports = artigosRouter
