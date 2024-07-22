import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { olimpiadasService } from '.'
import usuariosService from '../UsuariosService'
import passwordService from '../PasswordService'
import prisma from '../../infra/prisma'

const userData = {
    usuarioID: Math.floor(Math.random() * 1000),
    usuarioEmail: 'test@mail.com',
    usuarioSenha: '12345678',
    usuarioNome: 'TestUser',
}

const userData2 = {
    usuarioID: Math.floor(Math.random() * 1000),
    usuarioEmail: 'test@mail2.com',
    usuarioSenha: '12345678',
    usuarioNome: 'TestUser2',
}

const olympiadData = {
    olimpiadaID: Math.floor(Math.random() * 1000),
    olimpiadaNome: 'OlympiadOne',
    olimpiadaEdicao: 1,
    olimpiadaLogo: 'data',
    olimpiadaDescription: 'OlympiadOne description.',
    olimpiadaFinalizada: true,
}

describe('OlimpiadasService', () => {
    // beforeAll(async () => {
    //     await usuariosService.save({
    //     usuarioContaAtivada: true,
    //     usuarioEmail: userData.usuarioEmail,
    //     usuarioNome: userData.usuarioNome,
    //     usuarioSenha: String(
    //         await passwordService.hashPassword(userData.usuarioSenha),
    //     ),
    // })
    // await usuariosService.save({
    //     usuarioContaAtivada: true,
    //     usuarioEmail: userData2.usuarioEmail,
    //     usuarioNome: userData2.usuarioNome,
    //     usuarioSenha: String(
    //         await passwordService.hashPassword(userData2.usuarioSenha),
    //     ),
    // })
    // await prisma.olimpiadas.create({
    //     data: {
    //         olimpiadaID: olympiadData.olimpiadaID,
    //         olimpiadaDescription: olympiadData.olimpiadaDescription,
    //         olimpiadaEdicao: olympiadData.olimpiadaEdicao,
    //         olimpiadaLogo: olympiadData.olimpiadaLogo,
    //         olimpiadaNome: olympiadData.olimpiadaNome,
    //         olimpiadaFinalizada: olympiadData.olimpiadaFinalizada,
    //     },
    // })

    // it('subscribeUser', async () => {
    //     let resp = await olimpiadasService.subscribeUser({
    //         olimpiadaID: 999,
    //         olimpiadaInscritoUsuarioID: userData.usuarioID,
    //         olimpiadaInscritoNivel: 1,
    //         olimpiadaInscritoTipoEscola: 'publica',
    //     })

    //     console.log(resp)

    //     expect(resp).toHaveProperty('olimpiadaID', olympiadData.olimpiadaID)
    //     expect(resp).toHaveProperty(
    //         'olimpiadaInscritoUsuarioID',
    //         userData.usuarioID,
    //     )
    //     // expect(resp).toHaveProperty('olimpiadaInscritoNivel')
    //     // expect(resp).toHaveProperty('olimpiadaInscritoTipoEscola')

    //     // let res = await olimpiadasService.subscribeUser({
    //     //     olimpiadaID: olympiadData.olimpiadaID,
    //     //     olimpiadaInscritoUsuarioID: userData2.usuarioID,
    //     //     olimpiadaInscritoNivel: 1,
    //     //     olimpiadaInscritoTipoEscola: 'publica',
    //     // })

    //     // expect(res).toHaveProperty('olimpiadaID', olympiadData.olimpiadaID)
    //     // expect(res).toHaveProperty(
    //     //     'olimpiadaInscritoUsuarioID',
    //     //     userData2.usuarioID,
    //     // )
    //     // expect(res).toHaveProperty('olimpiadaInscritoNivel')
    //     // expect(res).toHaveProperty('olimpiadaInscritoTipoEscola')
    // })

    it('getUserParticipation', async () => {
        const resp = await olimpiadasService.getUserParticipation({
            usuarioID: null
        })
        console.log(resp)
        expect(resp).toHaveLength(1)
    })

    // afterAll(async () => {
    //     await usuariosService.deleteByID({ usuarioID: userData.usuarioID })
    //     await usuariosService.deleteByID({ usuarioID: userData2.usuarioID })
    // })
})
