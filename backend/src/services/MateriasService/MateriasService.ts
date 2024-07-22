import { logger } from '@sentry/utils'
import prisma from '../../infra/prisma'
import { ISaveMateriasDTO, IDeleteMateriasDTO } from './MateriasServiceDTO'

export class MateriasService {
    async saveMateria(data: ISaveMateriasDTO) {
        return prisma.materia
            .create({
                data: data,
            })
            .then((r) => r)
            .catch((e) => {
                logger.error(e)
                throw e
            })
    }

    async deleteMateriaByID(data: IDeleteMateriasDTO) {
        return prisma.materia
            .delete({
                where: {
                    materiaID: data.materiaID,
                },
            })
            .then((r) => r)
            .catch((e) => {
                logger.error(e)
                throw e
            })
    }

    async findAllMaterias() {
        return prisma.materia
            .findMany()
            .then((r) => r)
            .catch((e) => {
                logger.error(e)
                throw e
            })
    }
}
