import { Router } from 'express'
const router = Router()

const checktoken = require('../controllers/ChecktokenController')

router.all('/', checktoken)

module.exports = router
