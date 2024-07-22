import prisma from '../infra/prisma'

const { comparePassword } = require('./password')
const { createAcessToken, createRefreshToken } = require('./tokens')

async function professorLogin(email: string, password: string) {
    return prisma.usuario
        .findFirst({
            where: {
                usuarioEmail: email,
            },
            include: {
                Professor: true,
            },
        })
        .then(async (usuario) => {
            if (await comparePassword(password, usuario?.usuarioSenha)) {
                const acessToken = await createAcessToken(usuario)
                const refreshToken = await createRefreshToken(usuario)
                return {
                    acessToken: acessToken,
                    refeshToken: refreshToken,
                }
            } else {
                throw new Error('Senha incorreta.')
            }
        })
        .catch(() => {
            throw new Error('Usuário inválido.')
        })
}

module.exports = Object.freeze({ professorLogin })
