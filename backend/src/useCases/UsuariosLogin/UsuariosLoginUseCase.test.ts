import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import usuariosLoginUseCase from '.'
import prisma from '../../infra/prisma'
import passwordService from '../../services/PasswordService'

let data = {
    usuarioID: Math.floor(Math.random() * 1000),
    usuarioNome: 'testuser',
    usuarioEmail: 'login@mail.com',
    usuarioSenha: '12345678',
}

describe('UsuariosLoginUseCase', () => {
    beforeAll(async () => {
        await prisma.usuario.create({
            data: {
                usuarioID: data.usuarioID,
                usuarioEmail: data.usuarioEmail,
                usuarioNome: data.usuarioNome,
                usuarioSenha: await passwordService.hashPassword(
                    data.usuarioSenha,
                ),
            },
        })
    })

    it(
        'should make login',
        async () => {
            const login = await usuariosLoginUseCase.execute({
                email: data.usuarioEmail,
                password: data.usuarioSenha,
            })
            expect(login).toHaveProperty('acessToken')
            expect(login).toHaveProperty('refreshToken')
        },
        60 * 1000,
    )

    afterAll(async () => {
        await prisma.usuario.delete({
            where: {
                usuarioID: data.usuarioID,
            },
        })
    })
})
