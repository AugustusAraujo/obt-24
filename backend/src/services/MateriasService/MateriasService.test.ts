import { expect, it, describe } from 'vitest'
import materiasService from '.'

const data = {
    materiaID: Math.floor(Math.random() * 1000),
    materia_alias: 'alias',
    materia_nome: 'nome',
}

describe('MateriasService', () => {
    it('should createMateria', async () => {
        const info = await materiasService.saveMateria(data)

        expect(info).toHaveProperty('materiaID', data.materiaID)
        expect(info).toHaveProperty('materia_alias', data.materia_alias)
        expect(info).toHaveProperty('materia_nome', data.materia_nome)
    })

    it('should findAllMaterias', async () => {
        const info = await materiasService.findAllMaterias()

        expect(info[0]).toHaveProperty('materiaID', data.materiaID)
        expect(info[0]).toHaveProperty('materia_alias', data.materia_alias)
        expect(info[0]).toHaveProperty('materia_nome', data.materia_nome)
    })

    it('should deleteMateriaByID', async () => {
        const info = await materiasService.deleteMateriaByID(data)

        expect(info).toHaveProperty('materiaID', data.materiaID)
        expect(info).toHaveProperty('materia_alias', data.materia_alias)
        expect(info).toHaveProperty('materia_nome', data.materia_nome)
    })
})
