import { describe, expect, it } from 'vitest'
import usuariosService from '.'

const data = {
    usuarioID: Math.floor(Math.random() * 1000),
    usuarioEmail: 'test@mail.com',
    usuarioSenha: '12345678',
    usuarioNome: 'TestUser',
}

describe('UsuariosService', () => {
    it('should saveUsuario', async () => {
        const info = await usuariosService.save(data)

        expect(info).toHaveProperty('usuarioID', data.usuarioID)
    })

    it('should buscaNomeByEmail', async () => {
        let input = { email: data.usuarioEmail }
        const info = await usuariosService.buscaNomeByEmail(input)

        expect(info).toHaveProperty('usuarioNome')
    })

    it('should countEmail', async () => {
        let input = { email: data.usuarioEmail }
        const info = await usuariosService.countEmail(input)

        expect(info).toBe(1)
    })

    it('should findOneByEmail', async () => {
        let input = { email: data.usuarioEmail }
        const info = await usuariosService.findOneByEmail(input)

        expect(info).toHaveProperty('usuarioID', data.usuarioID)
        expect(info).toHaveProperty('usuarioNome', data.usuarioNome)
        expect(info).toHaveProperty('usuarioEmail', data.usuarioEmail)
    })

    it('should findOneByEmailWithPassword', async () => {
        let input = { email: data.usuarioEmail }
        const info = await usuariosService.findOneByEmailWithPassword(input)

        expect(info).toHaveProperty('usuarioID', data.usuarioID)
        expect(info).toHaveProperty('usuarioNome', data.usuarioNome)
        expect(info).toHaveProperty('usuarioEmail', data.usuarioEmail)
        expect(info).toHaveProperty('usuarioSenha', data.usuarioSenha)
    })

    it('should deleteByID', async () => {
        const info = await usuariosService.deleteByID(data)

        expect(info).toHaveProperty('usuarioID', data.usuarioID)
        expect(info).toHaveProperty('usuarioNome', data.usuarioNome)
        expect(info).toHaveProperty('usuarioEmail', data.usuarioEmail)
        expect(info).toHaveProperty('usuarioSenha', data.usuarioSenha)
    })
})
