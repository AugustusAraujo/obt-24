import { Router } from 'express'
import { DiscordController } from '../controllers/DiscordController'
const TokenMiddleware = require('../middlewares/TokenMiddleware')
let router = Router()
const discordController = new DiscordController()

router.get('/', TokenMiddleware, discordController.getUserInfoWithEmail)

router.put('/', TokenMiddleware, discordController.putDiscordUserInfo)

router.delete(
    '/',
    TokenMiddleware,
    discordController.deleteDiscordUserInfoWithEmail,
)

router.get('/verify', TokenMiddleware, discordController.verifyDiscordUser)

module.exports = router
