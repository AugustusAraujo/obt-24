import { PrismaClient } from '@prisma/client'
import { ISave, ISearchByEmail } from './UsuariosServiceDTO'

export class UsuariosService {
    constructor(private readonly prismaService: PrismaClient) {}
    async buscaNomeByEmail(data: { email: string }) {
        return this.prismaService.usuario.findFirst({
            where: {
                usuarioEmail: data.email,
            },
            select: {
                usuarioNome: true,
            },
        })
    }

    async countEmail(data: ISearchByEmail) {
        return this.prismaService.usuario.count({
            where: {
                usuarioEmail: data.email,
            },
        })
    }

    async findOneByEmail(data: ISearchByEmail) {
        return this.prismaService.usuario.findFirst({
            where: {
                usuarioEmail: data.email,
            },
            select: {
                usuarioID: true,
                usuarioNome: true,
                usuarioEmail: true,
                usuarioPermissions: true,
                usuarioContaAtivada: true,
            },
        })
    }

    async findOneByEmailWithPassword(data: ISearchByEmail) {
        return this.prismaService.usuario.findFirst({
            where: {
                usuarioEmail: data.email,
            },
            select: {
                usuarioID: true,
                usuarioNome: true,
                usuarioEmail: true,
                usuarioPermissions: true,
                usuarioContaAtivada: true,
                usuarioSenha: true,
            },
        })
    }

    async save(data: ISave) {
        return this.prismaService.usuario.create({
            data: data,
        })
    }

    async deleteByID(data: { usuarioID: number }) {
        return this.prismaService.usuario.delete({
            where: {
                usuarioID: data.usuarioID,
            },
        })
    }
}
