import { Router } from 'express'
import { OlimpiadasController } from '../controllers/OlimpiadasController'

const router = Router()
const olimpiadasController = new OlimpiadasController()
const TokenMiddleware = require('../middlewares/TokenMiddleware')

router.get(
    '/resultados',
    TokenMiddleware,
    olimpiadasController.getOlimpiadaResultados,
)

module.exports = router
