const jwt = require('jsonwebtoken')
import prisma from '../infra/prisma'
const JWT_SECRET: string | any = process.env.JWT_SECRET

async function createAcessToken(usuario: any) {
    try {
        return jwt.sign({ data: usuario }, JWT_SECRET, {
            subject: `usuarioID-${usuario.usuarioID}`,
            expiresIn: '1d',
        })
    } catch (error) {
        throw new Error('Erro ao gerar token.')
    }
}

async function createRefreshToken(usuario: any) {
    try {
        return jwt.sign(
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

function createTempTokenFromEmail(email: string) {
    try {
        return jwt.sign(
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

function verifyToken(token: string): boolean {
    try {
        if (jwt.verify(token, JWT_SECRET)) {
            return true
        }
    } catch (_) {
        return false
    }
    return false
}

function decodeToken(token: string) {
    return jwt.decode(token, JWT_SECRET)
}

async function countTokens(token: string) {
    return await prisma.token
        .count({
            where: {
                data: token,
            },
        })
        .then((token: any) => token)
        .catch(() => new Error('Não foi possível contar os tokens.'))
}

async function verifyTempToken(token: string, type: string) {
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

async function deleteTempToken(token: number): Promise<Boolean | Error> {
    return await prisma.token
        .deleteMany({
            where: {
                token_ID: token,
            },
        })
        .then(() => true)
        .catch(() => new Error('Não foi possível deletar.'))
}

async function checkIfTokenExists(
    token: string,
    type: string,
): Promise<boolean> {
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

async function saveToken(data: string, type: string) {
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

export {
    createAcessToken,
    createRefreshToken,
    verifyToken,
    createTempTokenFromEmail,
    decodeToken,
    verifyTempToken,
    deleteTempToken,
    saveToken,
    checkIfTokenExists,
    countTokens,
}
