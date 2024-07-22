import { it, describe, expect } from 'vitest'
import passwordService from '.'

const data = {
    usuarioSenha: '12345678',
}

describe('PasswordService', () => {
    it('should hashPassword', async () => {
        const info = await passwordService.hashPassword(data.usuarioSenha)

        expect(info).toBeTruthy()
    })

    it('should comparePassword', async () => {
        const hash = await passwordService.hashPassword(data.usuarioSenha)

        const isMatch = await passwordService.comparePassword(
            data.usuarioSenha,
            hash,
        )

        expect(isMatch).toBe(true)
        expect(hash).toBeTruthy()
    })
})
