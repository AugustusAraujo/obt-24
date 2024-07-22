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
} = require('../controllers/UserController')
import TokenMiddleware = require('../middlewares/TokenMiddleware')

router.post('/login', handleLogin)
// router.post('/nova-conta', handleNovaConta)
// router.get('/informacoes', TokenMiddleware, getInformacoes)
// router.patch('/informacoes', TokenMiddleware, patchInformacoes)
// router.post('/redefinir-senha/email', sendPasswordReset)
// router.post('/redefinir-senha', resetPassword)
// router.post('/reenviarAtivacao', reenviarAtivacao)

module.exports = router
