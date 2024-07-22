import { describe, expect, it } from 'vitest'
import tokensService from '.'

const data = {
    usuarioEmail: 'tokens@mail.com',
}

describe('TokensService', () => {
    it('should createTempTokenFromEmail', () => {
        const info = tokensService.createTempTokenFromEmail(data.usuarioEmail)

        expect(info).toBeTruthy()
    })

    it('should saveToken', async () => {
        const token = tokensService.createTempTokenFromEmail(data.usuarioEmail)

        const info = await tokensService.saveToken(token, 'TST')

        expect(token).toBeTruthy()
        expect(info).toBeTruthy()
    })

    it('should verifyTempToken', async () => {
        const token = tokensService.createTempTokenFromEmail(data.usuarioEmail)

        const info = await tokensService.verifyTempToken(token, 'TST')

        expect(token).toBeTruthy()
    })

    it('should deleteTempTokenByData', async () => {
        const token = tokensService.createTempTokenFromEmail(data.usuarioEmail)

        const info = await tokensService.deleteTempTokenByData(token)

        expect(token).toBeTruthy()
        expect(info).toHaveProperty('count')
    })
})
