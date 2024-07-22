import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { ResetUserPasswordUseCase } from './ResetUserPasswordUseCase'
import createAndSaveTempTokenUseCase from '../CreateAndSaveTempToken'
import resetUserPasswordUseCase from '.'
import prisma from '../../infra/prisma'

const data = {
    usuarioID: Math.floor(Math.random() * 1000),
    usuarioNome: 'resettestuser',
    usuarioEmail: 'resetpass@mail.com',
    usuarioSenha: '12345678',
}

const newPassword = '87654321'

describe('ResetUserPasswordUseCase', () => {
    beforeAll(async () => {
        await prisma.usuario.create({
            data: data,
        })
    })

    it(
        'should resetUserPassword',
        async () => {
            const token = await createAndSaveTempTokenUseCase.execute(
                data.usuarioEmail,
                'PRT',
            )
            const reset = await resetUserPasswordUseCase.execute(
                token,
                newPassword,
            )

            expect(reset).toBeTruthy()
            expect(reset).toBe(true)
        },
        2 * 60 * 1000,
    )

    it('should check the new password', async () => {})

    afterAll(async () => {
        await prisma.usuario.delete({
            where: {
                usuarioID: data.usuarioID,
            },
        })
    })
})
