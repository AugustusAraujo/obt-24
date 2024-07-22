import { logger } from '@sentry/utils'
import prisma from '../../infra/prisma'
import redisDatabaseProvider from '../../providers/RedisDatabaseProvider/index'
import {
    IDeleteArtigoByUUID,
    IFindArtigoByUUID,
    IGetArtigoWithHighViews,
    ISaveArtigo,
} from './ArtigosServiceDTO'

export class ArtigosService {
    private cacheExpirationInSeconds = 600

    async getArtigoWithHighViews(data: IGetArtigoWithHighViews) {
        if (!data.page) data.page = 0

        const redis = await redisDatabaseProvider

        try {
            const cacheInfo = await redis
                .get(`artigosWithHighViews-P${data.page}`)
                .then((artigos) => JSON.parse(artigos || '[]'))

            if (cacheInfo.length >= 1) {
                return cacheInfo
            }

            const artigos = await prisma.artigo
                .findMany({
                    skip: data.page * 10,
                    take: 10,
                    select: {
                        artigoTitle: true,
                        artigoSubtitle: true,
                        artigoSubdescription: true,
                        artigoUUID: true,
                        artigoType: true,
                        createdAt: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                })
                .then((artigos) => artigos)
                .catch((e) => {
                    logger.error(e)
                    throw e
                })

            return await redis
                .set(
                    `artigosWithHighViews-P${data.page}`,
                    JSON.stringify(artigos),
                    {
                        EX: this.cacheExpirationInSeconds,
                    },
                )
                .then(() => {
                    return artigos
                })
        } catch (e) {
            logger.error(e)
        }
    }

    async saveArtigo(data: ISaveArtigo) {
        return prisma.artigo
            .create({
                data: data,
            })
            .then((artigo) => artigo)
            .catch((e) => {
                logger.error(e)
                throw e
            })
    }

    async deleteArtigoByUUID(data: IDeleteArtigoByUUID) {
        return prisma.artigo
            .deleteMany({
                where: {
                    artigoUUID: data.uuid,
                },
            })
            .then((artigo) => artigo)
            .catch((e) => {
                logger.error(e)
                throw e
            })
    }

    async findArtigoByUUID(data: IFindArtigoByUUID) {
        return prisma.artigo
            .findFirst({
                where: {
                    artigoUUID: data.uuid,
                },
                select: {
                    artigoTitle: true,
                    artigoSubdescription: true,
                    artigoSubtitle: true,
                    artigoType: true,

                    createdAt: true,
                    Usuario: {
                        select: {
                            usuarioNome: true,
                        },
                    },
                    artigoBody: true,
                },
            })
            .then((artigo) => artigo)
            .catch((e) => {
                logger.error(e)
                throw e
            })
    }
}
