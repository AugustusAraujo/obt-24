import { it, expect, describe, beforeAll, afterAll } from 'vitest'
import artigosService from '.'
import prisma from '../../infra/prisma'

const data = {
    artigoID: 999,
    artigoAutorID: Math.floor(Math.random() * 1000),
    artigoTitle: 'Lorem ipsum',
    artigoSubtitle: 'Lorem ipsum dolor',
    artigoSubdescription: 'Lorem ipsum dolor sit',
    artigoUUID: 'a5e50db5-c32d-4555-95da-39f721f1b429',
    artigoBody: 'Lorem ipsum dolor sit amet.',
    artigoType: 'Test',
    publicado: true,
}

const authorData = {
    usuarioID: data.artigoAutorID,
    usuarioNome: 'Artigos Test User',
    usuarioEmail: 'test@mail.com',
    usuarioSenha: '1',
}

describe('ArtigosService', () => {
    beforeAll(async () => {
        await prisma.usuario.create({
            data: authorData,
        })
    })

    it('should saveArtigo', async () => {
        const info = await artigosService.saveArtigo(data)

        expect(info).toHaveProperty('artigoTitle')
        expect(info).toHaveProperty('artigoSubtitle')
        expect(info).toHaveProperty('artigoSubdescription')
        expect(info).toHaveProperty('artigoType')
        expect(info).toHaveProperty('createdAt')
        expect(info).toHaveProperty('artigoUUID')
        expect(info).toHaveProperty('publicado')
    })

    // TODO: USAR INTERFACE PARA PODER MOCKAR O CACHE
    // it('should getArtigoWithHighViews', async () => {
    //     const info = await artigosService.getArtigoWithHighViews({ page: 0 })

    //     expect(info[0]).toHaveProperty('artigoTitle')
    //     expect(info[0]).toHaveProperty('artigoSubtitle')
    //     expect(info[0]).toHaveProperty('artigoSubdescription')
    //     expect(info[0]).toHaveProperty('artigoType')
    //     expect(info[0]).toHaveProperty('createdAt')
    //     expect(info[0]).toHaveProperty('artigoUUID')
    //     expect(info[0]).toHaveProperty('publicado')
    // })

    it('should getArtigoByUUID', async () => {
        const info = await artigosService.findArtigoByUUID({
            uuid: data.artigoUUID,
        })

        expect(info).toHaveProperty('artigoTitle')
        expect(info).toHaveProperty('artigoSubtitle')
        expect(info).toHaveProperty('artigoType')
        expect(info).toHaveProperty('createdAt')
    })

    it('should deleteArtigoByUUID', async () => {
        const info = await artigosService.deleteArtigoByUUID({
            uuid: data.artigoUUID,
        })

        expect(info).toHaveProperty('count', 1)
    })

    afterAll(async () => {
        await prisma.usuario.delete({
            where: {
                usuarioID: authorData.usuarioID,
            },
        })
    })
})
