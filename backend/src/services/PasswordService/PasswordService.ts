import { logger } from '@sentry/utils'
import * as bcrypt from 'bcryptjs'
import prisma from '../../infra/prisma'

export interface IPasswordService {
    comparePassword(password: string, hashPassword: string): Promise<boolean>
    hashPassword(password: string): Promise<string>
    alterPassword(usuarioID: number, newPassword: string): Promise<boolean>
}

export class PasswordService implements IPasswordService {
    public async comparePassword(password: string, hashPassword: string) {
        try {
            return bcrypt.compare(password, hashPassword)
        } catch (erro) {
            logger.error(erro)
            return false
        }
    }

    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 5)
    }

    public async alterPassword(
        usuarioID: number,
        newPassword: string,
    ): Promise<boolean> {
        const password = await this.hashPassword(newPassword)

        await prisma.usuario.update({
            where: {
                usuarioID: Number(usuarioID),
            },
            data: {
                usuarioSenha: password.toString(),
            },
        })
        return true
    }
}
