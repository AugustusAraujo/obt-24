import prisma from '../../infra/prisma'
import { sign, decode, verify, Jwt } from 'jsonwebtoken'
import { ICreateToken } from './TokensServiceDTO'

const JWT_SECRET: string | any = process.env.JWT_SECRET

export class TokenService {
    async createAcessToken(usuario: ICreateToken) {
        try {
            return sign({ data: usuario }, JWT_SECRET, {
                subject: `usuarioID-${usuario.usuarioID}`,
                expiresIn: '1d',
            })
        } catch (error) {
            throw new Error('Erro ao gerar token.')
        }
    }

    async createRefreshToken(usuario: ICreateToken) {
        try {
            return sign(
                {
                    usuarioEmail: usuario.usuarioEmail,
                },
                JWT_SECRET,
                {
                    expiresIn: '3d',
                },
            )
        } catch (error) {
            throw new Error('Erro ao gerar token.')
        }
    }

    createTempTokenFromEmail(email: string) {
        try {
            return sign(
                {
                    data: {
                        email: email,
                    },
                },
                JWT_SECRET,
                { expiresIn: '24h' },
            )
        } catch (error) {
            throw new Error('Erro ao gerar token.')
        }
    }

    verifyToken(token: string): boolean {
        try {
            if (verify(token, JWT_SECRET)) {
                return true
            }
        } catch (_) {
            return false
        }
        return false
    }

    decodeToken(token: string): Jwt | any {
        return decode(token, JWT_SECRET)
    }

    async countTokens(token: string) {
        return await prisma.token
            .count({
                where: {
                    data: token,
                },
            })
            .then((token: any) => token)
            .catch(() => new Error('Não foi possível contar os tokens.'))
    }

    async verifyTempToken(token: string, type: string) {
        return await prisma.token
            .findFirst({
                where: {
                    data: {
                        contains: token,
                    },
                    type: type,
                },
            })
            .then((token: any) => token)
            .catch(() => new Error('Token inválido.'))
    }

    async deleteTempToken(token: number): Promise<Boolean | Error> {
        return await prisma.token
            .deleteMany({
                where: {
                    token_ID: token,
                },
            })
            .then(() => true)
            .catch(() => new Error('Não foi possível deletar.'))
    }

    async deleteTempTokenByData(data: string) {
        return prisma.token
            .deleteMany({
                where: {
                    data: data,
                },
            })
            .then((r) => r)
            .catch((e) => e)
    }

    async checkIfTokenExists(token: string, type: string): Promise<boolean> {
        try {
            const result = await prisma.token.count({
                where: {
                    AND: {
                        data: {
                            equals: token,
                        },
                        type: {
                            equals: type,
                        },
                    },
                },
            })
            return !!result
        } catch (error) {
            console.log(error)
            throw new Error('Unable to check if token exists')
        }
    }

    async saveToken(data: string, type: string) {
        return await prisma.token
            .create({
                data: {
                    data: data,
                    type: type,
                },
            })
            .then(() => true)
            .catch(() => new Error('Não foi possível salvar o token.'))
    }
}
