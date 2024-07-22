const express = require('express')
const router = express.Router()

const {
    handleLogin,
    ativarConta,
    resetPassword,
    getInformacoes,
    patchInformacoes,
    findUsuarioEmail,
    reenviarAtivacao,
    handleNovaConta,
    sendPasswordReset,
    findContaAtiva,
} = require('../controllers/UsuarioController')
import TokenMiddleware = require('../middlewares/TokenMiddleware')

router.post('/login', handleLogin)
router.post('/nova-conta', handleNovaConta)
router.post('/ativar-conta', ativarConta)
router.get('/informacoes', TokenMiddleware, getInformacoes)
router.patch('/informacoes', TokenMiddleware, patchInformacoes)
router.post('/redefinir-senha/email', sendPasswordReset)
router.post('/redefinir-senha', resetPassword)
router.post('/buscar/conta-ativada', findContaAtiva)
router.post('/buscar/email', findUsuarioEmail)
router.post('/reenviarAtivacao', reenviarAtivacao)

module.exports = router
