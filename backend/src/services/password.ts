import * as bcrypt from 'bcryptjs'
import prisma from '../infra/prisma'

async function comparePassword(
    password: string,
    hashPassword: string,
): Promise<boolean | Error | any> {
    const match = await bcrypt.compare(password, hashPassword)
    if (match) {
        return true
    }
    throw new Error('Senha incorreta.')
}

async function hashPassword(password: string): Promise<string | Error | any> {
    try {
        return bcrypt.hash(password, 8)
    } catch (_error) {
        throw new Error('Não foi possível gerar a senha.')
    }
}

async function alterPassword(
    usuarioID: number,
    newPassword: string,
): Promise<Boolean | Error> {
    const hash = await hashPassword(newPassword).then((hash) => hash)

    return await prisma.usuario
        .update({
            where: {
                usuarioID: usuarioID,
            },
            data: {
                usuarioSenha: hash,
            },
        })
        .then(() => true)
        .catch(() => new Error('Não foi possível atualizar a senha.'))
}

export { comparePassword, hashPassword, alterPassword }
