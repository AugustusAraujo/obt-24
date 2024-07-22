import { describe, it, expect, afterAll } from 'vitest'
import createAndSaveTempTokenUseCase from './index'
import prisma from '../../infra/prisma'

import { createTempTokenFromEmail } from '../../services/tokens'

const data = {
    usuarioEmail: 'castt@mail.com',
}

describe('CreateAndSaveTempToken', () => {
    it(
        'should createAndSaveTempTokenUseCase',
        async () => {
            await createAndSaveTempTokenUseCase
                .execute(data.usuarioEmail, 'PRT')
                .then((token) => {
                    expect(token)
                })
            await createAndSaveTempTokenUseCase
                .execute(data.usuarioEmail, 'NAC')
                .then((token) => {
                    expect(token)
                })
        },
        10 * 60 * 1000,
    )

    afterAll(async () => {
        await prisma.token.deleteMany({
            where: {
                data: createTempTokenFromEmail(data.usuarioEmail),
            },
        })
    })
})
