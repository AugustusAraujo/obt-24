import { Router } from 'express'
let router = Router()
const {
    getCertificado,
    getParticipacaoOlimpiadaCertificado
} = require('../controllers/CertificadosController')


router.post('/aluno', getCertificado)

router.post('/olimpiada', getParticipacaoOlimpiadaCertificado)

module.exports = router
